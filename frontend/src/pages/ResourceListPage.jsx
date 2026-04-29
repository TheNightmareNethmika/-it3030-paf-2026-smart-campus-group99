import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { resourceApi } from '../services/api'
import AdminLayout from '../components/AdminLayout'

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

const TYPE_META = {
  LECTURE_HALL: { bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-500'   },
  COMPUTER_LAB: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  MEETING_ROOM: { bg: 'bg-violet-100',  text: 'text-violet-700',  dot: 'bg-violet-500'  },
  PROJECTOR:    { bg: 'bg-amber-100',   text: 'text-amber-700',   dot: 'bg-amber-500'   },
  CAMERA:       { bg: 'bg-rose-100',    text: 'text-rose-700',    dot: 'bg-rose-500'    },
}

const TYPE_FALLBACK = { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' }

const STATUS_META = {
  WORKING:         { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'In service'   },
  OUT_OF_SERVICE:  { bg: 'bg-rose-100',    text: 'text-rose-700',    dot: 'bg-rose-500',    label: 'Out of service' },
}

function TypeBadge({ type }) {
  const m = TYPE_META[type] || TYPE_FALLBACK
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${m.bg} ${m.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`}></span>
      {TYPE_ICONS[type]} {TYPE_LABELS[type] || type}
    </span>
  )
}

function StatusBadge({ status }) {
  const m = STATUS_META[status] || { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400', label: status }
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${m.bg} ${m.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`}></span>
      {m.label}
    </span>
  )
}

function ResourceListPage() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState(null)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const navigate = useNavigate()

  const fetchResources = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await resourceApi.getAll()
      // Reverse to show newest first (backend returns insertion order)
      const data = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : [])
      setResources([...data].reverse())
    } catch {
      setError('Failed to load resources. Please make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchResources() }, [])

  const handleDelete = async () => {
    try {
      setDeleteLoading(true)
      await resourceApi.delete(deleteTarget.id)
      setSuccessMsg(`"${deleteTarget.name}" deleted successfully.`)
      setDeleteTarget(null)
      fetchResources()
      setTimeout(() => setSuccessMsg(null), 3000)
    } catch {
      setError('Failed to delete resource.')
    } finally {
      setDeleteLoading(false)
    }
  }

  const filtered = resources.filter(r => {
    const matchSearch = !search ||
      r.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.location?.toLowerCase().includes(search.toLowerCase())
    const matchType = !typeFilter || r.type === typeFilter
    const matchStatus = !statusFilter || r.status === statusFilter
    return matchSearch && matchType && matchStatus
  })

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Admin</p>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Resource Management</h1>
            <p className="text-sm text-slate-500 mt-1">
              {resources.length} resource{resources.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <Link
            to="/resources/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-indigo-700 transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-indigo-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Add Resource
          </Link>
        </div>

        {/* Alerts */}
        {successMsg && (
          <div className="mb-6 flex items-center gap-3 px-5 py-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm font-semibold">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {successMsg}
          </div>
        )}
        {error && (
          <div className="mb-6 flex items-center gap-3 px-5 py-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm font-semibold">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {/* Search & Filters */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 mb-6 flex flex-wrap gap-3 shadow-sm">
          <div className="relative flex-1 min-w-[200px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-400 focus:bg-white transition-all"
            />
          </div>
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-400 transition-all font-medium text-slate-700"
          >
            <option value="">All Types</option>
            <option value="LECTURE_HALL">Lecture Hall</option>
            <option value="COMPUTER_LAB">Computer Lab</option>
            <option value="MEETING_ROOM">Meeting Room</option>
            <option value="PROJECTOR">Projector</option>
            <option value="CAMERA">Camera</option>
          </select>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-400 transition-all font-medium text-slate-700"
          >
            <option value="">All Statuses</option>
            <option value="WORKING">In service</option>
            <option value="OUT_OF_SERVICE">Out of service</option>
          </select>
          {(search || typeFilter || statusFilter) && (
            <button
              onClick={() => { setSearch(''); setTypeFilter(''); setStatusFilter('') }}
              className="px-4 py-2.5 text-sm font-bold text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all"
            >
              Clear
            </button>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-semibold">Loading resources...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">📦</div>
            <p className="text-base font-bold text-slate-600 mb-1">No resources found</p>
            <p className="text-sm">Try adjusting your filters or add a new resource.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col gap-4"
              >
                {/* Top row: type badge + status badge */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <TypeBadge type={r.type} />
                  <StatusBadge status={r.status} />
                </div>

                {/* Name */}
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">{r.name}</h3>
                  {r.description && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{r.description}</p>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1.5">
                  {r.location && (
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">{r.location}</span>
                    </div>
                  )}
                  {r.capacity && (
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">Capacity: {r.capacity}</span>
                    </div>
                  )}
                  {(r.availableStartTime || r.availableEndTime) && (
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">{r.availableStartTime} – {r.availableEndTime}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 mt-auto">
                  <button
                    onClick={() => navigate(`/resources/edit/${r.id}`)}
                    className="flex-1 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(r)}
                    className="flex-1 py-2 text-xs font-bold text-rose-600 bg-rose-50 rounded-xl hover:bg-rose-100 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full animate-up">
            <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">Delete Resource</h3>
            <p className="text-sm text-slate-500 mb-6">
              Are you sure you want to delete <span className="font-bold text-slate-700">"{deleteTarget.name}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 py-2.5 text-sm font-bold text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition-all disabled:opacity-60"
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default ResourceListPage
