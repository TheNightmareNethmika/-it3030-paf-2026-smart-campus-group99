import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function MyBookingsPage() {
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

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("");

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

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setDateFilter("");
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.id.toString().includes(searchTerm.toLowerCase()) ||
        booking.resourceId.toString().includes(searchTerm.toLowerCase()) ||
        booking.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.status.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ? true : booking.status === statusFilter;

      const matchesDate =
        dateFilter === "" ? true : booking.bookingDate === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [bookings, searchTerm, statusFilter, dateFilter]);

  const detailBoxStyle = {
    backgroundColor: "#f8fafc",
    borderRadius: "14px",
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
    backgroundColor: "#fff",
  };

  const fieldErrorStyle = {
    color: "#dc2626",
    fontSize: "12px",
    marginTop: "6px",
  };

  const filterInputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    boxSizing: "border-box",
    backgroundColor: "#fff",
    outline: "none",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%)",
        padding: "32px 16px",
      }}
    >
      <div
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            padding: "28px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
            marginBottom: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "34px",
                  color: "#0f172a",
                }}
              >
                My Bookings
              </h1>
             
            </div>

            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "#eff6ff",
                color: "#1d4ed8",
                borderRadius: "14px",
                fontWeight: "700",
                minWidth: "120px",
                textAlign: "center",
              }}
            >
              Total: {filteredBookings.length}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr auto",
              gap: "14px",
            }}
          >
            <input
              type="text"
              placeholder="Search by booking ID, resource ID, purpose, or status"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={filterInputStyle}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={filterInputStyle}
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={filterInputStyle}
            />

            <button
              onClick={clearFilters}
              style={{
                padding: "12px 18px",
                backgroundColor: "#111827",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {successMessage && (
          <div
            style={{
              backgroundColor: "#e8f8ee",
              color: "#166534",
              padding: "14px 16px",
              borderRadius: "14px",
              marginBottom: "18px",
              boxShadow: "0 4px 10px rgba(22, 101, 52, 0.08)",
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
              padding: "14px 16px",
              borderRadius: "14px",
              marginBottom: "18px",
              boxShadow: "0 4px 10px rgba(185, 28, 28, 0.08)",
            }}
          >
            {actionError}
          </div>
        )}

        {loading ? (
          <div
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "20px",
              boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
            }}
          >
            Loading bookings...
          </div>
        ) : pageError ? (
          <div
            style={{
              backgroundColor: "#fef2f2",
              color: "#b91c1c",
              padding: "14px 16px",
              borderRadius: "14px",
            }}
          >
            {pageError}
          </div>
        ) : filteredBookings.length === 0 ? (
          <div
            style={{
              backgroundColor: "#fff",
              padding: "28px",
              borderRadius: "20px",
              color: "#64748b",
              textAlign: "center",
              boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
            }}
          >
            No matching bookings found.
          </div>
        ) : (
          <div style={{ display: "grid", gap: "24px" }}>
            {filteredBookings.map((booking) => {
              const statusStyles = getStatusStyles(booking.status);

              return (
                <div
                  key={booking.id}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "24px",
                    padding: "26px",
                    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
                    border: "1px solid #eef2f7",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "18px",
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
                        <h2
                          style={{
                            margin: 0,
                            fontSize: "30px",
                            color: "#0f172a",
                          }}
                        >
                          Booking #{booking.id}
                        </h2>

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

                      <p
                        style={{
                          color: "#64748b",
                          marginTop: "10px",
                          fontSize: "16px",
                        }}
                      >
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
                              padding: "11px 16px",
                              backgroundColor: "#2563eb",
                              color: "#fff",
                              border: "none",
                              borderRadius: "12px",
                              cursor: "pointer",
                              fontWeight: "600",
                              boxShadow: "0 6px 14px rgba(37, 99, 235, 0.25)",
                            }}
                          >
                            Edit Booking
                          </button>

                          <button
                            onClick={() => handleDeleteBooking(booking.id)}
                            disabled={deleteLoadingId === booking.id}
                            style={{
                              padding: "11px 16px",
                              backgroundColor: "#dc2626",
                              color: "#fff",
                              border: "none",
                              borderRadius: "12px",
                              cursor:
                                deleteLoadingId === booking.id ? "not-allowed" : "pointer",
                              fontWeight: "600",
                              boxShadow: "0 6px 14px rgba(220, 38, 38, 0.22)",
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
                            padding: "11px 16px",
                            backgroundColor: "#ea580c",
                            color: "#fff",
                            border: "none",
                            borderRadius: "12px",
                            cursor:
                              cancelLoadingId === booking.id ? "not-allowed" : "pointer",
                            fontWeight: "600",
                            boxShadow: "0 6px 14px rgba(234, 88, 12, 0.22)",
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
                        padding: "20px",
                        borderRadius: "18px",
                        marginBottom: "22px",
                      }}
                    >
                      <h3
                        style={{
                          marginTop: 0,
                          marginBottom: "16px",
                          color: "#1e3a8a",
                        }}
                      >
                        Edit Booking
                      </h3>

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

                  <h3
                    style={{
                      marginBottom: "18px",
                      color: "#0f172a",
                      fontSize: "24px",
                    }}
                  >
                    Booking Details
                  </h3>

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