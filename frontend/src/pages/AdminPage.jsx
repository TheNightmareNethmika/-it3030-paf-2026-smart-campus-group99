import { useEffect, useMemo, useState } from "react";
import {
  addAdminComment,
  assignIssueTechnician,
  deleteResolvedIssue,
  getAdminIssues,
  getAdminSummary,
  getTechnicians,
  updateAdminIssueStatus,
} from "../api/adminApi";

export default function AdminPage() {
  const [issues, setIssues] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [summary, setSummary] = useState({});
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("OPEN");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [adminNote, setAdminNote] = useState("");

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [issuesRes, techRes, summaryRes] = await Promise.all([
        getAdminIssues(),
        getTechnicians(),
        getAdminSummary(),
      ]);

      const nonClosed = (issuesRes.data || []).filter((issue) => issue.status !== "CLOSED");
      setIssues(nonClosed);
      setTechnicians(techRes.data || []);
      setSummary(summaryRes.data || {});

      if (nonClosed.length > 0) {
        const firstVisible =
          nonClosed.find((i) => i.status === statusFilter) || nonClosed[0];
        setSelectedIssueId((prev) => prev ?? firstVisible.id);
      } else {
        setSelectedIssueId(null);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  const technicianEmails = useMemo(
    () => new Set(technicians.map((t) => t.email)),
    [technicians]
  );

  const formatDateTime = (value) => {
    if (!value) return "—";
    const normalized = value.replace("T", " ").split(".")[0];
    const date = new Date(normalized);
    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesStatus = issue.status === statusFilter;

      const searchBlob = [
        issue.title,
        issue.description,
        issue.category,
        issue.building,
        issue.locationType,
        issue.reporterName,
        issue.assignedTechnicianName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchBlob.includes(search.toLowerCase().trim());

      return matchesStatus && matchesSearch;
    });
  }, [issues, statusFilter, search]);

  useEffect(() => {
    if (!filteredIssues.some((issue) => issue.id === selectedIssueId)) {
      setSelectedIssueId(filteredIssues[0]?.id ?? null);
    }
  }, [filteredIssues, selectedIssueId]);

  const selectedIssue = useMemo(
    () => issues.find((issue) => issue.id === selectedIssueId) || null,
    [issues, selectedIssueId]
  );

  const issueImages = selectedIssue?.imageUrls || [];

  const latestTechnicianAlert = (issue) => {
    const updates = (issue.comments || []).filter((comment) =>
      technicianEmails.has(comment.authorEmail)
    );
    return updates.length ? updates[updates.length - 1] : null;
  };

  const discussionComments = useMemo(() => {
    if (!selectedIssue?.comments) return [];
    return [...selectedIssue.comments].sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt.replace("T", " ").split(".")[0]).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt.replace("T", " ").split(".")[0]).getTime() : 0;
      return aTime - bTime;
    });
  }, [selectedIssue]);

  const handleStatusChange = async (issueId, status) => {
    try {
      await updateAdminIssueStatus(issueId, status);
      await loadAdminData();
      setStatusFilter(status);
      setSelectedIssueId(null);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.text || err?.response?.data?.message || "Failed to update issue status.");
    }
  };

  const handleAssignTechnician = async (issueId, technicianId) => {
    try {
      await assignIssueTechnician(issueId, technicianId);
      await loadAdminData();
      setSelectedIssueId(issueId);
    } catch (err) {
      console.error(err);
      alert("Failed to assign technician.");
    }
  };

  const handleAdminComment = async () => {
    const trimmed = adminNote.trim();
    if (!trimmed || !selectedIssue) return;

    try {
      await addAdminComment(selectedIssue.id, trimmed);
      setAdminNote("");
      await loadAdminData();
      setSelectedIssueId(selectedIssue.id);
    } catch (err) {
      console.error(err);
      alert("Failed to send admin note.");
    }
  };

  const handleDeleteResolved = async () => {
    if (!selectedIssue) return;
    const confirmed = window.confirm("Delete this resolved issue from admin workflow?");
    if (!confirmed) return;

    try {
      await deleteResolvedIssue(selectedIssue.id);
      await loadAdminData();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to delete resolved issue.");
    }
  };

  const sectionTitle =
    statusFilter === "OPEN"
      ? "Incoming Issues"
      : statusFilter === "IN PROGRESS"
      ? "In Progress Queue"
      : "Resolved Queue";

  return (
    <>
      <style>{`
        * { box-sizing: border-box; font-family: Arial, sans-serif; }
        body { background: #f5f7fb; color: #111827; }

        .admin-shell {
          max-width: 1480px;
          margin: 0 auto;
          padding: 24px 22px 50px;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 22px;
        }

        .summary-card {
          background: linear-gradient(145deg, #ffffff 0%, #f8fbff 100%);
          border: 1px solid #e5edf8;
          border-radius: 22px;
          padding: 18px;
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.05);
        }

        .summary-label {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #64748b;
          margin-bottom: 8px;
        }

        .summary-value {
          font-size: 30px;
          font-weight: 800;
          color: #0f172a;
        }

        .toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          margin-bottom: 18px;
        }

        .toolbar-search {
          flex: 1;
          min-width: 280px;
          border: 1px solid #d7deea;
          border-radius: 999px;
          padding: 14px 18px;
          font-size: 15px;
          outline: none;
          background: #ffffff;
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.04);
        }

        .status-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .status-tab {
          border: 1px solid #d7deea;
          border-radius: 999px;
          padding: 12px 18px;
          font-size: 13px;
          font-weight: 800;
          background: #ffffff;
          color: #334155;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .status-tab.active {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
          box-shadow: 0 10px 24px rgba(37, 99, 235, 0.22);
        }

        .admin-layout {
          display: grid;
          grid-template-columns: 430px minmax(0, 1fr);
          gap: 22px;
          align-items: start;
        }

        .panel-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 26px;
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.05);
        }

        .issues-panel {
          overflow: hidden;
        }

        .panel-header {
          padding: 22px 22px 14px;
          border-bottom: 1px solid #edf2f7;
        }

        .panel-title {
          font-size: 32px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .issues-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 16px;
          max-height: 840px;
          overflow: auto;
        }

        .issue-card {
          border: 1px solid #e6ebf2;
          border-radius: 22px;
          background: linear-gradient(145deg, #ffffff 0%, #fbfdff 100%);
          padding: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .issue-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.06);
          border-color: #ccd8ea;
        }

        .issue-card.active {
          border-color: #2563eb;
          box-shadow: 0 14px 30px rgba(37, 99, 235, 0.12);
        }

        .issue-card-top {
          display: grid;
          grid-template-columns: 80px minmax(0, 1fr) auto;
          gap: 14px;
          align-items: start;
          margin-bottom: 12px;
        }

        .issue-thumb {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          overflow: hidden;
          background: #eef2f7;
          border: 1px solid #e5e7eb;
          flex-shrink: 0;
        }

        .issue-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .issue-title {
          font-size: 18px;
          font-weight: 900;
          line-height: 1.35;
          color: #111827;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-word;
          margin-bottom: 8px;
        }

        .issue-meta {
          font-size: 13px;
          color: #64748b;
          line-height: 1.7;
        }

        .status-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: #eaf2ff;
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
        }

        .issue-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }

        .meta-pill {
          display: inline-flex;
          align-items: center;
          padding: 7px 11px;
          border-radius: 999px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          color: #475467;
          font-size: 12px;
          font-weight: 800;
        }

        .tech-alert {
          margin-top: 12px;
          background: #fff7ed;
          border: 1px solid #fed7aa;
          color: #9a3412;
          border-radius: 14px;
          padding: 12px 12px;
          font-size: 13px;
          line-height: 1.6;
        }

        .tech-alert strong {
          color: #7c2d12;
        }

        .detail-card {
          padding: 24px;
        }

        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
          margin-bottom: 18px;
        }

        .detail-title {
          font-size: 34px;
          line-height: 1.15;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 10px;
          word-break: break-word;
        }

        .detail-meta {
          font-size: 14px;
          line-height: 1.8;
          color: #64748b;
        }

        .detail-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 22px;
        }

        .detail-gallery img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 18px;
          border: 1px solid #e5e7eb;
          background: #eef2f7;
        }

        .section {
          margin-top: 26px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 900;
          color: #111827;
          margin-bottom: 14px;
        }

        .description {
          font-size: 16px;
          line-height: 1.85;
          color: #1f2937;
          white-space: pre-line;
        }

        .status-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .status-action-btn {
          border: 1px solid #d7deea;
          border-radius: 999px;
          padding: 11px 16px;
          font-size: 13px;
          font-weight: 800;
          background: #ffffff;
          color: #334155;
          cursor: pointer;
        }

        .status-action-btn.active {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
          box-shadow: 0 10px 22px rgba(37, 99, 235, 0.18);
        }

        .status-action-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .two-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .info-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          padding: 16px;
        }

        .info-label {
          font-size: 12px;
          font-weight: 800;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }

        .info-value {
          font-size: 16px;
          color: #111827;
          line-height: 1.7;
          word-break: break-word;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .tech-card {
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 18px;
          background: #ffffff;
        }

        .tech-name {
          font-size: 18px;
          font-weight: 900;
          color: #111827;
          margin-bottom: 6px;
        }

        .tech-team {
          font-size: 13px;
          font-weight: 800;
          color: #2563eb;
          margin-bottom: 8px;
        }

        .tech-spec, .tech-phone, .tech-email {
          font-size: 14px;
          line-height: 1.7;
          color: #667085;
          margin-bottom: 4px;
          word-break: break-word;
        }

        .assign-btn {
          border: none;
          border-radius: 999px;
          padding: 11px 15px;
          font-size: 13px;
          font-weight: 900;
          background: #0f172a;
          color: #ffffff;
          cursor: pointer;
          margin-top: 10px;
        }

        .assign-btn:hover {
          opacity: 0.95;
        }

        .conversation-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .conversation-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          padding: 16px;
        }

        .conversation-top {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .conversation-author {
          font-weight: 900;
          color: #111827;
        }

        .conversation-text {
          font-size: 15px;
          line-height: 1.8;
          color: #1f2937;
          white-space: pre-line;
        }

        .admin-note-box {
          border: 1px solid #d7deea;
          border-radius: 20px;
          background: #ffffff;
          overflow: hidden;
        }

        .admin-note-box textarea {
          width: 100%;
          min-height: 110px;
          border: none;
          outline: none;
          resize: vertical;
          padding: 16px;
          font-size: 15px;
          line-height: 1.7;
        }

        .admin-note-actions {
          display: flex;
          justify-content: flex-end;
          padding: 14px 16px 16px;
          border-top: 1px solid #edf2f7;
          background: #fafcff;
        }

        .admin-note-btn {
          border: none;
          border-radius: 999px;
          padding: 11px 16px;
          font-size: 13px;
          font-weight: 900;
          background: #2563eb;
          color: #ffffff;
          cursor: pointer;
        }

        .danger-btn {
          border: none;
          border-radius: 999px;
          padding: 11px 16px;
          font-size: 13px;
          font-weight: 900;
          background: #fee2e2;
          color: #b91c1c;
          cursor: pointer;
        }

        .empty-note {
          color: #64748b;
          font-size: 15px;
          line-height: 1.8;
        }

        @media (max-width: 1250px) {
          .summary-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .admin-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .summary-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .two-grid,
          .tech-grid,
          .detail-gallery {
            grid-template-columns: 1fr;
          }

          .issue-card-top {
            grid-template-columns: 1fr;
          }

          .detail-header {
            flex-direction: column;
          }

          .panel-title,
          .detail-title {
            font-size: 28px;
          }
        }
      `}</style>

      <div className="admin-shell">
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-label">Total Active</div>
            <div className="summary-value">{summary.total || 0}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Open</div>
            <div className="summary-value">{summary.open || 0}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">In Progress</div>
            <div className="summary-value">{summary.inProgress || 0}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Resolved</div>
            <div className="summary-value">{summary.resolved || 0}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Unassigned</div>
            <div className="summary-value">{summary.unassigned || 0}</div>
          </div>
        </div>

        <div className="toolbar">
          <input
            className="toolbar-search"
            placeholder="Search issues, reporter, building, category, or assigned technician"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="status-tabs">
            {["OPEN", "IN PROGRESS", "RESOLVED"].map((status) => (
              <button
                key={status}
                className={`status-tab ${statusFilter === status ? "active" : ""}`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="admin-layout">
          <div className="panel-card issues-panel">
            <div className="panel-header">
              <div className="panel-title">{sectionTitle}</div>
            </div>

            <div className="issues-list">
              {loading ? (
                <div className="empty-note">Loading issues...</div>
              ) : filteredIssues.length === 0 ? (
                <div className="empty-note">No issues in this section.</div>
              ) : (
                filteredIssues.map((issue) => {
                  const alert = latestTechnicianAlert(issue);
                  return (
                    <div
                      key={issue.id}
                      className={`issue-card ${selectedIssueId === issue.id ? "active" : ""}`}
                      onClick={() => setSelectedIssueId(issue.id)}
                    >
                      <div className="issue-card-top">
                        <div className="issue-thumb">
                          {issue.imageUrls && issue.imageUrls.length > 0 ? (
                            <img src={`http://localhost:8080${issue.imageUrls[0]}`} alt="Issue" />
                          ) : null}
                        </div>

                        <div>
                          <div className="issue-title">{issue.title}</div>
                          <div className="issue-meta">
                            Reported by <strong>{issue.reporterName}</strong><br />
                            {formatDateTime(issue.createdAt)}<br />
                            {issue.assignedTechnicianName
                              ? `Assigned to ${issue.assignedTechnicianName}`
                              : "Not assigned yet"}
                          </div>
                        </div>

                        <div className="status-chip">{issue.status}</div>
                      </div>

                      <div className="issue-tags">
                        <span className="meta-pill">{issue.category}</span>
                        <span className="meta-pill">{issue.priority}</span>
                        <span className="meta-pill">{issue.building}</span>
                      </div>

                      {statusFilter === "IN PROGRESS" && alert && (
                        <div className="tech-alert">
                          <strong>Technician alert:</strong> {alert.text}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="panel-card detail-card">
            {selectedIssue ? (
              <>
                <div className="detail-header">
                  <div>
                    <div className="detail-title">{selectedIssue.title}</div>
                    <div className="detail-meta">
                      Reported by <strong>{selectedIssue.reporterName}</strong> • {formatDateTime(selectedIssue.createdAt)}
                      <br />
                      {selectedIssue.assignedTechnicianName
                        ? `Assigned to ${selectedIssue.assignedTechnicianName} (${selectedIssue.assignedTeam})`
                        : "No technician assigned yet"}
                    </div>
                  </div>

                  <div className="status-chip">{selectedIssue.status}</div>
                </div>

                {issueImages.length > 0 && (
                  <div className="detail-gallery">
                    {issueImages.map((img, index) => (
                      <img key={`${img}-${index}`} src={`http://localhost:8080${img}`} alt="Issue" />
                    ))}
                  </div>
                )}

                <div className="section">
                  <div className="section-title">Issue Description</div>
                  <div className="description">{selectedIssue.description}</div>
                </div>

                <div className="section">
                  <div className="section-title">Status Control</div>
                  <div className="status-actions">
                    <button
                      className={`status-action-btn ${selectedIssue.status === "IN PROGRESS" ? "active" : ""}`}
                      disabled={!selectedIssue.assignedTechnicianEmail}
                      onClick={() => handleStatusChange(selectedIssue.id, "IN PROGRESS")}
                    >
                      Set IN PROGRESS
                    </button>
                    <button
                      className={`status-action-btn ${selectedIssue.status === "RESOLVED" ? "active" : ""}`}
                      onClick={() => handleStatusChange(selectedIssue.id, "RESOLVED")}
                    >
                      Set RESOLVED
                    </button>

                    {selectedIssue.status === "RESOLVED" && (
                      <button className="danger-btn" onClick={handleDeleteResolved}>
                        Delete Resolved Issue
                      </button>
                    )}
                  </div>

                  {!selectedIssue.assignedTechnicianEmail && (
                    <div className="empty-note" style={{ marginTop: "10px" }}>
                      Assign a technician first before moving this issue to IN PROGRESS.
                    </div>
                  )}
                </div>

                <div className="section">
                  <div className="section-title">Issue Summary</div>
                  <div className="two-grid">
                    <div className="info-card">
                      <div className="info-label">Category</div>
                      <div className="info-value">{selectedIssue.category}</div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Priority</div>
                      <div className="info-value">{selectedIssue.priority}</div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Location Type</div>
                      <div className="info-value">{selectedIssue.locationType}</div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Building</div>
                      <div className="info-value">{selectedIssue.building}</div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Exact Location</div>
                      <div className="info-value">{selectedIssue.roomNumber || "—"}</div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Observed Date</div>
                      <div className="info-value">{selectedIssue.incidentDate || "—"}</div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Reporter Email</div>
                      <div className="info-value">{selectedIssue.reporterEmail}</div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Assigned At</div>
                      <div className="info-value">{formatDateTime(selectedIssue.assignedAt)}</div>
                    </div>
                  </div>
                </div>

                <div className="section">
                  <div className="section-title">Assign Technician</div>
                  <div className="tech-grid">
                    {technicians.map((tech) => (
                      <div className="tech-card" key={tech.id}>
                        <div className="tech-name">{tech.name}</div>
                        <div className="tech-team">{tech.team}</div>
                        <div className="tech-spec">{tech.specialization}</div>
                        <div className="tech-email">{tech.email}</div>
                        <div className="tech-phone">{tech.phone}</div>
                        <div className="tech-phone">Status: {tech.status}</div>

                        <button
                          className="assign-btn"
                          onClick={() => handleAssignTechnician(selectedIssue.id, tech.id)}
                        >
                          Assign Technician
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="section">
                  <div className="section-title">Admin Communication</div>
                  <div className="admin-note-box">
                    <textarea
                      placeholder="Write an admin message or instruction. This will appear in the issue discussion and users can see it too."
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                    />
                    <div className="admin-note-actions">
                      <button className="admin-note-btn" onClick={handleAdminComment}>
                        Send Admin Message
                      </button>
                    </div>
                  </div>
                </div>

                <div className="section">
                  <div className="section-title">Issue Discussion</div>
                  {discussionComments.length === 0 ? (
                    <div className="empty-note">No discussion yet.</div>
                  ) : (
                    <div className="conversation-list">
                      {discussionComments.map((comment) => (
                        <div className="conversation-card" key={comment.id}>
                          <div className="conversation-top">
                            <span className="conversation-author">{comment.authorName}</span> • {formatDateTime(comment.createdAt)}
                          </div>
                          <div className="conversation-text">{comment.text}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="empty-note">Select an issue from the left to manage it.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}