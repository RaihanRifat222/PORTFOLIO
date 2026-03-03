# Portfolio (Next.js + RAG Chatbot)

## Structure

- `frontend/` - Next.js portfolio UI
- `backend/main.py` - FastAPI RAG chatbot API
- `backend/data/` - knowledge base markdown and Q/A yaml files

## Backend setup

```bash
cd backend
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create `backend/.env`:

```env
OPENAI_API_KEY=your_key_here
EMBED_MODEL=text-embedding-3-small
CHAT_MODEL=gpt-4o-mini
```

Run backend:

```bash
uvicorn main:app --reload
```

Backend auto-ingests `backend/data/` at startup.

## Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

Run frontend:

```bash
npm run dev
```

Open:

- Portfolio: `http://localhost:3000`
- Chatbot: `http://localhost:3000/chat`
- Backend docs: `http://127.0.0.1:8000/docs`
