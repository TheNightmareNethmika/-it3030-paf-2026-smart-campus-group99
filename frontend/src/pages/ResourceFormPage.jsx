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

// AUTOFILL TEMPLATES
const AUTOFILL_TEMPLATES = {
  LECTURE_HALL: {
    name: 'Main Lecture Hall',
    capacity: '200',
    location: 'Building A, Floor 1',
    availableStartTime: '08:00',
    availableEndTime: '22:00',
    status: 'WORKING',
    description: 'Large lecture hall with projector and audio system'
  },
  COMPUTER_LAB: {
    name: 'Computer Lab',
    capacity: '30',
    location: 'Building B, Floor 2',
    availableStartTime: '09:00',
    availableEndTime: '18:00',
    status: 'WORKING',
    description: 'Computer lab with 30 workstations and internet access'
  },
  MEETING_ROOM: {
    name: 'Conference Room',
    capacity: '15',
    location: 'Building C, Floor 3',
    availableStartTime: '08:00',
    availableEndTime: '17:00',
    status: 'WORKING',
    description: 'Meeting room with whiteboard and video conferencing'
  },
  PROJECTOR: {
    name: 'Portable Projector',
    capacity: '1',
    location: 'AV Department',
    availableStartTime: '07:00',
    availableEndTime: '23:00',
    status: 'WORKING',
    description: 'Portable projector with HDMI connection'
  },
  CAMERA: {
    name: 'Digital Camera',
    capacity: '1',
    location: 'Media Center',
    availableStartTime: '08:00',
    availableEndTime: '20:00',
    status: 'WORKING',
    description: 'Professional digital camera for events'
  }
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

  /* AVAILABILITY CHECKING STATES */
  const [checkingAvailability, setCheckingAvailability] = useState(false)
  const [availabilityStatus, setAvailabilityStatus] = useState(null)
  const [availabilityMessage, setAvailabilityMessage] = useState('')

  useEffect(() => {
    if (!isEdit) return

    resourceApi
      .getById(id)
      .then((res) => {
        const r = res.data

        setForm({
          name: r.name || '',
          type: r.type || '',
          capacity: r.capacity ? String(r.capacity) : '',
          location: r.location || '',
          availableStartTime: r.availableStartTime
            ? r.availableStartTime.substring(0, 5)
            : '',
          availableEndTime: r.availableEndTime
            ? r.availableEndTime.substring(0, 5)
            : '',
          status: r.status || '',
          description: r.description || '',
        })
      })
      .catch(() => setGlobalError('Failed to load resource details.'))
      .finally(() => setLoadingResource(false))
  }, [id, isEdit])

  const handleChange = (e) => {
    const { name, value } = e.target

    // Allow symbols and negative numbers in capacity field
    let processedValue = value
    if (name === 'capacity') {
      // Allow numbers, mathematical symbols, and negative numbers
      processedValue = value.replace(/[^0-9+\-*/.()=-]/g, '')
    }

    setForm((prev) => ({
      ...prev,
      [name]: processedValue,
    }))

    setErrors((prev) => ({ ...prev, [name]: '' }))
    setServerErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}

    if (!form.name.trim()) errs.name = 'Resource name is required.'
    if (!form.type) errs.type = 'Select resource type.'
    if (!form.capacity) errs.capacity = 'Capacity is required.'
    if (form.capacity && !/^[0-9+\-*/.()=-]+$/.test(form.capacity)) {
      errs.capacity = 'Capacity can contain numbers, symbols (+ - * / . ( ) =) and negative values'
    }
    if (!form.location.trim()) errs.location = 'Location is required.'
    if (!form.availableStartTime)
      errs.availableStartTime = 'Start time required.'
    if (!form.availableEndTime) errs.availableEndTime = 'End time required.'
    if (!form.status) errs.status = 'Select status.'

    if (
      form.availableStartTime &&
      form.availableEndTime &&
      form.availableEndTime <= form.availableStartTime
    ) {
      errs.availableEndTime = 'End time must be later.'
    }

    if (form.description.length > 500) {
      errs.description = 'Maximum 500 characters.'
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
        setSuccessMsg('Resource updated successfully.')
      } else {
        await resourceApi.create(payload)
        setSuccessMsg('Resource created successfully.')
        setForm(INITIAL_FORM)
      }

      setTimeout(() => navigate('/resources'), 1500)
    } catch (err) {
      if (err?.errors) {
        setServerErrors(err.errors)
      } else {
        setGlobalError(err?.message || 'Something went wrong.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const fieldError = (field) => errors[field] || serverErrors[field]

  // AUTOFILL FUNCTION
  const handleAutofill = (resourceType) => {
    const template = AUTOFILL_TEMPLATES[resourceType]
    if (template) {
      setForm(prev => ({
        ...prev,
        ...template,
        type: resourceType
      }))
      setErrors({})
      setServerErrors({})
      setSuccessMsg(`Form autofilled with ${resourceType.replace('_', ' ')} template`)
      setTimeout(() => setSuccessMsg(null), 2000)
    }
  }

  // Availability checking function
  const checkAvailability = async () => {
    if (!form.name || !form.location || !form.availableStartTime || !form.availableEndTime) {
      setAvailabilityStatus('error')
      setAvailabilityMessage('Please fill in resource name, location, and time fields first.')
      return
    }

    setCheckingAvailability(true)
    setAvailabilityStatus(null)
    setAvailabilityMessage('')

    try {
      // Simulate availability check API call
      setTimeout(() => {
        const startTime = new Date()
        const endTime = new Date()
        
        const [startHour, startMin] = form.availableStartTime.split(':')
        const [endHour, endMin] = form.availableEndTime.split(':')
        
        startTime.setHours(parseInt(startHour), parseInt(startMin), 0)
        endTime.setHours(parseInt(endHour), parseInt(endMin), 0)
        
        // Check if the time range is valid
        if (endTime <= startTime) {
          setAvailabilityStatus('error')
          setAvailabilityMessage('End time must be later than start time.')
        } else {
          // Simulate checking against existing bookings/resources
          const isAvailable = Math.random() > 0.3 // 70% chance of availability for demo
          
          if (isAvailable) {
            setAvailabilityStatus('available')
            setAvailabilityMessage(`✅ Resource "${form.name}" is available at ${form.location} during ${form.availableStartTime} - ${form.availableEndTime}`)
          } else {
            setAvailabilityStatus('unavailable')
            setAvailabilityMessage(`❌ Resource "${form.name}" is not available at ${form.location} during the specified time. Please choose a different time.`)
          }
        }
        
        setCheckingAvailability(false)
      }, 1500)
    } catch {
      setAvailabilityStatus('error')
      setAvailabilityMessage('Failed to check availability. Please try again.')
      setCheckingAvailability(false)
    }
  }

  if (loadingResource) {
    return (
      <div className="resource-shell">
        <div className="loader-wrap">
          <div className="loader"></div>
          <p>Loading resource...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="resource-shell">
      {/* LEFT PANEL */}
      <div className="resource-side-panel">
        <div className="overlay"></div>

        <div className="side-content">
          <span className="tag">SMART CAMPUS</span>

          <h1>
            {isEdit ? 'Upgrade Resource' : 'Create Resource'}
          </h1>

          <p>
            Manage campus resources through a modern and elegant dashboard
            interface.
          </p>

          <div className="steps">
            <span className="active"></span>
            <span className="active"></span>
            <span></span>
          </div>

          <div className="mini-cards">
            <div className="mini-card">
              <h3>24+</h3>
              <p>Buildings</p>
            </div>

            <div className="mini-card">
              <h3>120+</h3>
              <p>Resources</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="resource-main-panel">
        <div className="topbar">
          <Link to="/resources" className="back-btn">
            ← Back
          </Link>

          <div className="live-chip">
            <span></span> Live
          </div>
        </div>

        {successMsg && <div className="alert success">{successMsg}</div>}
        {globalError && <div className="alert error">{globalError}</div>}

        <form onSubmit={handleSubmit} className="neo-card">
          <div className="form-header">
            <h2>{isEdit ? 'Edit Details' : 'New Resource Entry'}</h2>
            <p>Please complete all required fields.</p>
          </div>

          {/* AUTOFILL SECTION */}
          {!isEdit && (
            <div className="autofill-section">
              <div className="autofill-header">
                <h3>⚡ Quick Fill Templates</h3>
                <p>Click any template to auto-fill the form with common resource configurations</p>
              </div>
              <div className="autofill-buttons">
                <button
                  type="button"
                  className="autofill-btn lecture-hall"
                  onClick={() => handleAutofill('LECTURE_HALL')}
                >
                  🏛️ Lecture Hall
                </button>
                <button
                  type="button"
                  className="autofill-btn computer-lab"
                  onClick={() => handleAutofill('COMPUTER_LAB')}
                >
                  💻 Computer Lab
                </button>
                <button
                  type="button"
                  className="autofill-btn meeting-room"
                  onClick={() => handleAutofill('MEETING_ROOM')}
                >
                  🤝 Meeting Room
                </button>
                <button
                  type="button"
                  className="autofill-btn projector"
                  onClick={() => handleAutofill('PROJECTOR')}
                >
                  📽️ Projector
                </button>
                <button
                  type="button"
                  className="autofill-btn camera"
                  onClick={() => handleAutofill('CAMERA')}
                >
                  📷 Camera
                </button>
              </div>
            </div>
          )}

          <div className="grid-layout">
            <div className="field wide">
              <label>Resource Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Computer Lab A"
              />
              {fieldError('name') && <small>{fieldError('name')}</small>}
            </div>

            <div className="field">
              <label>Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="LECTURE_HALL">Lecture Hall</option>
                <option value="COMPUTER_LAB">Computer Lab</option>
                <option value="MEETING_ROOM">Meeting Room</option>
                <option value="PROJECTOR">Projector</option>
                <option value="CAMERA">Camera</option>
              </select>
              {fieldError('type') && <small>{fieldError('type')}</small>}
            </div>

            <div className="field">
              <label>Capacity</label>
              <input
                type="text"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                placeholder="50 or -1 or 10+5"
              />
              {fieldError('capacity') && (
                <small>{fieldError('capacity')}</small>
              )}
            </div>

            <div className="field wide">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Building A / Floor 2"
              />
              {fieldError('location') && (
                <small>{fieldError('location')}</small>
              )}
            </div>

            <div className="field">
              <label>Start Time</label>
              <input
                type="time"
                name="availableStartTime"
                value={form.availableStartTime}
                onChange={handleChange}
              />
              {fieldError('availableStartTime') && (
                <small>{fieldError('availableStartTime')}</small>
              )}
            </div>

            <div className="field">
              <label>End Time</label>
              <input
                type="time"
                name="availableEndTime"
                value={form.availableEndTime}
                onChange={handleChange}
              />
              {fieldError('availableEndTime') && (
                <small>{fieldError('availableEndTime')}</small>
              )}
            </div>

            <div className="field wide">
              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="WORKING">Working</option>
                <option value="OUT_OF_SERVICE">Out of Service</option>
              </select>
              {fieldError('status') && <small>{fieldError('status')}</small>}
            </div>

            <div className="field wide">
              <label>Description</label>
              <textarea
                rows="4"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Additional notes..."
              />
              {fieldError('description') && (
                <small>{fieldError('description')}</small>
              )}
            </div>
          </div>

          {/* AVAILABILITY CHECK SECTION */}
          <div className="availability-section">
            <div className="availability-header">
              <h3>📅 Check Availability</h3>
              <p>Verify if this resource is available during the specified time</p>
            </div>

            <div className="availability-actions">
              <button
                type="button"
                className="availability-check-btn"
                onClick={checkAvailability}
                disabled={checkingAvailability}
              >
                {checkingAvailability ? '🔄 Checking...' : '🔍 Check Availability'}
              </button>
            </div>

            {availabilityMessage && (
              <div className={`availability-status ${availabilityStatus}`}>
                <p>{availabilityMessage}</p>
              </div>
            )}
          </div>

          <div className="actions">
            <Link to="/resources" className="cancel-btn">
              Cancel
            </Link>

            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting
                ? 'Please wait...'
                : isEdit
                ? 'Update Resource'
                : 'Create Resource'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResourceFormPage
