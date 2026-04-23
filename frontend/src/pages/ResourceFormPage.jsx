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
        {/* Modern Header */}
        <div className="form-header">
          <div className="header-content">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <span className="breadcrumb-separator">/</span>
              <Link to="/resources" className="breadcrumb-link">Resources</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{isEdit ? 'Edit Resource' : 'Add Resource'}</span>
            </div>
            
            <div className="form-title-section">
              <div className="form-icon">
                {isEdit ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          </div>
        </div>

        {/* Modern Form Card */}
        <div className="form-card">
          {/* Success Alert */}
          {successMsg && (
            <div className="alert alert-success">
              <div className="alert-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div className="alert-content">
                <span className="alert-title">Success!</span>
                <span className="alert-message">{successMsg} Redirecting...</span>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {globalError && (
            <div className="alert alert-error">
              <div className="alert-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </div>
              <div className="alert-content">
                <span className="alert-title">Error</span>
                <span className="alert-message">{globalError}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="modern-form">
            {/* Section 1: Basic Information */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <div>
                  <h2 className="section-title">Basic Information</h2>
                  <p className="section-description">Enter the essential details about this resource</p>
                </div>
              </div>

              <div className="form-grid">
                {/* Resource Name */}
                <div className="form-group full-width">
                  <label className="form-label" htmlFor="name">
                    Resource Name <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
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
                  </div>
                  {fieldError('name') && <span className="error-message">{fieldError('name')}</span>}
                  <span className="char-counter">{form.name.length}/100</span>
                </div>

                {/* Resource Type */}
                <div className="form-group">
                  <label className="form-label" htmlFor="type">
                    Resource Type <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7"/>
                      <rect x="14" y="3" width="7" height="7"/>
                      <rect x="14" y="14" width="7" height="7"/>
                      <rect x="3" y="14" width="7" height="7"/>
                    </svg>
                    <select
                      id="type"
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className={`form-select ${fieldError('type') ? 'input-error' : ''}`}
                    >
                      <option value="">Select resource type</option>
                      <option value="LECTURE_HALL">Lecture Hall</option>
                      <option value="COMPUTER_LAB">Computer Lab</option>
                      <option value="MEETING_ROOM">Meeting Room</option>
                      <option value="PROJECTOR">Projector</option>
                      <option value="CAMERA">Camera</option>
                    </select>
                  </div>
                  {fieldError('type') && <span className="error-message">{fieldError('type')}</span>}
                </div>

                {/* Capacity */}
                <div className="form-group">
                  <label className="form-label" htmlFor="capacity">
                    Capacity <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
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
                  </div>
                  {fieldError('capacity') && <span className="error-message">{fieldError('capacity')}</span>}
                </div>

                {/* Location */}
                <div className="form-group full-width">
                  <label className="form-label" htmlFor="location">
                    Location <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
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
                  </div>
                  {fieldError('location') && <span className="error-message">{fieldError('location')}</span>}
                  <span className="char-counter">{form.location.length}/200</span>
                </div>
              </div>
            </div>

            {/* Section 2: Availability & Status */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <h2 className="section-title">Availability & Status</h2>
                  <p className="section-description">Set the working hours and current status</p>
                </div>
              </div>

              <div className="form-grid">
                {/* Available From */}
                <div className="form-group">
                  <label className="form-label" htmlFor="availableStartTime">
                    Available From <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <input
                      type="time"
                      id="availableStartTime"
                      name="availableStartTime"
                      value={form.availableStartTime}
                      onChange={handleChange}
                      className={`form-input ${fieldError('availableStartTime') ? 'input-error' : ''}`}
                    />
                  </div>
                  {fieldError('availableStartTime') && <span className="error-message">{fieldError('availableStartTime')}</span>}
                </div>

                {/* Available Until */}
                <div className="form-group">
                  <label className="form-label" htmlFor="availableEndTime">
                    Available Until <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <input
                      type="time"
                      id="availableEndTime"
                      name="availableEndTime"
                      value={form.availableEndTime}
                      onChange={handleChange}
                      className={`form-input ${fieldError('availableEndTime') ? 'input-error' : ''}`}
                    />
                  </div>
                  {fieldError('availableEndTime') && <span className="error-message">{fieldError('availableEndTime')}</span>}
                </div>

                {/* Status */}
                <div className="form-group">
                  <label className="form-label" htmlFor="status">
                    Status <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <select
                      id="status"
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className={`form-select ${fieldError('status') ? 'input-error' : ''}`}
                    >
                      <option value="">Select status</option>
                      <option value="WORKING">Working</option>
                      <option value="OUT_OF_SERVICE">Out of Service</option>
                    </select>
                  </div>
                  {fieldError('status') && <span className="error-message">{fieldError('status')}</span>}
                </div>
              </div>
            </div>

            {/* Section 3: Additional Details */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div>
                  <h2 className="section-title">Additional Details</h2>
                  <p className="section-description">Provide any extra information about this resource</p>
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label" htmlFor="description">
                  Description <span className="optional">(optional)</span>
                </label>
                <div className="textarea-wrapper">
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
                  <span className="char-counter">{form.description.length}/500</span>
                </div>
                {fieldError('description') && <span className="error-message">{fieldError('description')}</span>}
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <Link to="/resources" className="btn btn-ghost">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 19 5 12 12 5"/>
                </svg>
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? (
                  <>
                    <span className="btn-spinner"></span>
                    {isEdit ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {isEdit ? (
                        <>
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </>
                      ) : (
                        <>
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="12" y1="8" x2="12" y2="16"/>
                          <line x1="8" y1="12" x2="16" y2="12"/>
                        </>
                      )}
                    </svg>
                    {isEdit ? 'Update Resource' : 'Create Resource'}
                  </>
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
