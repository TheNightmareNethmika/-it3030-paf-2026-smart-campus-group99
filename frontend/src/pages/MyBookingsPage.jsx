import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyBookingsPage() {
  const navigate = useNavigate();
  const API_BASE = "http://localhost:8081/api";

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [cancelLoadingId, setCancelLoadingId] = useState(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [editBookingId, setEditBookingId] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const [editForm, setEditForm] = useState({
    bookingDate: "",
    startTime: "",
    endTime: "",
    purpose: "",
    expectedAttendees: "",
  });

  const [editErrors, setEditErrors] = useState({});

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      setPageError("");

      const response = await axios.get(`${API_BASE}/bookings/my`);
      setBookings(response.data);
    } catch (error) {
      setPageError("Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const getStatusStyles = (status) => {
    if (status === "APPROVED") {
      return {
        backgroundColor: "#dcfce7",
        color: "#166534",
      };
    }

    if (status === "PENDING") {
      return {
        backgroundColor: "#fef3c7",
        color: "#92400e",
      };
    }

    if (status === "CANCELLED") {
      return {
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
      };
    }

    if (status === "REJECTED") {
      return {
        backgroundColor: "#e5e7eb",
        color: "#374151",
      };
    }

    return {
      backgroundColor: "#e5e7eb",
      color: "#374151",
    };
  };

  const formatDateTime = (date, time) => {
    return `${date} ${time}`;
  };

  const startEdit = (booking) => {
    setEditBookingId(booking.id);
    setEditErrors({});
    setActionError("");
    setSuccessMessage("");

    setEditForm({
      bookingDate: booking.bookingDate || "",
      startTime: booking.startTime ? booking.startTime.slice(0, 5) : "",
      endTime: booking.endTime ? booking.endTime.slice(0, 5) : "",
      purpose: booking.purpose || "",
      expectedAttendees: booking.expectedAttendees || "",
    });
  };

  const cancelEdit = () => {
    setEditBookingId(null);
    setEditErrors({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setEditErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateEditForm = () => {
    const errors = {};

    if (!editForm.bookingDate) {
      errors.bookingDate = "Booking date is required";
    }

    if (!editForm.startTime) {
      errors.startTime = "Start time is required";
    }

    if (!editForm.endTime) {
      errors.endTime = "End time is required";
    }

    if (editForm.startTime && editForm.endTime && editForm.startTime >= editForm.endTime) {
      errors.endTime = "End time must be later than start time";
    }

    if (!editForm.purpose.trim()) {
      errors.purpose = "Purpose is required";
    }

    if (!editForm.expectedAttendees || Number(editForm.expectedAttendees) < 1) {
      errors.expectedAttendees = "Expected attendees must be at least 1";
    }

    return errors;
  };

  const handleUpdateBooking = async (bookingId) => {
    const validationErrors = validateEditForm();
    setEditErrors(validationErrors);
    setActionError("");
    setSuccessMessage("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const payload = {
      bookingDate: editForm.bookingDate,
      startTime: `${editForm.startTime}:00`,
      endTime: `${editForm.endTime}:00`,
      purpose: editForm.purpose.trim(),
      expectedAttendees: Number(editForm.expectedAttendees),
    };

    try {
      setEditLoading(true);

      const response = await axios.put(
        `${API_BASE}/bookings/${bookingId}`,
        payload
      );

      setSuccessMessage(
        `Booking #${bookingId} updated successfully. Status: ${response.data.status}`
      );

      setEditBookingId(null);
      fetchMyBookings();
    } catch (error) {
      if (error.response?.data?.message) {
        setActionError(error.response.data.message);
      } else if (error.response?.data?.messages) {
        setEditErrors(error.response.data.messages);
      } else {
        setActionError("Failed to update booking");
      }
    } finally {
      setEditLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      setCancelLoadingId(bookingId);
      setSuccessMessage("");
      setActionError("");

      const response = await axios.patch(
        `${API_BASE}/bookings/${bookingId}/cancel`
      );

      setSuccessMessage(
        `Booking #${bookingId} cancelled successfully. New status: ${response.data.status}`
      );

      fetchMyBookings();
    } catch (error) {
      if (error.response?.data?.message) {
        setActionError(error.response.data.message);
      } else {
        setActionError("Failed to cancel booking");
      }
    } finally {
      setCancelLoadingId(null);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete booking #${bookingId}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoadingId(bookingId);
      setSuccessMessage("");
      setActionError("");

      await axios.delete(`${API_BASE}/bookings/${bookingId}`);

      setSuccessMessage(`Booking #${bookingId} deleted successfully.`);
      fetchMyBookings();
    } catch (error) {
      if (error.response?.data?.message) {
        setActionError(error.response.data.message);
      } else {
        setActionError("Failed to delete booking");
      }
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const detailBoxStyle = {
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    padding: "16px",
    border: "1px solid #e5e7eb",
  };

  const labelStyle = {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "6px",
  };

  const valueStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#111827",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  const fieldErrorStyle = {
    color: "#dc2626",
    fontSize: "12px",
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
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>My Bookings</h1>
            <p style={{ marginTop: "8px", color: "#555" }}>
              Manage your booking requests using your backend actions.
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 16px",
              backgroundColor: "#111827",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Back to Resources
          </button>
        </div>

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

        {actionError && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              color: "#b91c1c",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "18px",
            }}
          >
            {actionError}
          </div>
        )}

        {loading ? (
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "16px",
            }}
          >
            Loading bookings...
          </div>
        ) : pageError ? (
          <div
            style={{
              backgroundColor: "#fef2f2",
              color: "#b91c1c",
              padding: "12px",
              borderRadius: "10px",
            }}
          >
            {pageError}
          </div>
        ) : bookings.length === 0 ? (
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "16px",
              color: "#666",
            }}
          >
            No bookings found.
          </div>
        ) : (
          <div style={{ display: "grid", gap: "24px" }}>
            {bookings.map((booking) => {
              const statusStyles = getStatusStyles(booking.status);

              return (
                <div
                  key={booking.id}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "18px",
                    padding: "24px",
                    boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "16px",
                      flexWrap: "wrap",
                      marginBottom: "24px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          flexWrap: "wrap",
                        }}
                      >
                        <h2 style={{ margin: 0 }}>Booking #{booking.id}</h2>
                        <span
                          style={{
                            padding: "8px 14px",
                            borderRadius: "999px",
                            fontWeight: "700",
                            fontSize: "14px",
                            ...statusStyles,
                          }}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <p style={{ color: "#6b7280", marginTop: "10px" }}>
                        Resource ID: #{booking.resourceId}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        alignItems: "flex-start",
                      }}
                    >
                      {booking.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => startEdit(booking)}
                            style={{
                              padding: "10px 16px",
                              backgroundColor: "#2563eb",
                              color: "#fff",
                              border: "none",
                              borderRadius: "10px",
                              cursor: "pointer",
                              fontWeight: "600",
                            }}
                          >
                            Edit Booking
                          </button>

                          <button
                            onClick={() => handleDeleteBooking(booking.id)}
                            disabled={deleteLoadingId === booking.id}
                            style={{
                              padding: "10px 16px",
                              backgroundColor: "#b91c1c",
                              color: "#fff",
                              border: "none",
                              borderRadius: "10px",
                              cursor:
                                deleteLoadingId === booking.id ? "not-allowed" : "pointer",
                              fontWeight: "600",
                            }}
                          >
                            {deleteLoadingId === booking.id
                              ? "Deleting..."
                              : "Delete Booking"}
                          </button>
                        </>
                      )}

                      {booking.status === "APPROVED" && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          disabled={cancelLoadingId === booking.id}
                          style={{
                            padding: "10px 16px",
                            backgroundColor: "#dc2626",
                            color: "#fff",
                            border: "none",
                            borderRadius: "10px",
                            cursor:
                              cancelLoadingId === booking.id ? "not-allowed" : "pointer",
                            fontWeight: "600",
                          }}
                        >
                          {cancelLoadingId === booking.id
                            ? "Cancelling..."
                            : "Cancel Booking"}
                        </button>
                      )}
                    </div>
                  </div>

                  {editBookingId === booking.id ? (
                    <div
                      style={{
                        border: "1px solid #dbeafe",
                        backgroundColor: "#f8fbff",
                        padding: "18px",
                        borderRadius: "14px",
                        marginBottom: "20px",
                      }}
                    >
                      <h3 style={{ marginTop: 0 }}>Edit Booking</h3>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                          gap: "14px",
                        }}
                      >
                        <div>
                          <label style={labelStyle}>Booking Date</label>
                          <input
                            type="date"
                            name="bookingDate"
                            value={editForm.bookingDate}
                            onChange={handleEditChange}
                            style={inputStyle}
                          />
                          {editErrors.bookingDate && (
                            <div style={fieldErrorStyle}>{editErrors.bookingDate}</div>
                          )}
                        </div>

                        <div>
                          <label style={labelStyle}>Start Time</label>
                          <input
                            type="time"
                            name="startTime"
                            value={editForm.startTime}
                            onChange={handleEditChange}
                            style={inputStyle}
                          />
                          {editErrors.startTime && (
                            <div style={fieldErrorStyle}>{editErrors.startTime}</div>
                          )}
                        </div>

                        <div>
                          <label style={labelStyle}>End Time</label>
                          <input
                            type="time"
                            name="endTime"
                            value={editForm.endTime}
                            onChange={handleEditChange}
                            style={inputStyle}
                          />
                          {editErrors.endTime && (
                            <div style={fieldErrorStyle}>{editErrors.endTime}</div>
                          )}
                        </div>

                        <div>
                          <label style={labelStyle}>Expected Attendees</label>
                          <input
                            type="number"
                            name="expectedAttendees"
                            value={editForm.expectedAttendees}
                            onChange={handleEditChange}
                            style={inputStyle}
                          />
                          {editErrors.expectedAttendees && (
                            <div style={fieldErrorStyle}>
                              {editErrors.expectedAttendees}
                            </div>
                          )}
                        </div>

                        <div style={{ gridColumn: "1 / -1" }}>
                          <label style={labelStyle}>Purpose</label>
                          <input
                            type="text"
                            name="purpose"
                            value={editForm.purpose}
                            onChange={handleEditChange}
                            style={inputStyle}
                          />
                          {editErrors.purpose && (
                            <div style={fieldErrorStyle}>{editErrors.purpose}</div>
                          )}
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                          marginTop: "16px",
                        }}
                      >
                        <button
                          onClick={() => handleUpdateBooking(booking.id)}
                          disabled={editLoading}
                          style={{
                            padding: "10px 16px",
                            backgroundColor: "#2563eb",
                            color: "#fff",
                            border: "none",
                            borderRadius: "10px",
                            cursor: editLoading ? "not-allowed" : "pointer",
                            fontWeight: "600",
                          }}
                        >
                          {editLoading ? "Saving..." : "Save Changes"}
                        </button>

                        <button
                          onClick={cancelEdit}
                          type="button"
                          style={{
                            padding: "10px 16px",
                            backgroundColor: "#e5e7eb",
                            color: "#111827",
                            border: "none",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          Cancel Edit
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <h3 style={{ marginBottom: "18px" }}>Booking Details</h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    <div style={detailBoxStyle}>
                      <div style={labelStyle}>Resource ID</div>
                      <div style={valueStyle}>{booking.resourceId}</div>
                    </div>

                    <div style={detailBoxStyle}>
                      <div style={labelStyle}>Purpose</div>
                      <div style={valueStyle}>{booking.purpose}</div>
                    </div>

                    <div style={detailBoxStyle}>
                      <div style={labelStyle}>Booking Date</div>
                      <div style={valueStyle}>{booking.bookingDate}</div>
                    </div>

                    <div style={detailBoxStyle}>
                      <div style={labelStyle}>Start Time</div>
                      <div style={valueStyle}>
                        {formatDateTime(booking.bookingDate, booking.startTime)}
                      </div>
                    </div>

                    <div style={detailBoxStyle}>
                      <div style={labelStyle}>End Time</div>
                      <div style={valueStyle}>
                        {formatDateTime(booking.bookingDate, booking.endTime)}
                      </div>
                    </div>

                    <div style={detailBoxStyle}>
                      <div style={labelStyle}>Expected Attendees</div>
                      <div style={valueStyle}>{booking.expectedAttendees}</div>
                    </div>

                    <div style={detailBoxStyle}>
                      <div style={labelStyle}>Created At</div>
                      <div style={valueStyle}>{booking.createdAt || "-"}</div>
                    </div>

                    <div style={detailBoxStyle}>
                      <div style={labelStyle}>Admin Reason</div>
                      <div style={valueStyle}>{booking.adminReason || "-"}</div>
                    </div>

                    <div style={detailBoxStyle}>
                      <div style={labelStyle}>Status</div>
                      <div style={valueStyle}>{booking.status}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookingsPage;