const highlights = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location',
    value: 'Sydney, NSW, Australia',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    label: 'Education',
    value: 'Master of Information Technology in Artificial Intelligence - Macquarie University (2025) | Bachelor of Computer Science - Brac University (2023)',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    label: 'Experience',
    value: 'AI Engineer Intern @ Truuth Pty Ltd',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    label: 'Research',
    value: 'Published on ResearchGate — YOLOv8 / NLP',
  },
]

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid section-animate">
          {/* Left: bio */}
          <div className="about-text-col">
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              I build AI systems<br />
              that actually <span className="accent">ship.</span>
            </h2>

            <p className="about-text">
              I'm an AI Engineer based in Sydney with a Master's in Artificial
              Intelligence from Macquarie University. My focus is turning LLMs,
              RAG pipelines, and agentic systems from research ideas into{' '}
              <strong>production-grade software</strong> that works reliably
              under real-world conditions.
            </p>

            <p className="about-text">
              At <strong>Truuth Pty Ltd</strong>, I built AI pipelines for
              identity verification — cutting processing time by 40% and error
              rates by 15%. I care deeply about the gap between a demo that
              works and a system you can actually trust.
            </p>

            <p className="about-text">
              When I'm not shipping AI systems, I'm teaching the next generation
              of developers as a facilitator at <strong>CodeCamp</strong>.
            </p>

            <div className="about-stats">
              <div className="about-stat">
                <span className="stat-num">3+</span>
                <span className="stat-desc">AI Systems Shipped</span>
              </div>
              <div className="about-stat">
                <span className="stat-num">40%</span>
                <span className="stat-desc">Processing Speed Gain</span>
              </div>
              <div className="about-stat">
                <span className="stat-num">2</span>
                <span className="stat-desc">CS / AI Degrees</span>
              </div>
            </div>
          </div>

          {/* Right: highlight cards */}
          <div className="about-cards-col">
            <div className="about-info-card-wrap">
              {highlights.map((h) => (
                <div key={h.label} className="info-card">
                  <span className="info-icon">{h.icon}</span>
                  <div className="info-body">
                    <span className="info-label">{h.label}</span>
                    <span className="info-value">{h.value}</span>
                  </div>
                </div>
              ))}

              <div className="open-to-work-badge">
                <span className="otw-dot" aria-hidden="true" />
                Open to work · AI Engineer roles
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
