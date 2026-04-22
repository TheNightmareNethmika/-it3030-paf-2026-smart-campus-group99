import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Header.css'

function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/resources', label: 'Resources', icon: '📚' },
    { path: '/resources/add', label: 'Add Resource', icon: '➕', isButton: true }
  ]

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="header-brand">
          <div className="brand-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">SmartCampus</span>
            <span className="brand-sub">Resource Management</span>
          </div>
        </Link>

        <button 
          className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`header-nav ${menuOpen ? 'nav-open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''} ${link.isButton ? 'btn-add' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-text">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button className="btn-search" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
