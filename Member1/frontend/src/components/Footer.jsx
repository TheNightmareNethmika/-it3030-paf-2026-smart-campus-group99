import '../styles/Footer.css'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-title">SmartCampus</span>
          <p className="footer-desc">University Resource Management System</p>
        </div>
        <div className="footer-links">
          <span className="footer-section-title">Quick Links</span>
          <a href="/" className="footer-link">Home</a>
          <a href="/resources" className="footer-link">Resources</a>
          <a href="/resources/add" className="footer-link">Add Resource</a>
        </div>
        <div className="footer-info">
          <span className="footer-section-title">Module</span>
          <p className="footer-text">Member 1 — Resource Management</p>
          <p className="footer-text">Rooms · Labs · Equipment</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {year} SmartCampus. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
