"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const threadEndRef = useRef(null);
  const [sessionId, setSessionId] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem("portfolio_chat_session_id") || "";
  });

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const canSubmit = useMemo(
    () => message.trim().length > 0 && !loading,
    [message, loading]
  );

  async function onSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;

    const userMessage = message.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setMessage("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, session_id: sessionId || null })
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer || "No response generated." }
      ]);
      if (data.session_id && data.session_id !== sessionId) {
        setSessionId(data.session_id);
        if (typeof window !== "undefined") {
          window.localStorage.setItem("portfolio_chat_session_id", data.session_id);
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I hit an error while responding. Please try again." }
      ]);
      setError(err instanceof Error ? err.message : "Failed to fetch response.");
    } finally {
      setLoading(false);
    }
  }

  function resetConversation() {
    setSessionId("");
    setMessages([]);
    setMessage("");
    setError("");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("portfolio_chat_session_id");
    }
  }

  return (
    <section className="section">
      <div className="container chat-layout">
        <div className="panel chat-shell">
          <div className="chat-head">
            <div>
              <p className="kicker">Talk to Raihan</p>
              <h1>Portfolio Chat</h1>
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetConversation}
              disabled={loading}
            >
              New Chat
            </button>
          </div>

          <p className="muted">
            Ask about projects, skills, experience, and work style.
          </p>

          <div className="chat-thread">
            {messages.length === 0 ? (
              <p className="muted">Start by sending your first message.</p>
            ) : null}

            {messages.map((item, idx) => (
              <div
                key={`${item.role}-${idx}`}
                className={`chat-bubble ${item.role === "user" ? "user" : "assistant"}`}
              >
                <p className="chat-role">{item.role === "user" ? "You" : "Raihan AI"}</p>
                <p className="chat-text">{item.content}</p>
              </div>
            ))}

            {loading ? (
              <div className="chat-bubble assistant">
                <p className="chat-role">Raihan AI</p>
                <p className="chat-text">Typing...</p>
              </div>
            ) : null}
            <div ref={threadEndRef} />
          </div>

          <form onSubmit={onSubmit} className="chat-form">
            <textarea
              className="chat-input"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Example: Tell me about your experience with RAG and agentic AI."
              rows={3}
            />
            <div className="btn-row">
              <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
                Send
              </button>
            </div>
          </form>

          {error ? <p className="chat-error">{error}</p> : null}
        </div>
      </div>
    </section>
  );
}
