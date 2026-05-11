import { useState } from 'react'

const links = [
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner container">
          <a href="#hero" className="navbar-logo" onClick={close}>
            FOLIO.
          </a>

          <div className="navbar-links">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
            ))}
            <a href="#contact" className="btn-hire">Hire Me</a>
          </div>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-overlay" onClick={close}>
          <nav className="mobile-nav-links" onClick={(e) => e.stopPropagation()}>
            {links.map((l) => (
              <a key={l.label} href={l.href} className="mobile-nav-link" onClick={close}>
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn btn-primary" style={{ marginTop: 20 }} onClick={close}>
              Hire Me
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
