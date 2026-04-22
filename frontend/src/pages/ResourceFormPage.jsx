import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { resourceApi } from '../services/api'
import '../styles/ResourceFormPage.css'

const INITIAL_FORM = {
  name: '',
  type: '',
  capacity: '',
  location: '',
  availableStartTime: '',
  availableEndTime: '',
  status: '',
  description: '',
}

function ResourceFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [loadingResource, setLoadingResource] = useState(isEdit)
  const [globalError, setGlobalError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  // Load resource for edit mode
  useEffect(() => {
    if (!isEdit) return
    resourceApi.getById(id)
      .then((res) => {
        const r = res.data
        setForm({
          name: r.name || '',
          type: r.type || '',
          capacity: r.capacity !== null ? String(r.capacity) : '',
          location: r.location || '',
          availableStartTime: r.availableStartTime ? r.availableStartTime.substring(0, 5) : '',
          availableEndTime: r.availableEndTime ? r.availableEndTime.substring(0, 5) : '',
          status: r.status || '',
          description: r.description || '',
        })
      })
      .catch(() => setGlobalError('Failed to load resource data.'))
      .finally(() => setLoadingResource(false))
  }, [id, isEdit])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear individual error on change
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setServerErrors((prev) => ({ ...prev, [name]: '' }))
  }

  // === Frontend Validation ===
const validate = () => {
  const errs = {}
   // Resource Name
  if (!form.name.trim()) {
    errs.name = 'Resource name is required.'
  } else if (form.name.trim().length < 3) {
    errs.name = 'Resource name must be at least 3 characters.'
  } else if (form.name.trim().length > 100) {
    errs.name = 'Resource name must not exceed 100 characters.'
  }
  // Resource Type
  if (!form.type) {
    errs.type = 'Please select a resource type.'
  }

  // Capacity
  if (!form.capacity) {
    errs.capacity = 'Capacity is required.'
  } else if (isNaN(Number(form.capacity))) {
    errs.capacity = 'Capacity must be a number.'
  } else if (Number(form.capacity) < 1) {
    errs.capacity = 'Capacity must be at least 1.'
  } else if (!Number.isInteger(Number(form.capacity))) {
    errs.capacity = 'Capacity must be a whole number.'
  } else if (Number(form.capacity) > 1000) {
    errs.capacity = 'Capacity cannot exceed 1000.'
  }

  // Location
  if (!form.location.trim()) {
    errs.location = 'Location is required.'
  } else if (form.location.trim().length < 3) {
    errs.location = 'Location must be at least 3 characters.'
  } else if (form.location.trim().length > 200) {
    errs.location = 'Location must not exceed 200 characters.'
  }

  // Start Time
  if (!form.availableStartTime) {
    errs.availableStartTime = 'Available start time is required.'
  }

  // End Time
  if (!form.availableEndTime) {
    errs.availableEndTime = 'Available end time is required.'
  }

  // Time Compare
  if (form.availableStartTime && form.availableEndTime) {
    if (form.availableEndTime <= form.availableStartTime) {
      errs.availableEndTime = 'End time must be later than start time.'
    }
  }

  // Status
  if (!form.status) {
    errs.status = 'Please select a status.'
  }

  // Description
if (form.description) {
  const desc = form.description.trim()

  if (desc.length > 500) {
    errs.description = 'Description must not exceed 500 characters.'
  } else if (!/^[A-Za-z\s]+$/.test(desc)) {
    errs.description =
      'Description can contain letters and spaces only. Numbers and symbols are not allowed.'
  }
}

  return errs
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGlobalError(null)
    setSuccessMsg(null)

    const clientErrors = validate()
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors)
      return
    }

    const payload = {
      name: form.name.trim(),
      type: form.type,
      capacity: Number(form.capacity),
      location: form.location.trim(),
      availableStartTime: form.availableStartTime + ':00',
      availableEndTime: form.availableEndTime + ':00',
      status: form.status,
      description: form.description.trim() || null,
    }

    setSubmitting(true)
    try {
      if (isEdit) {
        await resourceApi.update(id, payload)
        setSuccessMsg('Resource updated successfully!')
      } else {
        await resourceApi.create(payload)
        setSuccessMsg('Resource created successfully!')
        setForm(INITIAL_FORM)
      }
      setTimeout(() => navigate('/resources'), 1500)
    } catch (err) {
      if (err?.errors) {
        setServerErrors(err.errors)
      } else {
        setGlobalError(err?.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loadingResource) {
    return (
      <div className="form-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading resource...</p>
        </div>
      </div>
    )
  }

  const fieldError = (field) => errors[field] || serverErrors[field]

  return (
    <div className="form-page">
      <div className="form-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <Link to="/resources" className="breadcrumb-link">Resources</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{isEdit ? 'Edit Resource' : 'Add Resource'}</span>
        </nav>

        <div className="form-card">
          <div className="form-card-header">
            <div className="form-icon">
              {isEdit ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
              )}
            </div>
            <div>
              <h1 className="form-title">{isEdit ? 'Edit Resource' : 'Add New Resource'}</h1>
              <p className="form-subtitle">
                {isEdit ? 'Update the details of this resource.' : 'Fill in the details to add a new campus resource.'}
              </p>
            </div>
          </div>

          {/* Success Alert */}
          {successMsg && (
            <div className="alert alert-success">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              {successMsg} Redirecting...
            </div>
          )}

          {/* Error Alert */}
          {globalError && (
            <div className="alert alert-error">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              {globalError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Section: Basic Info */}
            <div className="form-section">
              <h2 className="section-heading">Basic Information</h2>

              <div className="form-row">
                {/* Name */}
                <div className="form-group form-group-full">
                  <label className="form-label" htmlFor="name">
                    Resource Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Computer Lab A, Lecture Hall 01"
                    maxLength={100}
                    className={`form-input ${fieldError('name') ? 'input-error' : ''}`}
                  />
                  {fieldError('name') && <span className="error-msg">{fieldError('name')}</span>}
                  <span className="char-count">{form.name.length}/100</span>
                </div>
              </div>

              <div className="form-row form-row-2">
                {/* Type */}
                <div className="form-group">
                  <label className="form-label" htmlFor="type">
                    Resource Type <span className="required">*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className={`form-select ${fieldError('type') ? 'input-error' : ''}`}
                  >
                    <option value="">-- Select Type --</option>
                    <option value="LECTURE_HALL">Lecture Hall</option>
                    <option value="COMPUTER_LAB">Computer Lab</option>
                    <option value="MEETING_ROOM">Meeting Room</option>
                    <option value="PROJECTOR">Projector</option>
                    <option value="CAMERA">Camera</option>
                  </select>
                  {fieldError('type') && <span className="error-msg">{fieldError('type')}</span>}
                </div>

                {/* Capacity */}
                <div className="form-group">
                  <label className="form-label" htmlFor="capacity">
                    Capacity <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={form.capacity}
                    onChange={handleChange}
                    placeholder="e.g. 30"
                    min="1"
                    className={`form-input ${fieldError('capacity') ? 'input-error' : ''}`}
                  />
                  {fieldError('capacity') && <span className="error-msg">{fieldError('capacity')}</span>}
                </div>
              </div>

              <div className="form-row">
                {/* Location */}
                <div className="form-group form-group-full">
                  <label className="form-label" htmlFor="location">
                    Location <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Building A, Floor 2, Room 201"
                    maxLength={200}
                    className={`form-input ${fieldError('location') ? 'input-error' : ''}`}
                  />
                  {fieldError('location') && <span className="error-msg">{fieldError('location')}</span>}
                  <span className="char-count">{form.location.length}/200</span>
                </div>
              </div>
            </div>

            {/* Section: Availability & Status */}
            <div className="form-section">
              <h2 className="section-heading">Availability & Status</h2>

              <div className="form-row form-row-3">
                {/* Start Time */}
                <div className="form-group">
                  <label className="form-label" htmlFor="availableStartTime">
                    Available From <span className="required">*</span>
                  </label>
                  <input
                    type="time"
                    id="availableStartTime"
                    name="availableStartTime"
                    value={form.availableStartTime}
                    onChange={handleChange}
                    className={`form-input ${fieldError('availableStartTime') ? 'input-error' : ''}`}
                  />
                  {fieldError('availableStartTime') && <span className="error-msg">{fieldError('availableStartTime')}</span>}
                </div>

                {/* End Time */}
                <div className="form-group">
                  <label className="form-label" htmlFor="availableEndTime">
                    Available Until <span className="required">*</span>
                  </label>
                  <input
                    type="time"
                    id="availableEndTime"
                    name="availableEndTime"
                    value={form.availableEndTime}
                    onChange={handleChange}
                    className={`form-input ${fieldError('availableEndTime') ? 'input-error' : ''}`}
                  />
                  {fieldError('availableEndTime') && <span className="error-msg">{fieldError('availableEndTime')}</span>}
                </div>

                {/* Status */}
                <div className="form-group">
                  <label className="form-label" htmlFor="status">
                    Status <span className="required">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className={`form-select ${fieldError('status') ? 'input-error' : ''}`}
                  >
                    <option value="">-- Select Status --</option>
                    <option value="WORKING">Working</option>
                    <option value="OUT_OF_SERVICE">Out of Service</option>
                  </select>
                  {fieldError('status') && <span className="error-msg">{fieldError('status')}</span>}
                </div>
              </div>
            </div>

            {/* Section: Description */}
            <div className="form-section">
              <h2 className="section-heading">Additional Details</h2>
              <div className="form-group">
                <label className="form-label" htmlFor="description">
                  Description <span className="optional">(optional)</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  maxLength={500}
                  placeholder="Provide any additional details about this resource..."
                  className={`form-textarea ${fieldError('description') ? 'input-error' : ''}`}
                />
                {fieldError('description') && <span className="error-msg">{fieldError('description')}</span>}
                <span className="char-count">{form.description.length}/500</span>
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <Link to="/resources" className="btn btn-ghost">Cancel</Link>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? (
                  <>
                    <span className="btn-spinner"></span>
                    {isEdit ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  isEdit ? 'Update Resource' : 'Create Resource'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResourceFormPage
