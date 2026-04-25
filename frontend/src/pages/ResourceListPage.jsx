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
  const [, setDeleteLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const [searchFilters, setSearchFilters] = useState({
    name: '',
    type: '',
    status: '',
    location: '',
    minCapacity: '',
    maxCapacity: '',
  })

  const navigate = useNavigate()

  const fetchResources = async () => {
    try {
      setLoading(true)
      const res = await resourceApi.getAll()
      setResources(res.data || res)
    } catch {
      setError('Failed to load resources.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResources()
  }, [])

  const handleDelete = async () => {
    try {
      setDeleteLoading(true)
      await resourceApi.delete(deleteTarget.id)
      setSuccessMsg(`"${deleteTarget.name}" deleted successfully.`)
      setDeleteTarget(null)
      fetchResources()
    } catch {
      setError('Failed to delete resource.')
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleSearch = async () => {
    try {
      setLoading(true)
      const res = await resourceApi.advancedSearch({
        query: searchTerm,
        ...searchFilters,
      })
      setResources(res.data || [])
    } catch {
      setError('Search failed.')
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setSearchFilters({
      name: '',
      type: '',
      status: '',
      location: '',
      minCapacity: '',
      maxCapacity: '',
    })
    setSearchTerm('')
    fetchResources()
  }

  // ✅ FIXED SORT (no mutation)
  const sortedResources = [...resources].sort((a, b) => {
    let aValue = a[sortBy]
    let bValue = b[sortBy]

    if (typeof aValue === 'string') aValue = aValue.toLowerCase()
    if (typeof bValue === 'string') bValue = bValue.toLowerCase()

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return (
    <div className="resource-list-page">
      
      {/* HEADER */}
      <div className="page-header">
        <h1>Campus Resources</h1>
        <Link to="/resources/add" className="btn btn-primary">
          ➕ Add Resource
        </Link>
      </div>

      {/* ALERTS */}
      {successMsg && <p className="success">{successMsg}</p>}
      {error && <p className="error">{error}</p>}

      {/* SEARCH */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
        <button onClick={clearFilters}>Clear</button>
      </div>

      {/* FILTERS */}
      <div className="filters">
        <select onChange={(e) =>
          setSearchFilters({ ...searchFilters, type: e.target.value })
        }>
          <option value="">All Types</option>
          <option value="LECTURE_HALL">Lecture Hall</option>
          <option value="COMPUTER_LAB">Computer Lab</option>
          <option value="MEETING_ROOM">Meeting Room</option>
        </select>

        <input
          type="number"
          placeholder="Min Capacity"
          onChange={(e) =>
            setSearchFilters({ ...searchFilters, minCapacity: e.target.value })
          }
        />
      </div>

      {/* SORT */}
      <div className="sort">
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="capacity">Capacity</option>
        </select>

        <button onClick={() =>
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        }>
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading...</p>
      ) : sortedResources.length === 0 ? (
        <p>No resources found.</p>
      ) : (
        <div className="resource-grid">
          {sortedResources.map((r) => (
            <div key={r.id} className="card">

              <div
                className="type-badge"
                style={{ background: TYPE_COLORS[r.type] }}
              >
                {TYPE_ICONS[r.type]} {TYPE_LABELS[r.type]}
              </div>

              <h3>{r.name}</h3>
              <p>{r.location}</p>
              <p>Capacity: {r.capacity}</p>
              <p>Status: {r.status}</p>

              <div className="actions">
                <button onClick={() =>
                  navigate(`/resources/edit/${r.id}`)
                }>
                  Edit
                </button>

                <button onClick={() =>
                  setDeleteTarget(r)
                }>
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteTarget && (
        <div className="modal">
          <p>Delete {deleteTarget.name}?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setDeleteTarget(null)}>No</button>
        </div>
      )}
    </div>
  )
}

export default ResourceListPage;