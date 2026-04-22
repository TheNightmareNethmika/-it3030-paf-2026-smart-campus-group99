import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { resourceApi } from '../services/api'
import '../styles/HomePage.css'

function HomePage() {
  const [stats, setStats] = useState({ total: 0, working: 0, outOfService: 0 })
  const [loading, setLoading] = useState(true)
  const [animateStats, setAnimateStats] = useState(false)

  useEffect(() => {
    resourceApi.getAll()
      .then((res) => {
        const resources = res.data
        setStats({
          total: resources.length,
          working: resources.filter(r => r.status === 'WORKING').length,
          outOfService: resources.filter(r => r.status === 'OUT_OF_SERVICE').length,
        })
        setAnimateStats(true)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const features = [
    { 
      icon: '🏛️', 
      title: 'Lecture Halls', 
      desc: 'Large teaching spaces with seating capacity management',
      color: '#3B82F6'
    },
    { 
      icon: '💻', 
      title: 'Computer Labs', 
      desc: 'Technology-equipped rooms for practical sessions',
      color: '#10B981'
    },
    { 
      icon: '🤝', 
      title: 'Meeting Rooms', 
      desc: 'Small collaborative spaces for group work',
      color: '#8B5CF6'
    },
    { 
      icon: '📽️', 
      title: 'Projectors', 
      desc: 'Portable and fixed projection equipment',
      color: '#F59E0B'
    },
    { 
      icon: '📷', 
      title: 'Cameras', 
      desc: 'Recording and surveillance equipment inventory',
      color: '#EF4444'
    },
    { 
      icon: '📚', 
      title: 'Study Rooms', 
      desc: 'Quiet spaces for individual and group study',
      color: '#6366F1'
    }
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-pattern"></div>
          <div className="hero-gradient"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">🎓 University Management System</div>
          <h1 className="hero-title">
            Smart Campus
            <span className="hero-accent"> Resource Portal</span>
          </h1>
          <p className="hero-subtitle">Efficient Campus Resource Management</p>
          <p className="hero-desc">
            Manage university rooms, laboratories, meeting spaces, and equipment
            from a single, intuitive platform. Track availability, add new resources,
            and keep your campus running efficiently.
          </p>
          <div className="hero-actions">
            <Link to="/resources" className="btn btn-primary">
              <span className="btn-icon">📚</span>
              Browse Resources
            </Link>
            <Link to="/resources/add" className="btn btn-secondary">
              <span className="btn-icon">➕</span>
              Add New Resource
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">5+</span>
              <span className="hero-stat-label">Resource Types</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">24/7</span>
              <span className="hero-stat-label">Access</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">100%</span>
              <span className="hero-stat-label">Reliable</span>
            </div>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="floating-cards">
            <div className="card card-1">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
            </div>
            <div className="card card-2">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              </svg>
            </div>
            <div className="card card-3">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-header">
          <h2 className="section-title">Resource Overview</h2>
          <p className="section-subtitle">Real-time campus resource statistics</p>
        </div>
        <div className="stats-grid">
          <div className={`stat-card stat-total ${animateStats ? 'animate' : ''}`}>
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
          <div className={`stat-card stat-working ${animateStats ? 'animate' : ''}`}>
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
          <div className={`stat-card stat-oos ${animateStats ? 'animate' : ''}`}>
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
        <div className="section-header">
          <h2 className="section-title">Manage Your Campus Resources</h2>
          <p className="section-subtitle">Comprehensive resource management for modern universities</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={feature.title} className="feature-card" style={{ '--delay': index * 0.1 + 's' }}>
              <div className="feature-icon-wrapper" style={{ backgroundColor: feature.color + '20' }}>
                <span className="feature-icon" style={{ color: feature.color }}>{feature.icon}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
              <Link to="/resources" className="feature-link">
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <div className="cta-illustration">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div className="cta-text">
            <h2>Ready to optimize your campus?</h2>
            <p>Start managing your university resources efficiently with Smart Campus.</p>
            <div className="cta-actions">
              <Link to="/resources" className="btn btn-primary btn-large">
                View All Resources
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
