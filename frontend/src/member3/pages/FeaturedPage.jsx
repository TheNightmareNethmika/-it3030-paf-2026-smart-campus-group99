import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllIssues } from "../api/issueApi";

export default function FeaturedPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase().trim() || "";
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [buildingFilter, setBuildingFilter] = useState("all");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const res = await getAllIssues();

      const sortedTickets = [...res.data].sort((a, b) => (b.id || 0) - (a.id || 0));

      setTickets(sortedTickets);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load featured conversations.");
    } finally {
      setLoading(false);
    }
  };

    const formatDateTime = (value) => {
    if (!value) return "Just now";

    const normalized = value.replace("T", " ").split(".")[0];
    const date = new Date(normalized);

    if (Number.isNaN(date.getTime())) return "Just now";

    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const abbreviate = (text, max = 220) => {
    if (!text) return "";
    return text.length > max ? text.substring(0, max) + "..." : text;
  };

  const getFilteredTickets = () => {
    return filteredTickets.filter(ticket => {
      const statusMatch = statusFilter === "all" || ticket.status === statusFilter;
      const priorityMatch = priorityFilter === "all" || ticket.priority === priorityFilter;
      const categoryMatch = categoryFilter === "all" || ticket.category === categoryFilter;
      const buildingMatch = buildingFilter === "all" || ticket.building === buildingFilter;
      return statusMatch && priorityMatch && categoryMatch && buildingMatch;
    });
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (!searchTerm) return true;

    const searchableText = [
      ticket.title,
      ticket.description,
      ticket.category,
      ticket.building,
      ticket.locationType,
      ticket.priority,
      ticket.roomNumber,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(searchTerm);
  });

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          background: #f6f7f8;
          color: #1f2937;
        }

        .page-shell {
          max-width: 1320px;
          margin: 0 auto;
          padding: 28px 24px 56px;
        }

        .layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 28px;
          align-items: start;
        }

        .main-column {
          min-width: 0;
        }

        .page-header {
          padding: 8px 4px 20px;
          margin-bottom: 6px;
        }

        .page-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #2563eb;
          margin-bottom: 10px;
        }

        .page-title {
          font-size: 50px;
          line-height: 1.05;
          font-weight: 800;
          color: #111827;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          font-size: 18px;
          line-height: 1.75;
          color: #667085;
          max-width: 860px;
        }

        .feed-shell {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feed-card {
          display: block;
          text-decoration: none;
          color: inherit;
          background: #ffffff;
          border: 1px solid #e7ebf0;
          border-radius: 22px;
          padding: 22px 24px 18px;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.03);
          cursor: pointer;
        }

        .feed-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 30px rgba(15, 23, 42, 0.06);
          border-color: #d9e2ec;
        }

        .feed-meta-top {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          font-size: 13px;
          color: #7b8794;
        }

        .feed-meta-author {
          font-weight: 700;
          color: #344054;
        }

        .feed-dot {
          color: #c5ced8;
        }

        .feed-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 10px;
        }

        .feed-main {
          min-width: 0;
          flex: 1;
        }

        .feed-title {
          font-size: 26px;
          line-height: 1.28;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 10px;
          word-break: break-word;
        }

        .status-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 13px;
          border-radius: 999px;
          background: #e8f0fe;
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .feed-desc {
          font-size: 16px;
          line-height: 1.75;
          color: #5f6c7b;
          margin-bottom: 18px;
          word-break: break-word;
        }

        .feed-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
          flex-wrap: wrap;
        }

        .feed-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 12px;
        }

        .meta-pill {
          display: inline-flex;
          align-items: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          color: #475467;
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
        }

        .comment-count {
          font-size: 14px;
          font-weight: 700;
          color: #667085;
          white-space: nowrap;
          margin-left: auto;
        }

        .empty-state {
          background: #ffffff;
          border: 1px solid #e7ebf0;
          border-radius: 22px;
          padding: 30px 24px;
          color: #667085;
          font-size: 16px;
          line-height: 1.8;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.03);
        }

        .side-panel {
          position: sticky;
          top: 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .premium-actions {
          background: linear-gradient(145deg, #ffffff 0%, #f8fbff 100%);
          border: 1px solid #e6eef8;
          border-radius: 22px;
          padding: 22px 20px;
          box-shadow: 0 18px 30px rgba(15, 23, 42, 0.04);
        }

        .premium-actions h3 {
          font-size: 22px;
          color: #111827;
          margin-bottom: 8px;
        }

        .premium-actions p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 18px;
        }

        .action-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .action-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          text-decoration: none;
          color: #111827;
          padding: 14px 16px;
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          cursor: pointer;
        }

        .action-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          border-color: #cbd5e1;
        }

        .action-link-title {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
        }

        .action-link-sub {
          font-size: 12px;
          color: #6b7280;
          margin-top: 3px;
        }

        .action-arrow {
          font-size: 18px;
          color: #94a3b8;
          flex-shrink: 0;
        }

        .side-card {
          background: #ffffff;
          border: 1px solid #edeff1;
          border-radius: 18px;
          padding: 22px 20px;
        }

        .side-card h3 {
          font-size: 17px;
          color: #111827;
          margin-bottom: 12px;
        }

        .side-card p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.8;
        }

        .error-state {
          background: #ffffff;
          border: 1px solid #fecaca;
          border-radius: 22px;
          padding: 24px;
          color: #b91c1c;
          font-size: 15px;
          line-height: 1.7;
        }

        @media (max-width: 1100px) {
          .layout {
            grid-template-columns: 1fr;
          }

          .side-panel {
            position: static;
          }
        }

        .filter-container {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          margin-bottom: 24px;
          padding: 16px 20px;
          background: #ffffff;
          border: 1px solid #e7ebf0;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
        }

        .filter-label {
          font-size: 13px;
          font-weight: 700;
          color: #667085;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          align-self: center;
        }

        .filter-select {
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #ffffff;
          color: #111827;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          appearance: none;
          padding-right: 28px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23667085' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          height: 40px;
          flex-shrink: 0;
        }

        .filter-select.status-select,
        .filter-select.priority-select {
          width: 120px;
        }

        .filter-select.category-select,
        .filter-select.building-select {
          width: 160px;
        }

        .filter-select:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .filter-select:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .filter-divider {
          width: 1px;
          height: 24px;
          background: #e5e7eb;
          margin: 0 4px;
        }

        .clear-filters-btn {
          padding: 10px 12px;
          border: 1px solid #dc2626;
          background: transparent;
          color: #dc2626;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          height: 40px;
          width: 100px;
          flex-shrink: 0;
          align-self: center;
          margin-left: auto;
        }

        .clear-filters-btn:hover {
          background: rgba(220, 38, 38, 0.08);
          color: #dc2626;
        }

        @media (max-width: 1100px) {
          .layout {
            grid-template-columns: 1fr;
          }

          .side-panel {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .page-shell {
            padding: 18px 14px 40px;
          }

          .page-title {
            font-size: 38px;
          }

          .page-subtitle {
            font-size: 16px;
          }

          .feed-card {
            padding: 18px 16px;
          }

          .feed-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .feed-title {
            font-size: 23px;
          }

          .feed-desc {
            font-size: 15px;
          }

          .feed-bottom {
            flex-direction: column;
            align-items: flex-start;
          }

          .comment-count {
            margin-left: 0;
          }
        }
      `}</style>

      <div className="page-shell">
        <div className="layout">
          <main className="main-column">
            <section className="page-header">
              <div className="page-eyebrow">Community Feed</div>
              <h1 className="page-title">Featured Conversations</h1>
              <p className="page-subtitle">
                Explore reported issues and join helpful discussions.
                {searchTerm && ` Showing results for "${searchTerm}".`}
              </p>
            </section>

            {loading ? (
              <section className="empty-state">Loading conversations...</section>
            ) : error ? (
              <section className="error-state">{error}</section>
            ) : filteredTickets.length > 0 ? (
              <>
                <div className="filter-container">
                  <span className="filter-label">Filter by:</span>
                  <select 
                    className="filter-select status-select" 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="OPEN">Open</option>
                    <option value="IN PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="CLOSED">Closed</option>
                  </select>

                  <select 
                    className="filter-select priority-select" 
                    value={priorityFilter} 
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <option value="all">All Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>

                  <select 
                    className="filter-select category-select" 
                    value={categoryFilter} 
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">All Category</option>
                    <option value="Classroom Facilities">Classroom Facilities</option>
                    <option value="Laboratory Equipment">Laboratory Equipment</option>
                    <option value="IT / Network">IT / Network</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Air Conditioning / Ventilation">Air Conditioning / Ventilation</option>
                    <option value="Plumbing / Water">Plumbing / Water</option>
                    <option value="Cleanliness / Housekeeping">Cleanliness / Housekeeping</option>
                    <option value="Safety Hazard">Safety Hazard</option>
                    <option value="Other">Other</option>
                  </select>

                  <select 
                    className="filter-select building-select" 
                    value={buildingFilter} 
                    onChange={(e) => setBuildingFilter(e.target.value)}
                  >
                    <option value="all">All Buildings</option>
                    <option value="Main Building">Main Building</option>
                    <option value="Engineering Building">Engineering Building</option>
                    <option value="Computing Building">Computing Building</option>
                    <option value="Library">Library</option>
                    <option value="Administration Block">Administration Block</option>
                    <option value="Auditorium">Auditorium</option>
                    <option value="Student Center">Student Center</option>
                    <option value="Hostel Area">Hostel Area</option>
                    <option value="Parking Area">Parking Area</option>
                    <option value="Other">Other</option>
                  </select>

                  {(statusFilter !== "all" || priorityFilter !== "all" || categoryFilter !== "all" || buildingFilter !== "all") && (
                    <button 
                      className="clear-filters-btn"
                      onClick={() => {
                        setStatusFilter("all");
                        setPriorityFilter("all");
                        setCategoryFilter("all");
                        setBuildingFilter("all");
                      }}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>

                <section className="feed-shell">
                  {getFilteredTickets().map((ticket) => (
                    <div
                      className="feed-card"
                      key={ticket.id}
                      onClick={() => navigate(`/m3/issues/${ticket.id}`)}
                    >
                      <div className="feed-meta-top">
                        <span>Posted by</span>
                        <span className="feed-meta-author">{ticket.reporterName}</span>
                        <span className="feed-dot">•</span>
                        <span>{formatDateTime(ticket.createdAt)}</span>
                      </div>

                      <div className="feed-row">
                        <div className="feed-main">
                          <div className="feed-title">{ticket.title}</div>
                        </div>
                        <span className="status-chip">{ticket.status}</span>
                      </div>

                      <div className="feed-desc">
                        {abbreviate(ticket.description, 220)}
                      </div>

                      <div className="feed-bottom">
                        <div className="feed-tags">
                          <span className="meta-pill">{ticket.category}</span>
                          <span className="meta-pill">{ticket.priority}</span>
                          <span className="meta-pill">{ticket.building}</span>
                          <span className="meta-pill">{ticket.locationType}</span>
                        </div>

                        <div className="comment-count">
                          {ticket.comments?.length || 0} comments
                        </div>
                      </div>
                    </div>
                  ))}

                  {getFilteredTickets().length === 0 && (
                    <div className="empty-state">
                      No conversations match the selected filters.
                    </div>
                  )}
                </section>
              </>
            ) : (
             <section className="empty-state">
                {searchTerm
                  ? `No conversations found for "${searchTerm}".`
                  : "No conversations available yet."}
              </section>
            )}
          </main>

          <aside className="side-panel">
            <section className="premium-actions">
              <h3>Quick Actions</h3>
              <p>Move through your support space quickly with these shortcuts.</p>

              <div className="action-links">
                <div className="action-link" onClick={() => navigate("/m3")}>
                  <div>
                    <div className="action-link-title">Return to Help Centre</div>
                    <div className="action-link-sub">Go back to the support home</div>
                  </div>
                  <div className="action-arrow">→</div>
                </div>

                <div className="action-link" onClick={() => navigate("/m3/report")}>
                  <div>
                    <div className="action-link-title">Report an Issue</div>
                    <div className="action-link-sub">Create a new support ticket</div>
                  </div>
                  <div className="action-arrow">→</div>
                </div>

                <div className="action-link" onClick={() => navigate("/m3/my-reports")}>
                  <div>
                    <div className="action-link-title">View My Reports</div>
                    <div className="action-link-sub">See tickets you created</div>
                  </div>
                  <div className="action-arrow">→</div>
                </div>
              </div>
            </section>

            <section className="side-card">
              <h3>About this page</h3>
              <p>
                Browse recent public issue discussions and open any ticket to read or join the conversation.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}