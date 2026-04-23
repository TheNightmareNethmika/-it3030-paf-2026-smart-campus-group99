import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Header.css'

function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home', icon: '' },
    { path: '/resources', label: 'Resources', icon: '' },
    { path: '/resources/add', label: 'Add Resource', icon: '', isButton: true }
  ]

  const quickActions = [
    { label: 'Dashboard', icon: '', path: '/dashboard' },
    { label: 'Reports', icon: '', path: '/reports' },
    { label: 'Settings', icon: '', path: '/settings' }
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

        <nav className="header-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''} ${link.isButton ? 'btn-add' : ''}`}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-text">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="search-container">
            <button 
              className={`btn-search ${searchOpen ? 'active' : ''}`} 
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            {searchOpen && (
              <div className="search-dropdown">
                <input 
                  type="text" 
                  placeholder="Search resources..." 
                  autoFocus
                />
                <button className="search-btn">Search</button>
              </div>
            )}
          </div>

          <div className="user-menu">
            <button className="btn-user" aria-label="User menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
            <div className="user-dropdown">
              <div className="user-info">
                <div className="user-avatar">A</div>
                <div className="user-details">
                  <span className="user-name">Admin User</span>
                  <span className="user-role">Administrator</span>
                </div>
              </div>
              <div className="dropdown-menu">
                {quickActions.map((action) => (
                  <Link key={action.path} to={action.path} className="dropdown-item">
                    <span className="item-icon">{action.icon}</span>
                    <span className="item-label">{action.label}</span>
                  </Link>
                ))}
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout">
                  <span className="item-icon"></span>
                  <span className="item-label">Logout</span>
                </button>
              </div>
            </div>
          </div>

          <button 
            className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <div className="brand-text">
            <span className="brand-title">SmartCampus</span>
            <span className="brand-sub">Resource Management</span>
          </div>
          <button 
            className="mobile-close" 
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <nav className="mobile-nav-content">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''} ${link.isButton ? 'btn-add' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-text">{link.label}</span>
            </Link>
          ))}
          <div className="mobile-nav-divider"></div>
          {quickActions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">{action.icon}</span>
              <span className="nav-text">{action.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
