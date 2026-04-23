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

  const detailCardStyle = {
    backgroundColor: "#f8fafc",
    borderRadius: "14px",
    padding: "16px",
    border: "1px solid #e5e7eb",
  };

  const detailLabelStyle = {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "6px",
    fontWeight: "500",
  };

  const detailValueStyle = {
    fontSize: "17px",
    fontWeight: "700",
    color: "#0f172a",
    wordBreak: "break-word",
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
          maxWidth: "1200px",
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
                Admin Booking Management
              </h1>
              <p
                style={{
                  marginTop: "10px",
                  color: "#64748b",
                  fontSize: "16px",
                }}
              >
                Review, approve, reject, and delete booking requests.
              </p>
            </div>

            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "#ede9fe",
                color: "#6d28d9",
                borderRadius: "14px",
                fontWeight: "700",
                minWidth: "120px",
                textAlign: "center",
              }}
            >
              Total: {bookings.length}
            </div>
          </div>
        </div>

        {successMessage && (
          <div
            style={{
              backgroundColor: "#ecfdf5",
              color: "#166534",
              padding: "14px 16px",
              borderRadius: "14px",
              marginBottom: "18px",
              border: "1px solid #bbf7d0",
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
              border: "1px solid #fecaca",
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
        ) : bookings.length === 0 ? (
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
            No bookings found.
          </div>
        ) : (
          <div style={{ display: "grid", gap: "24px" }}>
            {bookings.map((booking) => (
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
                          ...statusBadgeStyle(booking.status),
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
                    gap: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <div style={detailCardStyle}>
                    <div style={detailLabelStyle}>User ID</div>
                    <div style={detailValueStyle}>{booking.userId}</div>
                  </div>

                  <div style={detailCardStyle}>
                    <div style={detailLabelStyle}>Booking Date</div>
                    <div style={detailValueStyle}>{booking.bookingDate}</div>
                  </div>

                  <div style={detailCardStyle}>
                    <div style={detailLabelStyle}>Time</div>
                    <div style={detailValueStyle}>
                      {booking.startTime} - {booking.endTime}
                    </div>
                  </div>

                  <div style={detailCardStyle}>
                    <div style={detailLabelStyle}>Purpose</div>
                    <div style={detailValueStyle}>{booking.purpose}</div>
                  </div>

                  <div style={detailCardStyle}>
                    <div style={detailLabelStyle}>Expected Attendees</div>
                    <div style={detailValueStyle}>{booking.expectedAttendees}</div>
                  </div>

                  <div style={detailCardStyle}>
                    <div style={detailLabelStyle}>Created At</div>
                    <div style={detailValueStyle}>{booking.createdAt || "-"}</div>
                  </div>

                  <div style={detailCardStyle}>
                    <div style={detailLabelStyle}>Admin Reason</div>
                    <div style={detailValueStyle}>{booking.adminReason || "-"}</div>
                  </div>
                </div>

                {booking.status === "PENDING" && (
                  <div
                    style={{
                      borderTop: "1px solid #e5e7eb",
                      paddingTop: "18px",
                      marginTop: "8px",
                    }}
                  >
                    {activeRejectId !== booking.id && (
                      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        <button
                          onClick={() => handleDecision(booking.id, "APPROVED")}
                          disabled={decisionLoadingId === booking.id}
                          style={{
                            padding: "11px 16px",
                            backgroundColor: "#16a34a",
                            color: "#fff",
                            border: "none",
                            borderRadius: "12px",
                            cursor:
                              decisionLoadingId === booking.id
                                ? "not-allowed"
                                : "pointer",
                            fontWeight: "600",
                            boxShadow: "0 6px 14px rgba(22, 163, 74, 0.22)",
                          }}
                        >
                          {decisionLoadingId === booking.id
                            ? "Processing..."
                            : "Approve"}
                        </button>

                        <button
                          onClick={() => setActiveRejectId(booking.id)}
                          style={{
                            padding: "11px 16px",
                            backgroundColor: "#dc2626",
                            color: "#fff",
                            border: "none",
                            borderRadius: "12px",
                            cursor: "pointer",
                            fontWeight: "600",
                            boxShadow: "0 6px 14px rgba(220, 38, 38, 0.22)",
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {activeRejectId === booking.id && (
                      <div
                        style={{
                          marginTop: "16px",
                          backgroundColor: "#fff7f7",
                          border: "1px solid #fecaca",
                          padding: "18px",
                          borderRadius: "16px",
                        }}
                      >
                        <label
                          style={{
                            display: "block",
                            fontWeight: "700",
                            marginBottom: "10px",
                            color: "#991b1b",
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
                            maxWidth: "480px",
                            padding: "12px 14px",
                            borderRadius: "12px",
                            border: "1px solid #d1d5db",
                            marginBottom: "14px",
                            boxSizing: "border-box",
                            backgroundColor: "#fff",
                            fontSize: "14px",
                          }}
                        />

                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                          <button
                            onClick={() => handleDecision(booking.id, "REJECTED")}
                            disabled={decisionLoadingId === booking.id}
                            style={{
                              padding: "11px 16px",
                              backgroundColor: "#dc2626",
                              color: "#fff",
                              border: "none",
                              borderRadius: "12px",
                              cursor:
                                decisionLoadingId === booking.id
                                  ? "not-allowed"
                                  : "pointer",
                              fontWeight: "600",
                              boxShadow: "0 6px 14px rgba(220, 38, 38, 0.22)",
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
                              padding: "11px 16px",
                              backgroundColor: "#e5e7eb",
                              color: "#111827",
                              border: "none",
                              borderRadius: "12px",
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

                <div style={{ marginTop: "18px" }}>
                  <button
                    onClick={() => handleDelete(booking.id)}
                    disabled={deleteLoadingId === booking.id}
                    style={{
                      padding: "11px 16px",
                      backgroundColor: "#111827",
                      color: "#fff",
                      border: "none",
                      borderRadius: "12px",
                      cursor:
                        deleteLoadingId === booking.id
                          ? "not-allowed"
                          : "pointer",
                      fontWeight: "600",
                      boxShadow: "0 6px 14px rgba(17, 24, 39, 0.18)",
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