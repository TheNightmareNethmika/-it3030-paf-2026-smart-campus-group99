import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { resourceApi } from '../services/api'
import '../styles/HomePage.css'

function HomePage() {
  const [stats, setStats] = useState({ total: 0, working: 0, outOfService: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    resourceApi.getAll()
      .then((res) => {
        const resources = res.data
        setStats({
          total: resources.length,
          working: resources.filter(r => r.status === 'WORKING').length,
          outOfService: resources.filter(r => r.status === 'OUT_OF_SERVICE').length,
        })
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">University Management System</div>
          <h1 className="hero-title">Smart Campus</h1>
          <p className="hero-subtitle">Resource Management Portal</p>
          <p className="hero-desc">
            Manage university rooms, laboratories, meeting spaces, and equipment
            from a single, intuitive platform. View availability, add new resources,
            and keep your campus running efficiently.
          </p>
          <div className="hero-actions">
            <Link to="/resources" className="btn btn-primary">Browse Resources</Link>
            <Link to="/resources/add" className="btn btn-secondary">Add New Resource</Link>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="illustration-card">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card stat-total">
            <div className="stat-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
            </div>
            <div className="stat-data">
              <span className="stat-number">{loading ? '—' : stats.total}</span>
              <span className="stat-label">Total Resources</span>
            </div>
          </div>
          <div className="stat-card stat-working">
            <div className="stat-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div className="stat-data">
              <span className="stat-number">{loading ? '—' : stats.working}</span>
              <span className="stat-label">Working</span>
            </div>
          </div>
          <div className="stat-card stat-oos">
            <div className="stat-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            <div className="stat-data">
              <span className="stat-number">{loading ? '—' : stats.outOfService}</span>
              <span className="stat-label">Out of Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">What You Can Manage</h2>
        <div className="features-grid">
          {[
            { icon: '🏛️', title: 'Lecture Halls', desc: 'Large teaching spaces with seating capacity management' },
            { icon: '💻', title: 'Computer Labs', desc: 'Technology-equipped rooms for practical sessions' },
            { icon: '🤝', title: 'Meeting Rooms', desc: 'Small collaborative spaces for group work' },
            { icon: '📽️', title: 'Projectors', desc: 'Portable and fixed projection equipment' },
            { icon: '📷', title: 'Cameras', desc: 'Recording and surveillance equipment inventory' },
          ].map((f) => (
            <div key={f.title} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to manage your campus resources?</h2>
          <p>Browse all available resources or add a new one to get started.</p>
          <Link to="/resources" className="btn btn-primary btn-large">
            View All Resources →
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
