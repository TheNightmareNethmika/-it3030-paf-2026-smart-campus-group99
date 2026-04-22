import { useEffect, useState, useCallback } from 'react'
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

function ResourceListPage() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState(null)

  const [filters, setFilters] = useState({
    name: '',
    type: '',
    status: '',
    minCapacity: '',
  })

  const [filterErrors, setFilterErrors] = useState({})

  const navigate = useNavigate()

  const validateFilters = () => {
    const errs = {}
    if (filters.minCapacity && (isNaN(Number(filters.minCapacity)) || Number(filters.minCapacity) < 1 || !Number.isInteger(Number(filters.minCapacity)))) {
      errs.minCapacity = 'Minimum capacity must be a positive whole number.'
    }
    return errs
  }

  const fetchResources = useCallback(() => {
    const validationErrors = validateFilters()
    if (Object.keys(validationErrors).length > 0) {
      setFilterErrors(validationErrors)
      return
    }

    setLoading(true)
    setError(null)

    const params = {}
    if (filters.name.trim()) params.name = filters.name.trim()
    if (filters.type) params.type = filters.type
    if (filters.status) params.status = filters.status
    if (filters.minCapacity) params.minCapacity = filters.minCapacity

    resourceApi.getAll(params)
      .then((res) => setResources(res.data))
      .catch(() => setError('Failed to load resources. Make sure the backend is running.'))
      .finally(() => setLoading(false))
  }, [filters])

  useEffect(() => {
    fetchResources()
  }, [fetchResources])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field
    setFilterErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const clearFilters = () => {
    setFilters({ name: '', type: '', status: '', minCapacity: '' })
    setFilterErrors({})
  }

  const confirmDelete = (resource) => {
    setDeleteTarget(resource)
  }

  const cancelDelete = () => {
    setDeleteTarget(null)
  }

  const handleDelete = () => {
    setDeleteLoading(true)
    resourceApi.delete(deleteTarget.id)
      .then(() => {
        setSuccessMsg(`"${deleteTarget.name}" deleted successfully.`)
        setDeleteTarget(null)
        fetchResources()
        setTimeout(() => setSuccessMsg(null), 4000)
      })
      .catch(() => setError('Failed to delete resource.'))
      .finally(() => setDeleteLoading(false))
  }

  const formatTime = (time) => {
    if (!time) return '—'
    return time.substring(0, 5)
  }

  const hasActiveFilters = filters.name || filters.type || filters.status || filters.minCapacity

  return (
    <div className="resource-list-page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Campus Resources</h1>
          <p className="page-subtitle">Browse and manage all university resources</p>
        </div>
        <Link to="/resources/add" className="btn btn-primary">
          + Add Resource
        </Link>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="alert alert-success">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          {successMsg}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-error">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="filters-card">
        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">Search by Name</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="e.g. Lab A, Hall 1..."
              className="filter-input"
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">Type</label>
            <select name="type" value={filters.type} onChange={handleFilterChange} className="filter-select">
              <option value="">All Types</option>
              <option value="LECTURE_HALL">Lecture Hall</option>
              <option value="COMPUTER_LAB">Computer Lab</option>
              <option value="MEETING_ROOM">Meeting Room</option>
              <option value="PROJECTOR">Projector</option>
              <option value="CAMERA">Camera</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Status</label>
            <select name="status" value={filters.status} onChange={handleFilterChange} className="filter-select">
              <option value="">All Statuses</option>
              <option value="WORKING">Working</option>
              <option value="OUT_OF_SERVICE">Out of Service</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Min Capacity</label>
            <input
              type="number"
              name="minCapacity"
              value={filters.minCapacity}
              onChange={handleFilterChange}
              placeholder="e.g. 10"
              min="1"
              className={`filter-input ${filterErrors.minCapacity ? 'input-error' : ''}`}
            />
            {filterErrors.minCapacity && <span className="error-msg">{filterErrors.minCapacity}</span>}
          </div>
        </div>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="btn btn-ghost clear-btn">
            Clear Filters ✕
          </button>
        )}
      </div>

      {/* Results Count */}
      {!loading && !error && (
        <div className="results-count">
          Showing <strong>{resources.length}</strong> resource{resources.length !== 1 ? 's' : ''}
          {hasActiveFilters ? ' matching your filters' : ''}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading resources...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && resources.length === 0 && (
        <div className="empty-state">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <h3>No resources found</h3>
          <p>{hasActiveFilters ? 'Try adjusting your filters.' : 'No resources have been added yet.'}</p>
          {!hasActiveFilters && (
            <Link to="/resources/add" className="btn btn-primary">Add First Resource</Link>
          )}
        </div>
      )}

      {/* Resource Cards */}
      {!loading && !error && resources.length > 0 && (
        <div className="resources-grid">
          {resources.map((resource) => (
            <div key={resource.id} className="resource-card">
              <div className="resource-card-header">
                <div className="resource-type-badge">{TYPE_LABELS[resource.type] || resource.type}</div>
                <span className={`status-badge ${resource.status === 'WORKING' ? 'status-working' : 'status-oos'}`}>
                  {resource.status === 'WORKING' ? '● Working' : '● Out of Service'}
                </span>
              </div>

              <h3 className="resource-name">{resource.name}</h3>

              <div className="resource-details">
                <div className="detail-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{resource.location}</span>
                </div>
                <div className="detail-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  <span>Capacity: <strong>{resource.capacity}</strong></span>
                </div>
                <div className="detail-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>{formatTime(resource.availableStartTime)} – {formatTime(resource.availableEndTime)}</span>
                </div>
              </div>

              {resource.description && (
                <p className="resource-description">{resource.description}</p>
              )}

              <div className="resource-card-actions">
                <button
                  className="btn btn-edit"
                  onClick={() => navigate(`/resources/edit/${resource.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => confirmDelete(resource)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6"/>
                <path d="M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </div>
            <h2 className="modal-title">Delete Resource</h2>
            <p className="modal-message">
              Are you sure you want to delete <strong>"{deleteTarget.name}"</strong>?
              This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={cancelDelete} disabled={deleteLoading}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDelete} disabled={deleteLoading}>
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResourceListPage
