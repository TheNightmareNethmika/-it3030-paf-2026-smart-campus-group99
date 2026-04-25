import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { resourceApi } from '../services/api'
import '../styles/ResourceListPage.css'

const TYPE_LABELS = {
  LECTURE_HALL: 'Lecture Hall',
  COMPUTER_LAB: 'Computer Lab',
  MEETING_ROOM: 'Meeting Room',
  PROJECTOR: 'Projector',
  CAMERA: 'Camera',
}

const TYPE_ICONS = {
  LECTURE_HALL: '🏛️',
  COMPUTER_LAB: '💻',
  MEETING_ROOM: '🤝',
  PROJECTOR: '📽️',
  CAMERA: '📷',
}

const TYPE_COLORS = {
  LECTURE_HALL: '#3B82F6',
  COMPUTER_LAB: '#10B981',
  MEETING_ROOM: '#8B5CF6',
  PROJECTOR: '#F59E0B',
  CAMERA: '#EF4444',
}

function ResourceListPage() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  /* PREMIUM STATES */
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('resource_dark') === 'true'
  )

  const [favorites, setFavorites] = useState(
    JSON.parse(
      localStorage.getItem('resource_favs') || '[]'
    )
  )

  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem(
      'resource_dark',
      darkMode
    )
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem(
      'resource_favs',
      JSON.stringify(favorites)
    )
  }, [favorites])

  const fetchResources = () => {
    setLoading(true)
    setError(null)

    resourceApi
      .getAll()
      .then((res) => {
        setResources(
          res.data || res
        )
      })
      .catch(() => {
        setError(
          'Failed to load resources.'
        )
      })
      .finally(() =>
        setLoading(false)
      )
  }

  useEffect(() => {
    let isMounted = true
    const loadData = async () => {
      if (!isMounted) return
      setLoading(true)
      setError(null)

      try {
        const res = await resourceApi.getAll()
        if (isMounted) {
          setResources(res.data || res)
        }
      } catch {
        if (isMounted) {
          setError('Failed to load resources.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadData()
    const intervalId = setInterval(loadData, 10000)
    return () => {
      isMounted = false
      clearInterval(intervalId)
    }
  }, [])

  const confirmDelete = (
    resource
  ) => {
    setDeleteTarget(resource)
  }

  const cancelDelete = () => {
    setDeleteTarget(null)
  }

  const handleDelete = () => {
    setDeleteLoading(true)

    resourceApi
      .delete(deleteTarget.id)
      .then(() => {
        setSuccessMsg(
          `"${deleteTarget.name}" deleted successfully.`
        )

        setDeleteTarget(null)

        fetchResources()

        setTimeout(() => {
          setSuccessMsg(null)
        }, 3000)
      })
      .catch(() => {
        setError(
          'Failed to delete resource.'
        )
      })
      .finally(() =>
        setDeleteLoading(false)
      )
  }

  const toggleFavorite = (
    id
  ) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter(
            (x) => x !== id
          )
        : [...prev, id]
    )
  }

  const exportCSV = () => {
    const rows = resources.map(
      (r) => ({
        Name: r.name,
        Type: r.type,
        Location: r.location,
        Capacity: r.capacity,
        Status: r.status,
      })
    )

    const csv = [
      Object.keys(
        rows[0] || {}
      ).join(','),
      ...rows.map((r) =>
        Object.values(r).join(',')
      ),
    ].join('\n')

    const blob =
      new Blob([csv], {
        type: 'text/csv',
      })

    const url =
      URL.createObjectURL(
        blob
      )

    const a =
      document.createElement(
        'a'
      )

    a.href = url
    a.download =
      'resources.csv'
    a.click()
  }

  const formatTime = (
    time
  ) => {
    if (!time) return '—'
    return time.substring(0, 5)
  }

  const handleBookingClick = (resource) => {
    setSuccessMsg(`Booking initiated for "${resource.name}". Contact admin for details.`)
    
    setTimeout(() => {
      setSuccessMsg(null)
    }, 3000)
  }

  const filteredAndSortedResources = resources
    .filter(resource => 
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue, bValue
      
      switch(sortBy) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'type':
          aValue = a.type
          bValue = b.type
          break
        case 'capacity':
          aValue = Number(a.capacity) || 0
          bValue = Number(b.capacity) || 0
          break
        case 'status':
          aValue = a.status
          bValue = b.status
          break
        default:
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  return (
    <div
      className={`resource-list-page ${
        darkMode
          ? 'dark-ui'
          : ''
      }`}
    >
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Campus Resources
          </h1>

          <p className="page-subtitle">
            Manage university
            resources smartly
          </p>
        </div>

        <div className="page-header-actions">
          <button
            className="action-btn"
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
          >
            {darkMode
              ? '☀ Light'
              : '🌙 Dark'}
          </button>

          <button
            className="action-btn"
            onClick={
              exportCSV
            }
          >
            📊 Export
          </button>

          <Link
            to="/resources/add"
            className="btn btn-primary"
          >
            ➕ Add Resource
          </Link>
        </div>
      </div>

      {/* ALERTS */}
      {successMsg && (
        <div className="alert alert-success">
          {successMsg}
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>
            {
              resources.length
            }
          </h3>
          <p>
            Total Resources
          </p>
        </div>

        <div className="stat-card">
          <h3>
            {
              resources.filter(
                (
                  r
                ) =>
                  r.status ===
                  'WORKING'
              ).length
            }
          </h3>
          <p>Working</p>
        </div>

        <div className="stat-card">
          <h3>
            {
              resources.filter(
                (
                  r
                ) =>
                  r.status ===
                  'OUT_OF_SERVICE'
              ).length
            }
          </h3>
          <p>
            Out of Service
          </p>
        </div>

        <div className="stat-card">
          <h3>
            {resources.length >
            0
              ? Math.round(
                  resources.reduce(
                    (
                      sum,
                      r
                    ) =>
                      sum +
                      Number(
                        r.capacity ||
                          0
                      ),
                    0
                  ) /
                    resources.length
                )
              : 0}
          </h3>
          <p>
            Avg Capacity
          </p>
        </div>
      </div>

      {/* SEARCH AND FILTER CONTROLS */}
      <div className="search-sort-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search resources by name, location, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="sort-controls">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Sort by Name</option>
            <option value="type">Sort by Type</option>
            <option value="capacity">Sort by Capacity</option>
            <option value="status">Sort by Status</option>
          </select>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="sort-order-btn"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <p className="result-count">
        Showing{' '}
        {
          filteredAndSortedResources.length
        }{' '}
        of {resources.length} resources
      </p>

      {/* CONTENT */}
      {loading ? (
        <p>
          Loading
          resources...
        </p>
      ) : filteredAndSortedResources.length ===
        0 ? (
        <p>
          {searchTerm ? 'No resources match your search.' : 'No resources found.'}
        </p>
      ) : (
        <div
          className="resources-container"
        >
          {filteredAndSortedResources.map(
            (
              resource
            ) => (
              <div
                key={
                  resource.id
                }
                className="resource-card"
              >
                <button
                  className="fav-btn"
                  onClick={() =>
                    toggleFavorite(
                      resource.id
                    )
                  }
                >
                  {favorites.includes(
                    resource.id
                  )
                    ? '⭐'
                    : '☆'}
                </button>

                <div
                  className="resource-type-badge"
                  style={{
                    backgroundColor:
                      (
                        TYPE_COLORS[
                          resource
                            .type
                        ] ||
                        '#ddd'
                      ) +
                      '20',
                    color:
                      TYPE_COLORS[
                        resource
                          .type
                      ] ||
                      '#333',
                  }}
                >
                  {
                    TYPE_ICONS[
                      resource
                        .type
                    ]
                  }{' '}
                  {TYPE_LABELS[
                    resource
                      .type
                  ] ||
                    resource.type}
                </div>

                <h3>
                  {
                    resource.name
                  }
                </h3>

                <p>
                  {
                    resource.location
                  }
                </p>

                <p>
                  Capacity:{' '}
                  {
                    resource.capacity
                  }
                </p>

                <p>
                  {formatTime(
                    resource.availableStartTime
                  )}{' '}
                  -
                  {formatTime(
                    resource.availableEndTime
                  )}
                </p>

                <div className="status-indicator">
                  <span className={`status-dot ${resource.status === 'WORKING' ? 'status-working' : 'status-out-of-service'}`}></span>
                  {resource.status === 'WORKING' ? 'Working' : 'Out of Service'}
                </div>

                {resource.description && (
                  <p>
                    {
                      resource.description
                    }
                  </p>
                )}

                <div className="resource-card-actions">
                  <button
                    className="booking-card-btn"
                    onClick={() =>
                      handleBookingClick(resource)
                    }
                  >
                    📅 Book
                  </button>
                  
                  <button
                    onClick={() =>
                      navigate(
                        `/resources/edit/${resource.id}`
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      confirmDelete(
                        resource
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteTarget && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              Delete Resource
            </h2>

            <p>
              Are you sure
              you want to
              delete
              <strong>
                {' '}
                {
                  deleteTarget.name
                }{' '}
              </strong>
              ?
            </p>

            <div className="modal-actions">
              <button
                onClick={
                  cancelDelete
                }
              >
                Cancel
              </button>

              <button
                onClick={
                  handleDelete
                }
                disabled={
                  deleteLoading
                }
              >
                {deleteLoading
                  ? 'Deleting...'
                  : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResourceListPage