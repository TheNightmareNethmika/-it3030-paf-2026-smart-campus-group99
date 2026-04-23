import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminBookingsPage() {
  const navigate = useNavigate();
  const API_BASE = "http://localhost:8081/api";

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [decisionLoadingId, setDecisionLoadingId] = useState(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [decisionInputs, setDecisionInputs] = useState({});
  const [activeRejectId, setActiveRejectId] = useState(null);

  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      setPageError("");

      const response = await axios.get(`${API_BASE}/bookings`);
      setBookings(response.data);
    } catch (error) {
      setPageError("Failed to load all bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const handleReasonChange = (bookingId, value) => {
    setDecisionInputs((prev) => ({
      ...prev,
      [bookingId]: value,
    }));
  };

  const handleDecision = async (bookingId, status) => {
    try {
      setDecisionLoadingId(bookingId);
      setSuccessMessage("");
      setActionError("");

      const payload = {
        status,
        reason: decisionInputs[bookingId] || "",
      };

      const response = await axios.patch(
        `${API_BASE}/bookings/${bookingId}/decision`,
        payload
      );

      setSuccessMessage(
        `Booking #${bookingId} updated successfully. New status: ${response.data.status}`
      );

      setActiveRejectId(null);

      setDecisionInputs((prev) => ({
        ...prev,
        [bookingId]: "",
      }));

      fetchAllBookings();
    } catch (error) {
      if (error.response?.data?.message) {
        setActionError(error.response.data.message);
      } else {
        setActionError(`Failed to ${status.toLowerCase()} booking`);
      }
    } finally {
      setDecisionLoadingId(null);
    }
  };

  const handleDelete = async (bookingId) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete booking #${bookingId}?`
    );

    if (!confirmed) return;

    try {
      setDeleteLoadingId(bookingId);
      setSuccessMessage("");
      setActionError("");

      await axios.delete(`${API_BASE}/bookings/${bookingId}`);

      setSuccessMessage(`Booking #${bookingId} deleted successfully.`);
      fetchAllBookings();
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

  const getStatusColor = (status) => {
    if (status === "APPROVED") return "green";
    if (status === "PENDING") return "#d97706";
    if (status === "REJECTED") return "#6b7280";
    if (status === "CANCELLED") return "red";
    return "#444";
  };

  const statusBadgeStyle = (status) => {
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

    if (status === "REJECTED") {
      return {
        backgroundColor: "#e5e7eb",
        color: "#374151",
      };
    }

    if (status === "CANCELLED") {
      return {
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
      };
    }

    return {
      backgroundColor: "#e5e7eb",
      color: "#374151",
    };
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
          maxWidth: "1100px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "18px",
          padding: "28px",
          boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
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
            <h1 style={{ margin: 0 }}>Admin Booking Management</h1>
            <p style={{ marginTop: "8px", color: "#555" }}>
              Review, approve, reject, and delete booking requests.
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
          <p>Loading bookings...</p>
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
          <p>No bookings found.</p>
        ) : (
          <div style={{ display: "grid", gap: "18px" }}>
            {bookings.map((booking) => (
              <div
                key={booking.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "14px",
                  padding: "20px",
                  backgroundColor: "#fafafa",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      <h2 style={{ margin: 0 }}>Booking #{booking.id}</h2>

                      <span
                        style={{
                          padding: "6px 12px",
                          borderRadius: "999px",
                          fontWeight: "700",
                          fontSize: "14px",
                          ...statusBadgeStyle(booking.status),
                        }}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <p style={{ color: "#666", marginTop: "8px" }}>
                      Resource ID: {booking.resourceId}
                    </p>
                  </div>

                  <div>
                    <strong
                      style={{
                        color: getStatusColor(booking.status),
                        fontSize: "16px",
                      }}
                    >
                      {booking.status}
                    </strong>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "14px",
                    marginBottom: "16px",
                  }}
                >
                  <div><strong>User ID:</strong> {booking.userId}</div>
                  <div><strong>Date:</strong> {booking.bookingDate}</div>
                  <div><strong>Time:</strong> {booking.startTime} - {booking.endTime}</div>
                  <div><strong>Purpose:</strong> {booking.purpose}</div>
                  <div><strong>Expected Attendees:</strong> {booking.expectedAttendees}</div>
                  <div><strong>Created At:</strong> {booking.createdAt || "-"}</div>
                  <div><strong>Admin Reason:</strong> {booking.adminReason || "-"}</div>
                </div>

                {booking.status === "PENDING" && (
                  <div
                    style={{
                      borderTop: "1px solid #e5e7eb",
                      paddingTop: "16px",
                      marginTop: "8px",
                    }}
                  >
                    {activeRejectId !== booking.id && (
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <button
                          onClick={() => handleDecision(booking.id, "APPROVED")}
                          disabled={decisionLoadingId === booking.id}
                          style={{
                            padding: "10px 16px",
                            backgroundColor: "#16a34a",
                            color: "#fff",
                            border: "none",
                            borderRadius: "10px",
                            cursor:
                              decisionLoadingId === booking.id
                                ? "not-allowed"
                                : "pointer",
                            fontWeight: "600",
                          }}
                        >
                          {decisionLoadingId === booking.id
                            ? "Processing..."
                            : "Approve"}
                        </button>

                        <button
                          onClick={() => setActiveRejectId(booking.id)}
                          style={{
                            padding: "10px 16px",
                            backgroundColor: "#dc2626",
                            color: "#fff",
                            border: "none",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {activeRejectId === booking.id && (
                      <div style={{ marginTop: "14px" }}>
                        <label
                          style={{
                            display: "block",
                            fontWeight: "600",
                            marginBottom: "8px",
                          }}
                        >
                          Rejection Reason
                        </label>

                        <input
                          type="text"
                          placeholder="Enter rejection reason"
                          value={decisionInputs[booking.id] || ""}
                          onChange={(e) =>
                            handleReasonChange(booking.id, e.target.value)
                          }
                          style={{
                            width: "100%",
                            maxWidth: "420px",
                            padding: "10px 12px",
                            borderRadius: "10px",
                            border: "1px solid #d1d5db",
                            marginBottom: "12px",
                            boxSizing: "border-box",
                          }}
                        />

                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                          <button
                            onClick={() => handleDecision(booking.id, "REJECTED")}
                            disabled={decisionLoadingId === booking.id}
                            style={{
                              padding: "10px 16px",
                              backgroundColor: "#dc2626",
                              color: "#fff",
                              border: "none",
                              borderRadius: "10px",
                              cursor:
                                decisionLoadingId === booking.id
                                  ? "not-allowed"
                                  : "pointer",
                              fontWeight: "600",
                            }}
                          >
                            {decisionLoadingId === booking.id
                              ? "Processing..."
                              : "Confirm Reject"}
                          </button>

                          <button
                            onClick={() => {
                              setActiveRejectId(null);
                              setDecisionInputs((prev) => ({
                                ...prev,
                                [booking.id]: "",
                              }));
                            }}
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
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div style={{ marginTop: "16px" }}>
                  <button
                    onClick={() => handleDelete(booking.id)}
                    disabled={deleteLoadingId === booking.id}
                    style={{
                      padding: "10px 16px",
                      backgroundColor: "#111827",
                      color: "#fff",
                      border: "none",
                      borderRadius: "10px",
                      cursor:
                        deleteLoadingId === booking.id
                          ? "not-allowed"
                          : "pointer",
                      fontWeight: "600",
                    }}
                  >
                    {deleteLoadingId === booking.id
                      ? "Deleting..."
                      : "Delete Booking"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBookingsPage;