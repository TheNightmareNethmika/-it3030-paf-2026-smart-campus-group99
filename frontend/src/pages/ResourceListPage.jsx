// FIXED ERRORS VERSION

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
  const [viewMode, setViewMode] = useState('grid')

  const [filters, setFilters] = useState({
    name: '',
    type: '',
    status: '',
    minCapacity: '',
  })

  const [filterErrors, setFilterErrors] = useState({})
  const [showFilters, setShowFilters] = useState(false)

  const navigate = useNavigate()

  const validateFilters = useCallback(() => {
    const errs = {}

    if (
      filters.minCapacity &&
      (
        isNaN(Number(filters.minCapacity)) ||
        Number(filters.minCapacity) < 1 ||
        !Number.isInteger(Number(filters.minCapacity))
      )
    ) {
      errs.minCapacity = 'Minimum capacity must be a positive whole number.'
    }

    return errs
  }, [filters])

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
      .catch(() =>
        setError('Failed to load resources. Make sure backend is running.')
      )
      .finally(() => setLoading(false))
  }, [filters, validateFilters])

  useEffect(() => {
    fetchResources()
  }, [fetchResources])

  const handleFilterChange = (e) => {
    const { name, value } = e.target

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))

    setFilterErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
  }

  const clearFilters = () => {
    setFilters({
      name: '',
      type: '',
      status: '',
      minCapacity: '',
    })

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

        setTimeout(() => {
          setSuccessMsg(null)
        }, 4000)
      })
      .catch(() => {
        setError('Failed to delete resource.')
      })
      .finally(() => {
        setDeleteLoading(false)
      })
  }

  const formatTime = (time) => {
    if (!time) return '—'
    return time.substring(0, 5)
  }

  const hasActiveFilters =
    filters.name ||
    filters.type ||
    filters.status ||
    filters.minCapacity

  return (
    <div className="resource-list-page">

      <div className="page-header">
        <div>
          <h1 className="page-title">Campus Resources</h1>
          <p className="page-subtitle">
            Browse and manage all university resources
          </p>
        </div>

        <div className="page-header-actions">

          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </button>

          <Link to="/resources/add" className="btn btn-primary">
            Add Resource
          </Link>

        </div>
      </div>

      {successMsg && (
        <div className="alert alert-success">{successMsg}</div>
      )}

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      <div className={`filters-card ${showFilters ? 'show' : ''}`}>

        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Search by name"
        />

        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
        >
          <option value="">All Types</option>
          <option value="LECTURE_HALL">Lecture Hall</option>
          <option value="COMPUTER_LAB">Computer Lab</option>
          <option value="MEETING_ROOM">Meeting Room</option>
          <option value="PROJECTOR">Projector</option>
          <option value="CAMERA">Camera</option>
        </select>

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">All Status</option>
          <option value="WORKING">Working</option>
          <option value="OUT_OF_SERVICE">Out of Service</option>
        </select>

        <input
          type="number"
          name="minCapacity"
          value={filters.minCapacity}
          onChange={handleFilterChange}
          placeholder="Min Capacity"
        />

        {filterErrors.minCapacity && (
          <p className="error-msg">{filterErrors.minCapacity}</p>
        )}

        <button onClick={clearFilters}>Clear</button>

      </div>

      {loading ? (
        <p>Loading resources...</p>
      ) : resources.length === 0 ? (
        <p>No resources found.</p>
      ) : (
        <div className={`resources-container ${viewMode}`}>
          {resources.map((resource) => (
            <div key={resource.id} className="resource-card">

              <div
                className="resource-type-badge"
                style={{
                  backgroundColor:
                    (TYPE_COLORS[resource.type] || '#ddd') + '20',
                  color:
                    TYPE_COLORS[resource.type] || '#333',
                }}
              >
                {TYPE_ICONS[resource.type]}{' '}
                {TYPE_LABELS[resource.type] || resource.type}
              </div>

              <h3>{resource.name}</h3>

              <p>{resource.location}</p>

              <p>Capacity: {resource.capacity}</p>

              <p>
                {formatTime(resource.availableStartTime)} -{' '}
                {formatTime(resource.availableEndTime)}
              </p>

              <p>
                {resource.status === 'WORKING'
                  ? 'Working'
                  : 'Out of Service'}
              </p>

              {resource.description && (
                <p>{resource.description}</p>
              )}

              <div className="resource-card-actions">

                <button
                  onClick={() =>
                    navigate(`/resources/edit/${resource.id}`)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() => confirmDelete(resource)}
                >
                  Delete
                </button>

              </div>

            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <div className="modal-overlay">

          <div className="modal">
            <h2>Delete Resource</h2>

            <p>
              Are you sure you want to delete
              <strong> {deleteTarget.name} </strong>?
            </p>

            <div className="modal-actions">

              <button onClick={cancelDelete}>
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleteLoading}
              >
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