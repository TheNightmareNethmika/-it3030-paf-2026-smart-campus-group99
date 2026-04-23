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

      setTimeout(() => {
        navigate("/my-bookings");
      }, 1200);
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
    borderRadius: "14px",
    border: "1px solid #dbe3ee",
    fontSize: "16px",
    boxSizing: "border-box",
    backgroundColor: "#f8fafc",
    color: "#111827",
    outline: "none",
    boxShadow: "inset 0 1px 2px rgba(15, 23, 42, 0.04)",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "700",
    color: "#0f172a",
    fontSize: "15px",
  };

  const errorStyle = {
    color: "#dc2626",
    fontSize: "13px",
    marginTop: "6px",
    fontWeight: "500",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%)",
        padding: "36px 16px",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "28px",
          padding: "34px",
          boxShadow: "0 18px 40px rgba(15, 23, 42, 0.10)",
          border: "1px solid #edf2f7",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              marginTop: 0,
              marginBottom: "10px",
              fontSize: "42px",
              color: "#0f172a",
              lineHeight: "1.1",
            }}
          >
            Book Resource
          </h1>
          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "17px",
            }}
          >
            Fill out the booking form and confirm your request.
          </p>
        </div>

        {selectedResource ? (
          <div
            style={{
              background: "linear-gradient(135deg, #eff6ff 0%, #f8fbff 100%)",
              border: "1px solid #bfdbfe",
              padding: "18px",
              borderRadius: "18px",
              marginBottom: "22px",
              boxShadow: "0 6px 16px rgba(37, 99, 235, 0.08)",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#2563eb",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.4px",
              }}
            >
              Selected Resource
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "24px",
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              {selectedResource.name}
            </p>
            <p
              style={{
                margin: "8px 0 0 0",
                color: "#475569",
                fontSize: "16px",
              }}
            >
              Type: <strong>{selectedResource.type}</strong>
            </p>
          </div>
        ) : null}

        {successMessage && (
          <div
            style={{
              backgroundColor: "#ecfdf5",
              color: "#166534",
              padding: "14px 16px",
              borderRadius: "16px",
              marginBottom: "18px",
              border: "1px solid #bbf7d0",
              boxShadow: "0 4px 10px rgba(22, 101, 52, 0.08)",
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
              padding: "14px 16px",
              borderRadius: "16px",
              marginBottom: "18px",
              border: "1px solid #fecaca",
              boxShadow: "0 4px 10px rgba(185, 28, 28, 0.08)",
            }}
          >
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "22px" }}>
            <label style={labelStyle}>Resource ID</label>
            <input
              type="text"
              value={formData.resourceId}
              readOnly
              style={{
                ...inputStyle,
                backgroundColor: "#f1f5f9",
                color: "#64748b",
                fontWeight: "600",
              }}
            />
            {errors.resourceId && <div style={errorStyle}>{errors.resourceId}</div>}
          </div>

          <div style={{ marginBottom: "22px" }}>
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "22px",
            }}
          >
            <div>
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

            <div>
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
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label style={labelStyle}>Attendees</label>
            <input
              type="number"
              name="expectedAttendees"
              min="1"
              value={formData.expectedAttendees}
              onChange={handleChange}
              placeholder="Enter expected attendees"
              style={inputStyle}
            />
            {errors.expectedAttendees && (
              <div style={errorStyle}>{errors.expectedAttendees}</div>
            )}
          </div>

          <div style={{ marginBottom: "22px" }}>
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

          <div
            style={{
              marginBottom: "24px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "16px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                style={{
                  marginTop: "4px",
                  width: "18px",
                  height: "18px",
                  accentColor: "#2563eb",
                }}
              />
              <span
                style={{
                  color: "#475569",
                  lineHeight: "1.6",
                  fontSize: "15px",
                }}
              >
                I confirm these details are accurate and agree to the
                <span style={{ color: "#2563eb", fontWeight: "600" }}> cancellation policy</span>.
              </span>
            </label>
            {errors.agree && <div style={errorStyle}>{errors.agree}</div>}
          </div>

          <button
            type="submit"
            disabled={loading || !selectedResource}
            style={{
              width: "100%",
              padding: "16px",
              background: loading || !selectedResource
                ? "#93c5fd"
                : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: "16px",
              fontSize: "18px",
              fontWeight: "700",
              cursor: loading || !selectedResource ? "not-allowed" : "pointer",
              marginBottom: "12px",
              boxShadow: "0 10px 20px rgba(37, 99, 235, 0.22)",
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
              color: "#334155",
              border: "1px solid #dbe3ee",
              borderRadius: "16px",
              fontSize: "17px",
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