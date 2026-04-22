import { Link } from 'react-router-dom'
import '../styles/Footer.css'

function Footer() {
  const year = new Date().getFullYear()
  
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/resources', label: 'Browse Resources' },
    { path: '/resources/add', label: 'Add Resource' }
  ]

  const resources = [
    { icon: '🏛️', label: 'Lecture Halls' },
    { icon: '💻', label: 'Computer Labs' },
    { icon: '🤝', label: 'Meeting Rooms' },
    { icon: '📽️', label: 'Projectors' },
    { icon: '📷', label: 'Cameras' }
  ]

  const socialLinks = [
    { icon: '📧', label: 'Email', href: 'mailto:info@smartcampus.edu' },
    { icon: '🌐', label: 'Website', href: '#' },
    { icon: '📱', label: 'Contact', href: '#' }
  ]

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-section footer-brand">
          <div className="footer-logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <h3 className="footer-title">SmartCampus</h3>
          <p className="footer-desc">
            Modern university resource management system for efficient campus operations
          </p>
          <div className="footer-social">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.href} 
                className="social-link"
                aria-label={social.label}
              >
                <span className="social-icon">{social.icon}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-section-title">Quick Links</h4>
          <nav className="footer-nav">
            {quickLinks.map((link) => (
              <Link key={link.path} to={link.path} className="footer-link">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-section">
          <h4 className="footer-section-title">Resources</h4>
          <div className="resource-grid">
            {resources.map((resource) => (
              <div key={resource.label} className="resource-item">
                <span className="resource-icon">{resource.icon}</span>
                <span className="resource-label">{resource.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-section footer-contact">
          <h4 className="footer-section-title">Module Info</h4>
          <div className="contact-info">
            <p className="footer-text">
              <strong>IT3030 - PAF 2026</strong>
            </p>
            <p className="footer-text">Member 1: Resource Management</p>
            <p className="footer-text">Smart Campus Group XX</p>
          </div>
          <div className="footer-stats">
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Resource Types</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Availability</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="copyright">
            &copy; {year} SmartCampus. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Privacy Policy</a>
            <a href="#" className="footer-bottom-link">Terms of Service</a>
            <a href="#" className="footer-bottom-link">Help</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
