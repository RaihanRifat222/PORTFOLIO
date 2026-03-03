import Link from "next/link";

function ContactItem({ label, href, text, children }) {
  return (
    <li className="contact-item">
      <span className="contact-icon" aria-hidden="true">
        {children}
      </span>
      <span className="contact-label">{label}:</span>
      {href ? (
        <Link className="card-link" href={href}>
          {text}
        </Link>
      ) : (
        <span>{text}</span>
      )}
    </li>
  );
}

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container">
        <h1>Contact</h1>
        <p className="muted">
          Available for AI engineer roles, internships, and technical collaborations.
        </p>
        <div className="panel" style={{ marginTop: "1rem" }}>
          <ul className="list contact-list">
            <ContactItem label="Phone" text="+61 419113835">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path d="M7 2h10v20H7z" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="18" r="1.2" fill="currentColor" />
              </svg>
            </ContactItem>

            <ContactItem
              label="Gmail"
              href="mailto:raihanrifat222@gmail.com"
              text="raihanrifat222@gmail.com"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </ContactItem>

            <ContactItem
              label="LinkedIn"
              href="https://www.linkedin.com/in/raihanrifat222"
              text="linkedin.com/in/raihanrifat222"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.2 1.5-2.2 2.9V21h-4V9z" />
              </svg>
            </ContactItem>

            <ContactItem
              label="GitHub"
              href="https://github.com/RaihanRifat222"
              text="github.com/RaihanRifat222"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.2.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 2.1.8 2.5 2.1.8 1.4 2 1 2.5.8.1-.6.4-1.1.7-1.4-2.7-.3-5.5-1.3-5.5-6A4.7 4.7 0 018 10.1c-.1-.3-.6-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 015.8 0c2.2-1.5 3.2-1.2 3.2-1.2.7 1.6.2 2.8.1 3.1a4.7 4.7 0 011.2 3.2c0 4.7-2.8 5.6-5.5 6 .4.4.8 1 .8 2v3c0 .4.2.7.8.6A12 12 0 0012 .5z" />
              </svg>
            </ContactItem>
          </ul>
        </div>
      </div>
    </section>
  );
}
