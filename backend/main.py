import os
import uuid
from pathlib import Path
from typing import Any, Dict, List, Optional

import numpy as np
import yaml
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel, Field

load_dotenv()

EMBED_MODEL = os.getenv("EMBED_MODEL", "text-embedding-3-small")
CHAT_MODEL = os.getenv("CHAT_MODEL", "gpt-4o-mini")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

app = FastAPI(title="Portfolio AI Backend", version="0.2.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "https://portfolio-pi-red-49.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

KB_CHUNKS: List[Dict[str, Any]] = []
KB_VECTORS: List[np.ndarray] = []
SESSIONS: Dict[str, List[Dict[str, str]]] = {}

PRIVATE_TOPICS = {
    "address",
    "phone",
    "visa",
    "salary",
    "bank",
    "medical",
    "family",
    "passport",
}


def normalize_text(text: str) -> str:
    # Fix common mojibake artifacts from copied markdown.
    return (
        text.replace("â€™", "'")
        .replace("â€“", "-")
        .replace("â€”", "-")
        .replace("â€œ", '"')
        .replace("â€", '"')
        .strip()
    )


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    session_id: Optional[str] = None


class Source(BaseModel):
    source: str
    type: str


class ChatResponse(BaseModel):
    answer: str
    sources: List[Source]
    session_id: str


def is_sensitive_query(message: str) -> bool:
    text = message.lower()
    return any(keyword in text for keyword in PRIVATE_TOPICS)


def chunk_markdown(text: str, source: str, max_chars: int = 900) -> List[Dict[str, Any]]:
    chunks: List[Dict[str, Any]] = []
    blocks = [b.strip() for b in text.split("\n\n") if b.strip()]

    current: List[str] = []
    current_len = 0
    chunk_idx = 0

    for block in blocks:
        if current_len + len(block) > max_chars and current:
            chunks.append(
                {
                    "source": source,
                    "type": "markdown",
                    "question": None,
                    "answer": normalize_text("\n\n".join(current)),
                    "tags": [],
                    "chunk_index": chunk_idx,
                }
            )
            chunk_idx += 1
            current = [block]
            current_len = len(block)
        else:
            current.append(block)
            current_len += len(block)

    if current:
        chunks.append(
            {
                "source": source,
                "type": "markdown",
                "question": None,
                "answer": normalize_text("\n\n".join(current)),
                "tags": [],
                "chunk_index": chunk_idx,
            }
        )
    return chunks


def load_markdown_files(data_dir: Path) -> List[Dict[str, Any]]:
    chunks: List[Dict[str, Any]] = []
    for md_file in sorted(data_dir.glob("*.md")):
        text = normalize_text(md_file.read_text(encoding="utf-8", errors="ignore"))
        if not text:
            continue
        chunks.extend(chunk_markdown(text=text, source=md_file.name))
    return chunks


def load_qa_yaml_files(qa_dir: Path) -> List[Dict[str, Any]]:
    chunks: List[Dict[str, Any]] = []
    for yml_file in sorted(qa_dir.glob("*.yaml")):
        data = yaml.safe_load(yml_file.read_text(encoding="utf-8", errors="ignore")) or []
        for item in data:
            chunks.append(
                {
                    "source": yml_file.name,
                    "type": "qa",
                    "question": normalize_text(item.get("question", "")),
                    "answer": normalize_text(item.get("answer", "")),
                    "tags": item.get("tags", []),
                    "chunk_index": 0,
                }
            )
    return chunks


def embed_text(text: str) -> np.ndarray:
    if client is None:
        raise RuntimeError("OPENAI_API_KEY is missing")
    response = client.embeddings.create(model=EMBED_MODEL, input=text)
    return np.array(response.data[0].embedding, dtype=np.float32)


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.dot(a, b) / ((np.linalg.norm(a) + 1e-8) * (np.linalg.norm(b) + 1e-8)))


def keyword_overlap_score(query: str, chunk: Dict[str, Any]) -> float:
    query_tokens = {t for t in query.lower().split() if len(t) > 2}
    chunk_text = f"{chunk.get('question', '')} {chunk.get('answer', '')}".lower()
    if not query_tokens:
        return 0.0
    overlap = sum(1 for token in query_tokens if token in chunk_text)
    return float(overlap)


def generate_grounded_answer(
    question: str, context_chunks: List[Dict[str, Any]], history: List[Dict[str, str]]
) -> str:
    if client is None:
        raise RuntimeError("OPENAI_API_KEY is missing")
    context_blocks = []
    for idx, item in enumerate(context_chunks, start=1):
        context_blocks.append(
            f"[{idx}] source={item['source']} type={item['type']}\n"
            f"question={item.get('question', '')}\n"
            f"content={item.get('answer', '')}"
        )
    context = "\n\n".join(context_blocks)

    history_text = "\n".join(f"{turn['role']}: {turn['content']}" for turn in history[-6:])

    system_prompt = (
        "You are Md Raihanul Islam Bhuiyan speaking directly in first person. "
        "Respond like a real interview conversation, natural and concise. "
        "Use only provided context. "
        "Do not invent companies, metrics, or projects. "
        "If context is insufficient, say you do not have that information publicly. "
        "Avoid generic filler language and buzzwords. "
        "Do not call yourself aspiring unless the user asks for goals. "
        "Prefer short concrete statements with specific examples from context."
    )
    user_prompt = (
        f"Conversation history:\n{history_text}\n\n"
        f"Question:\n{question}\n\n"
        f"Context:\n{context}"
    )

    completion = client.chat.completions.create(
        model=CHAT_MODEL,
        temperature=0.15,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
    )
    return (completion.choices[0].message.content or "").strip()


def ingest_knowledge() -> Dict[str, Any]:
    global KB_CHUNKS, KB_VECTORS

    base_dir = Path(__file__).resolve().parent / "data"
    qa_dir = base_dir / "qa"

    if not base_dir.exists() or not qa_dir.exists():
        raise HTTPException(status_code=500, detail="backend/data or backend/data/qa not found")

    chunks = load_markdown_files(base_dir) + load_qa_yaml_files(qa_dir)
    if not chunks:
        raise HTTPException(status_code=500, detail="No data found to ingest")

    vectors: List[np.ndarray] = []
    for chunk in chunks:
        text = f"{chunk.get('question', '')}\n{chunk.get('answer', '')}".strip()
        vectors.append(embed_text(text))

    KB_CHUNKS = chunks
    KB_VECTORS = vectors

    return {
        "status": "indexed",
        "count": len(KB_CHUNKS),
        "vector_dim": int(KB_VECTORS[0].shape[0]) if KB_VECTORS else 0,
    }


@app.on_event("startup")
def startup_ingest() -> None:
    try:
        ingest_knowledge()
    except Exception as e:
        print(f"Startup ingest failed: {e}")


@app.get("/api/health")
def health() -> Dict[str, Any]:
    return {
        "status": "ok",
        "indexed_chunks": len(KB_CHUNKS),
        "openai_key_present": bool(OPENAI_API_KEY),
    }


@app.post("/api/ingest")
def ingest() -> Dict[str, Any]:
    return ingest_knowledge()


@app.post("/api/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    query = normalize_text(payload.message)
    if not query:
        raise HTTPException(status_code=400, detail="message is required")

    if not KB_CHUNKS or not KB_VECTORS:
        raise HTTPException(status_code=500, detail="Knowledge base is empty")

    if is_sensitive_query(query):
        session_id = payload.session_id or str(uuid.uuid4())
        return ChatResponse(
            answer="I cannot share private or sensitive information. Please ask about my skills, projects, or experience.",
            sources=[],
            session_id=session_id,
        )

    session_id = payload.session_id or str(uuid.uuid4())
    history = SESSIONS.get(session_id, [])

    q_vec = embed_text(query)
    scored = []
    for idx, vec in enumerate(KB_VECTORS):
        semantic = cosine_similarity(q_vec, vec)
        lexical = keyword_overlap_score(query, KB_CHUNKS[idx]) * 0.02
        qa_boost = 0.04 if KB_CHUNKS[idx].get("type") == "qa" else 0.0
        final_score = semantic + lexical + qa_boost
        scored.append((final_score, idx))
    scored.sort(key=lambda x: x[0], reverse=True)
    top_indices = [idx for _, idx in scored[:5]]
    top_chunks = [KB_CHUNKS[i] for i in top_indices]

    answer = generate_grounded_answer(query, top_chunks, history)
    sources = [Source(source=item["source"], type=item["type"]) for item in top_chunks]

    updated_history = history + [
        {"role": "user", "content": query},
        {"role": "assistant", "content": answer},
    ]
    SESSIONS[session_id] = updated_history[-10:]

    return ChatResponse(answer=answer, sources=sources, session_id=session_id)
