// Isometric cube: bottom-front at (cx, cy), unit = u
// Top face:   (cx, cy-u) (cx+u, cy-u*1.5) (cx, cy-u*2) (cx-u, cy-u*1.5)
// Right face: (cx, cy)   (cx+u, cy-u*0.5) (cx+u, cy-u*1.5) (cx, cy-u)
// Left face:  (cx, cy)   (cx-u, cy-u*0.5) (cx-u, cy-u*1.5) (cx, cy-u)
function pts(cx, cy, u) {
  return {
    top:   `${cx},${cy-u} ${cx+u},${cy-u*1.5} ${cx},${cy-u*2} ${cx-u},${cy-u*1.5}`,
    right: `${cx},${cy} ${cx+u},${cy-u*0.5} ${cx+u},${cy-u*1.5} ${cx},${cy-u}`,
    left:  `${cx},${cy} ${cx-u},${cy-u*0.5} ${cx-u},${cy-u*1.5} ${cx},${cy-u}`,
  }
}

function IsoCube({ cx, cy, u, top, front, side, floatClass }) {
  const p = pts(cx, cy, u)
  return (
    <g className={floatClass}>
      <polygon points={p.top}   fill={top} />
      <polygon points={p.right} fill={front} />
      <polygon points={p.left}  fill={side} />
    </g>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      {/* ── Left: white panel ── */}
      <div className="hero-left">
        <div className="hero-left-content">
          <div className="hero-eyebrow">
            <span className="hero-dash" aria-hidden="true" />
            Md Raihanul Islam Bhuiyan
          </div>

          <h1 className="hero-heading">
            Hello<br />
            I'm<br />
            Raihanul.<br />
            <span className="hero-heading-sub">I'm an AI Engineer.</span>
          </h1>

          <p className="hero-sub">
            Building AI systems that work reliably in the real world.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View Work</a>
            <a
              href="https://calendly.com/raihanrifat222"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-calendly"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book a Meeting
            </a>
            <a href="#about" className="btn btn-ghost">About Me</a>
          </div>

          <a href="#projects" className="scroll-hint" aria-label="Scroll down">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 7v6M7 11l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Scroll down
          </a>
        </div>
      </div>

      {/* ── Right: purple panel with isometric cubes ── */}
      <div className="hero-right" aria-hidden="true">
        <div className="hero-right-dots" />
        <svg
          className="cubes-svg"
          viewBox="0 0 600 560"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pink cube (large, upper center) — cx=285 cy=245 u=88 */}
          <IsoCube
            cx={285} cy={245} u={88}
            top="#fce7f3" front="#f9a8d4" side="#db2777"
            floatClass="cube-float-1"
          />

          {/* Yellow cube (medium, right) — cx=468 cy=280 u=64 */}
          <IsoCube
            cx={468} cy={280} u={64}
            top="#fef9c3" front="#fde047" side="#b45309"
            floatClass="cube-float-2"
          />

          {/* Teal cube (medium, lower left) — cx=140 cy=420 u=60 */}
          <IsoCube
            cx={140} cy={420} u={60}
            top="#e0f2fe" front="#7dd3fc" side="#0284c7"
            floatClass="cube-float-3"
          />

          {/* Small white cube (top right) — cx=494 cy=158 u=34 */}
          <IsoCube
            cx={494} cy={158} u={34}
            top="#f3f4f6" front="#e5e7eb" side="#9ca3af"
            floatClass="cube-float-4"
          />

          {/* Small white cube (bottom center-right) — cx=378 cy=470 u=26 */}
          <IsoCube
            cx={378} cy={470} u={26}
            top="#f3f4f6" front="#e5e7eb" side="#9ca3af"
            floatClass="cube-float-5"
          />

          {/* Small white cube (far left, mid) — cx=62 cy=265 u=22 */}
          <IsoCube
            cx={62} cy={265} u={22}
            top="#ede9fe" front="#ddd6fe" side="#7c3aed"
            floatClass="cube-float-2"
          />

          {/* Orange sphere */}
          <circle
            cx={375} cy={315} r={26}
            fill="#ff6830"
            className="cube-float-4"
          />

          {/* Small fuchsia sphere */}
          <circle
            cx={90} cy={185} r={14}
            fill="#e879f9"
            className="cube-float-5"
          />
        </svg>
      </div>
    </section>
  )
}
