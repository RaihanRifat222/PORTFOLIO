# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal AI portfolio — a Next.js frontend showcasing projects/skills with a FastAPI RAG chatbot backend that answers recruiter questions using retrieval-augmented generation over a personal knowledge base.

## Development Commands

### Backend (FastAPI)
```bash
cd backend
# Activate virtual environment (Windows)
source venv/Scripts/activate   # bash
# or: venv\Scripts\Activate.ps1  (PowerShell)

pip install -r requirements.txt
uvicorn main:app --reload      # http://127.0.0.1:8000
# Swagger docs at http://127.0.0.1:8000/docs
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
npm run lint   # ESLint check
```

### Environment Variables

`backend/.env`:
```
OPENAI_API_KEY=your_key_here
EMBED_MODEL=text-embedding-3-small
CHAT_MODEL=gpt-4o-mini
```

`frontend/.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
NEXT_PUBLIC_SITE_NAME=Raihan Portfolio
```

## Architecture

### Frontend (`frontend/`)
- **Next.js 14 App Router** — routes under `app/`: `/`, `/chat`, `/projects`, `/skills`, `/resume`, `/contact`
- **Components**: `NavBar.js`, `Footer.js` in `components/`
- **Styling**: Single `globals.css` with CSS custom properties; dark theme with cyan (`#22d3ee`) and pink (`#fb7185`) brand colors; glassmorphism effects
- Path alias `@/*` maps to `frontend/` root

### Backend (`backend/main.py`)
Single-file FastAPI app implementing a RAG pipeline:

**Startup**: Ingests all files in `backend/data/` into an in-memory vector store (NumPy arrays). No persistent DB.

**Data sources:**
- `backend/data/*.md` — Markdown files chunked at paragraph boundaries (~900 chars max), then embedded
- `backend/data/qa/*.yaml` — Structured Q&A pairs with tags; get a +0.04 score boost over markdown chunks

**Chat request flow:**
1. Normalize query text (fixes mojibake artifacts)
2. Safety check — blocks queries about address, phone, visa, salary, bank, medical, family, passport
3. Embed query via OpenAI (`text-embedding-3-small`, 512 dims)
4. Score all KB chunks: cosine similarity (primary) + 0.02 × lexical overlap + QA boost
5. Select top-5 chunks as context
6. Generate response via `gpt-4o-mini` (temp=0.15) with last 6 conversation turns
7. Return answer + source attribution

**Session management**: In-memory dict, last 10 turns per session ID (UUID from client localStorage).

**API endpoints:**
- `GET /api/health` — health + OpenAI key status
- `POST /api/chat` — main chat (`{session_id, message}` → `{answer, sources}`)
- `POST /api/ingest` — re-trigger knowledge base ingestion

**CORS**: Allows `localhost:3000` and `127.0.0.1:3000`.

### Knowledge Base (`backend/data/`)
- `resume.md`, `fraud_detection.md`, `smartcourse.md`, `spirithelp.md`, `agentic_it_support.md`
- `qa/identity.yaml`, `qa/personal_journey.yaml`, `qa/skills.yaml`, `qa/work_style.yaml`

To add new content, drop `.md` or `.yaml` files into `backend/data/` (or `backend/data/qa/`) and call `POST /api/ingest` or restart the server.
