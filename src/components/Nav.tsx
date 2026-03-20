import { useState } from 'react'

const links = [
  { label: 'about', href: '#about' },
  { label: 'projects', href: '#projects' },
  { label: 'contact', href: '#contact' },
]

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLinkClick = (href: string) => {
    setMenuOpen(false)
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'var(--surface)',
      borderBottom: '1px solid var(--gold)',
      padding: '0.75rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <span style={{
        color: 'var(--gold)',
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 700,
        fontSize: '1rem',
      }}>
        ~/gabriel
      </span>

      {/* Desktop links */}
      <div className="nav-links-desktop">
        {links.map(link => (
          <a
            key={link.label}
            href={link.href}
            className="nav-link"
            onClick={e => { e.preventDefault(); handleLinkClick(link.href) }}
          >
            <span style={{ color: 'var(--green)' }}>~/</span>{link.label}
          </a>
        ))}
      </div>

      {/* Hamburger button (mobile) */}
      <button
        className="nav-hamburger"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(prev => !prev)}
      >
        <span /><span /><span />
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="nav-mobile-menu">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
              onClick={e => { e.preventDefault(); handleLinkClick(link.href) }}
            >
              <span style={{ color: 'var(--green)' }}>~/</span>{link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Nav
