import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Header.css'

function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="brand-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">SmartCampus</span>
            <span className="brand-sub">Resource Management</span>
          </div>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>

        <nav className={`header-nav ${menuOpen ? 'nav-open' : ''}`}>
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/resources"
            className={`nav-link ${isActive('/resources') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Resources
          </Link>
          <Link
            to="/resources/add"
            className="nav-link btn-add"
            onClick={() => setMenuOpen(false)}
          >
            + Add Resource
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
