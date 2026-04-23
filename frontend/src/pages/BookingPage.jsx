import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedResource = location.state?.selectedResource;

  const today = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const currentTime = useMemo(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }, []);

  const [formData, setFormData] = useState({
    resourceId: selectedResource?.id || "",
    bookingDate: "",
    startTime: "",
    endTime: "",
    purpose: "",
    expectedAttendees: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = "http://localhost:8081/api";

  const validateForm = () => {
    const newErrors = {};

    if (!formData.resourceId) {
      newErrors.resourceId = "Resource is required";
    }

    if (!formData.bookingDate) {
      newErrors.bookingDate = "Booking date is required";
    } else if (formData.bookingDate < today) {
      newErrors.bookingDate = "Previous dates are not allowed";
    }

    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }

    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }

    if (
      formData.bookingDate === today &&
      formData.startTime &&
      formData.startTime < currentTime
    ) {
      newErrors.startTime = "Previous time is not allowed for today";
    }

    if (
      formData.startTime &&
      formData.endTime &&
      formData.startTime >= formData.endTime
    ) {
      newErrors.endTime = "End time must be later than start time";
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = "Purpose is required";
    } else if (formData.purpose.trim().length < 3) {
      newErrors.purpose = "Purpose must be at least 3 characters";
    }

    if (!formData.expectedAttendees) {
      newErrors.expectedAttendees = "Expected attendees is required";
    } else if (Number(formData.expectedAttendees) < 1) {
      newErrors.expectedAttendees = "Expected attendees must be at least 1";
    }

    if (!formData.agree) {
      newErrors.agree = "You must confirm these details before booking";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccessMessage("");
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setSuccessMessage("");
    setApiError("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const payload = {
      resourceId: Number(formData.resourceId),
      bookingDate: formData.bookingDate,
      startTime: `${formData.startTime}:00`,
      endTime: `${formData.endTime}:00`,
      purpose: formData.purpose.trim(),
      expectedAttendees: Number(formData.expectedAttendees),
    };

    try {
      setLoading(true);

      const response = await axios.post(`${API_BASE}/bookings`, payload);

      setSuccessMessage(
        `Booking created successfully. Booking ID: ${response.data.id}, Status: ${response.data.status}`
      );

      setFormData({
        resourceId: selectedResource?.id || "",
        bookingDate: "",
        startTime: "",
        endTime: "",
        purpose: "",
        expectedAttendees: "",
        agree: false,
      });
    } catch (error) {
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else if (error.response?.data?.messages) {
        setErrors(error.response.data.messages);
        setApiError("Please fix the validation errors");
      } else {
        setApiError("Failed to create booking");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    boxSizing: "border-box",
    backgroundColor: "#3a3a3d",
    color: "#ffffff",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#111827",
    fontSize: "15px",
  };

  const errorStyle = {
    color: "#dc2626",
    fontSize: "13px",
    marginTop: "6px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#eef0f3",
        padding: "30px 15px",
      }}
    >
      <div
        style={{
          maxWidth: "620px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "18px",
          padding: "28px",
          boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: "18px" }}>Book Resource</h1>

        {selectedResource ? (
          <div
            style={{
              backgroundColor: "#eff6ff",
              border: "1px solid #bfdbfe",
              padding: "14px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <p style={{ margin: 0 }}>
              <strong>Selected Resource:</strong> {selectedResource.name}
            </p>
            <p style={{ margin: "6px 0 0 0" }}>
              <strong>Type:</strong> {selectedResource.type}
            </p>
          </div>
        ) : null}

        {successMessage && (
          <div
            style={{
              backgroundColor: "#e8f8ee",
              color: "#166534",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "18px",
            }}
          >
            {successMessage}
          </div>
        )}

        {apiError && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              color: "#b91c1c",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "18px",
            }}
          >
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Resource ID</label>
            <input
              type="text"
              value={formData.resourceId}
              readOnly
              style={{
                ...inputStyle,
                backgroundColor: "#d4d4d4",
                color: "#6b7280",
              }}
            />
            {errors.resourceId && <div style={errorStyle}>{errors.resourceId}</div>}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Booking Date</label>
            <input
              type="date"
              name="bookingDate"
              min={today}
              value={formData.bookingDate}
              onChange={handleChange}
              style={inputStyle}
            />
            {errors.bookingDate && <div style={errorStyle}>{errors.bookingDate}</div>}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Start Time</label>
            <input
              type="time"
              name="startTime"
              min={formData.bookingDate === today ? currentTime : ""}
              value={formData.startTime}
              onChange={handleChange}
              style={inputStyle}
            />
            {errors.startTime && <div style={errorStyle}>{errors.startTime}</div>}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              style={inputStyle}
            />
            {errors.endTime && <div style={errorStyle}>{errors.endTime}</div>}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Attendees</label>
            <input
              type="number"
              name="expectedAttendees"
              min="1"
              value={formData.expectedAttendees}
              onChange={handleChange}
              style={inputStyle}
            />
            {errors.expectedAttendees && (
              <div style={errorStyle}>{errors.expectedAttendees}</div>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Purpose</label>
            <input
              type="text"
              name="purpose"
              placeholder="e.g. Team Meeting"
              value={formData.purpose}
              onChange={handleChange}
              style={inputStyle}
            />
            {errors.purpose && <div style={errorStyle}>{errors.purpose}</div>}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                style={{ marginTop: "4px" }}
              />
              <span style={{ color: "#4b5563", lineHeight: "1.5" }}>
                I confirm these details are accurate and agree to the
                <span style={{ color: "#2563eb" }}> cancellation policy</span>.
              </span>
            </label>
            {errors.agree && <div style={errorStyle}>{errors.agree}</div>}
          </div>

          <button
            type="submit"
            disabled={loading || !selectedResource}
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: loading || !selectedResource ? "#93c5fd" : "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: "700",
              cursor: loading || !selectedResource ? "not-allowed" : "pointer",
              marginBottom: "12px",
            }}
          >
            {loading ? "Confirming..." : "Confirm Booking"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "#ffffff",
              color: "#374151",
              border: "1px solid #d1d5db",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;