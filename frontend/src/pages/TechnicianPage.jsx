import { useEffect, useMemo, useState, useRef } from "react";
import {
  addTechnicianComment,
  deleteTechnicianComment,
  getTechnicianIssues,
  getTechnicianSummary,
  updateTechnicianComment,
  updateTechnicianIssueStatus,
} from "../api/technicianApi";

const loadReadCommentIds = (key) => {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(window.localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

const saveReadCommentIds = (key, ids) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(ids));
};

function issueMatchesStatus(issue, status) {
  return issue.technicianStatus === status;
}

function getDisplayStatus(issue) {
  return issue.technicianStatus || "ASSIGNED";
}

export default function TechnicianPage() {
  const [issues, setIssues] = useState([]);
  const [summary, setSummary] = useState({});
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ASSIGNED");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [technicianNote, setTechnicianNote] = useState("");
  const [replyToComment, setReplyToComment] = useState(null);
  const [technicianMessageVisibility, setTechnicianMessageVisibility] = useState("PUBLIC");
  const [adminAlertTab, setAdminAlertTab] = useState("PUBLIC");
  const [readPrivateAdminAlertIds, setReadPrivateAdminAlertIds] = useState(() =>
    loadReadCommentIds("helpdesk-technician-read-private-admin-alerts")
  );
  const [previewImage, setPreviewImage] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [pendingScrollCommentId, setPendingScrollCommentId] = useState(null);
  const discussionNodeRefs = useRef({});

  useEffect(() => {
    loadTechnicianData();
  }, []);

  const loadTechnicianData = async () => {
    try {
      setLoading(true);
      const [issuesRes, summaryRes] = await Promise.all([
        getTechnicianIssues(),
        getTechnicianSummary(),
      ]);

      setIssues(issuesRes.data || []);
      setSummary(summaryRes.data || {});

      if (issuesRes.data && issuesRes.data.length > 0) {
        const firstVisible =
          issuesRes.data.find((i) => issueMatchesStatus(i, statusFilter)) || issuesRes.data[0];
        setSelectedIssueId(firstVisible.id);
      } else {
        setSelectedIssueId(null);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load technician data.");
    } finally {
      setLoading(false);
    }
  };

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
      const matchesStatus = issueMatchesStatus(issue, statusFilter);

      const searchBlob = [
        issue.title,
        issue.description,
        issue.category,
        issue.building,
        issue.locationType,
        issue.reporterName,
        issue.assignedTechnicianName,
        issue.assignedTeam,
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

  useEffect(() => {
    if (pendingScrollCommentId && discussionNodeRefs.current[pendingScrollCommentId]) {
      discussionNodeRefs.current[pendingScrollCommentId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setPendingScrollCommentId(null);
    }
  }, [pendingScrollCommentId]);

  const selectedIssue = useMemo(
    () => issues.find((issue) => issue.id === selectedIssueId) || null,
    [issues, selectedIssueId]
  );

  const issueImages = selectedIssue?.imageUrls || [];

  const getCommentVisibility = (comment) =>
    comment?.visibility === "PRIVATE" ? "PRIVATE" : "PUBLIC";

  const adminAlerts = useMemo(() => {
    if (!selectedIssue?.comments) return [];

    return [...selectedIssue.comments]
      .filter((comment) => comment.authorEmail === "admin@helpdesk.edu")
      .sort((a, b) => {
        const aTime = a.createdAt
          ? new Date(a.createdAt.replace("T", " ").split(".")[0]).getTime()
          : 0;
        const bTime = b.createdAt
          ? new Date(b.createdAt.replace("T", " ").split(".")[0]).getTime()
          : 0;
        return bTime - aTime;
      });
  }, [selectedIssue]);

  const publicAdminAlerts = useMemo(
    () => adminAlerts.filter((comment) => getCommentVisibility(comment) === "PUBLIC"),
    [adminAlerts]
  );

  const privateAdminAlerts = useMemo(
    () => adminAlerts.filter((comment) => getCommentVisibility(comment) === "PRIVATE"),
    [adminAlerts]
  );

  const unreadPrivateAdminAlerts = useMemo(
    () =>
      privateAdminAlerts.filter(
        (comment) => !readPrivateAdminAlertIds.includes(comment.id)
      ),
    [privateAdminAlerts, readPrivateAdminAlertIds]
  );

  const visibleAdminAlerts =
    adminAlertTab === "PRIVATE" ? privateAdminAlerts : publicAdminAlerts;

  useEffect(() => {
    if (adminAlertTab !== "PRIVATE" || privateAdminAlerts.length === 0) {
      return;
    }

    setReadPrivateAdminAlertIds((prev) => {
      const merged = Array.from(
        new Set([...prev, ...privateAdminAlerts.map((comment) => comment.id)])
      );

      if (merged.length === prev.length) return prev;
      saveReadCommentIds("helpdesk-technician-read-private-admin-alerts", merged);
      return merged;
    });
  }, [adminAlertTab, privateAdminAlerts]);

  const getAdminAlerts = (issue) => {
    return [...(issue.comments || [])]
      .filter((comment) => comment.authorEmail === "admin@helpdesk.edu")
      .sort((a, b) => {
        const aTime = a.createdAt
          ? new Date(a.createdAt.replace("T", " ").split(".")[0]).getTime()
          : 0;
        const bTime = b.createdAt
          ? new Date(b.createdAt.replace("T", " ").split(".")[0]).getTime()
          : 0;
        return bTime - aTime;
      });
  };

  const discussionComments = useMemo(() => {
    if (!selectedIssue?.comments) return [];
    return [...selectedIssue.comments].sort((a, b) => {
      const aTime = a.createdAt
        ? new Date(a.createdAt.replace("T", " ").split(".")[0]).getTime()
        : 0;
      const bTime = b.createdAt
        ? new Date(b.createdAt.replace("T", " ").split(".")[0]).getTime()
        : 0;
      return bTime - aTime;
    });
  }, [selectedIssue]);

  const getParentComment = (comment) => {
    if (!comment?.parentCommentId || !selectedIssue?.comments) return null;
    return selectedIssue.comments.find((c) => c.id === comment.parentCommentId) || null;
  };

  const handleStatusChange = async (issueId, status) => {
    try {
      await updateTechnicianIssueStatus(issueId, status);
      await loadTechnicianData();
      setStatusFilter(status);
      setSelectedIssueId(null);
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.text ||
          err?.response?.data?.message ||
          "Failed to update issue status."
      );
    }
  };

  const handleTechnicianComment = async () => {
    const trimmed = technicianNote.trim();
    if (!trimmed || !selectedIssue) return;

    const parentCommentId = replyToComment ? replyToComment.id : null;

    try {
      const response = await addTechnicianComment(
        selectedIssue.id,
        trimmed,
        parentCommentId,
        replyToComment ? getCommentVisibility(replyToComment) : technicianMessageVisibility
      );

      const updatedIssue = response.data;

      setIssues((prev) =>
        prev.map((issue) => (issue.id === updatedIssue.id ? updatedIssue : issue))
      );

      setSelectedIssueId(updatedIssue.id);
      setTechnicianNote("");
      setReplyToComment(null);
      setTechnicianMessageVisibility("PUBLIC");

      const newestMatchingComment = [...(updatedIssue.comments || [])]
        .filter(
          (comment) =>
            comment.authorEmail === updatedIssue.assignedTechnicianEmail &&
            (comment.parentCommentId || null) === parentCommentId
        )
        .sort((a, b) => (b.id || 0) - (a.id || 0))[0];

      if (newestMatchingComment) {
        setPendingScrollCommentId(newestMatchingComment.id);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send technician note.");
    }
  };

  const handleReplyToComment = (comment) => {
    setReplyToComment(comment);
    setTechnicianMessageVisibility(getCommentVisibility(comment));
    setTechnicianNote("");

    setTimeout(() => {
      const textarea = document.querySelector(".technician-note-box textarea");
      if (textarea) {
        textarea.scrollIntoView({ behavior: "smooth", block: "center" });
        textarea.focus();
      }
    }, 120);
  };

  const handleStartEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.text || "");
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditingCommentText("");
  };

  const handleSaveEditComment = async (commentId) => {
    const trimmed = editingCommentText.trim();
    if (!trimmed || !selectedIssue) return;

    try {
      await updateTechnicianComment(selectedIssue.id, commentId, trimmed);
      setEditingCommentId(null);
      setEditingCommentText("");
      await loadTechnicianData();
      setSelectedIssueId(selectedIssue.id);
    } catch (err) {
      console.error(err);
      alert("Failed to update technician comment.");
    }
  };

  const handleDeleteTechnicianComment = async (commentId) => {
    if (!selectedIssue) return;
    const confirmed = window.confirm("Delete this technician comment?");
    if (!confirmed) return;

    try {
      await deleteTechnicianComment(selectedIssue.id, commentId);
      await loadTechnicianData();
      setSelectedIssueId(selectedIssue.id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete technician comment.");
    }
  };

  const buildDiscussionTree = (comments = []) => {
    const sorted = [...comments].sort((a, b) => {
      const aTime = a.createdAt
        ? new Date(a.createdAt.replace("T", " ").split(".")[0]).getTime()
        : 0;
      const bTime = b.createdAt
        ? new Date(b.createdAt.replace("T", " ").split(".")[0]).getTime()
        : 0;
      return bTime - aTime;
    });

    const map = new Map();
    sorted.forEach((comment) => {
      map.set(comment.id, { ...comment, replies: [] });
    });

    const roots = [];

    sorted.forEach((comment) => {
      if (comment.parentCommentId && map.has(comment.parentCommentId)) {
        map.get(comment.parentCommentId).replies.push(map.get(comment.id));
      } else {
        roots.push(map.get(comment.id));
      }
    });

    return roots;
  };

  const renderDiscussionNode = (comment, level = 0) => {
    const isOwnTechnicianComment =
      selectedIssue?.assignedTechnicianEmail &&
      comment.authorEmail === selectedIssue.assignedTechnicianEmail;

    return (
      <div
        key={comment.id}
        ref={(el) => {
          if (el) discussionNodeRefs.current[comment.id] = el;
        }}
        style={{
          marginLeft: level > 0 ? `${Math.min(level * 28, 84)}px` : "0px",
          borderLeft: level > 0 ? "3px solid #e5e7eb" : "none",
          paddingLeft: level > 0 ? "14px" : "0px",
          marginTop: level > 0 ? "14px" : "0px",
        }}
      >
        <div className="conversation-card">
          <div className="conversation-top">
            <span className="conversation-author">{comment.authorName}</span> •{" "}
            {formatDateTime(comment.createdAt)}
          </div>
          <div className="conversation-text">{comment.text}</div>
          {getCommentVisibility(comment) === "PRIVATE" && (
            <div style={{ marginTop: "8px" }}>
              <span className="private-chip">PRIVATE</span>
            </div>
          )}

          <div style={{ marginTop: "12px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => handleReplyToComment(comment)}
              style={{
                border: "none",
                background: "transparent",
                color: "#6b7280",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                padding: "4px 6px",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
              onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
            >
              Reply
            </button>

            {isOwnTechnicianComment && (
              <>
                <button
                  type="button"
                  onClick={() => handleStartEditComment(comment)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#6b7280",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                    padding: "4px 6px",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
                  onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteTechnicianComment(comment.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#6b7280",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                    padding: "4px 6px",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#ef4444")}
                  onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
                >
                  Delete
                </button>
              </>
            )}
          </div>

          {editingCommentId === comment.id && (
            <div style={{ marginTop: "10px" }}>
              <textarea
                className="technician-note-box"
                value={editingCommentText}
                onChange={(e) => setEditingCommentText(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: "80px",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #d7deea",
                  fontSize: "14px",
                  marginBottom: "8px"
                }}
              />
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  className="technician-note-btn"
                  onClick={() => handleSaveEditComment(comment.id)}
                >
                  Save
                </button>
                <button
                  className="danger-btn"
                  onClick={handleCancelEditComment}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div>
              {comment.replies.map((reply) => renderDiscussionNode(reply, level + 1))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const sectionTitle =
    statusFilter === "ASSIGNED"
      ? "Assigned Issues"
      : statusFilter === "IN PROGRESS"
      ? "In Progress Work"
      : "Completed Work";

  return (
    <>
      <style>{`
        * { box-sizing: border-box; font-family: Arial, sans-serif; }
        body { background: #f5f7fb; color: #111827; }

        .technician-shell {
          max-width: 1480px;
          margin: 0 auto;
          padding: 24px 22px 50px;
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
          margin-bottom: 6px;
        }

        .page-title {
          font-size: 50px;
          line-height: 1.05;
          font-weight: 800;
          color: #111827;
          margin-bottom: 10px;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          font-size: 18px;
          line-height: 1.75;
          color: #667085;
          max-width: 860px;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
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

        .alert-tabs {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 4px;
          padding: 3px;
          border: 1px solid #edf2f7;
          border-radius: 12px;
          background: #ffffff;
          margin-bottom: 16px;
          width: 100%;
        }

        .alert-tab {
          width: 100%;
          border: none;
          border-radius: 9px;
          padding: 7px 11px;
          background: transparent;
          color: #667085;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .alert-tab.active {
          background: #f1f5f9;
          color: #111827;
        }

        .private-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          margin-left: 6px;
          padding: 0 6px;
          border-radius: 999px;
          background: #fee2e2;
          color: #b91c1c;
          font-size: 11px;
          font-weight: 900;
        }

        .private-chip {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 4px 8px;
          background: #fee2e2;
          color: #b91c1c;
          font-size: 11px;
          font-weight: 900;
          margin-left: 8px;
        }

        .reply-link {
          border: none;
          background: transparent;
          color: #6b7280;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 6px;
        }

        .reply-link:hover {
          color: #2563eb;
        }

        .channel-toggle {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          padding: 12px 16px;
          border-bottom: 1px solid #edf2f7;
          background: #fafcff;
        }

        .channel-btn {
          border: 1px solid #d7deea;
          border-radius: 999px;
          padding: 8px 12px;
          background: #ffffff;
          color: #475467;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
        }

        .channel-btn.active {
          border-color: #2563eb;
          background: #eaf2ff;
          color: #1d4ed8;
        }

        .technician-layout {
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

        .admin-alert {
          margin-top: 12px;
          background: #fef3c7;
          border: 1px solid #f59e0b;
          color: #92400e;
          border-radius: 14px;
          padding: 12px 12px;
          font-size: 13px;
          line-height: 1.6;
        }

        .admin-alert strong {
          color: #78350f;
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
          cursor: zoom-in;
          transition: transform 0.2s ease;
        }

        .detail-gallery img:hover {
          transform: scale(1.02);
        }

        .image-modal {
          display: flex;
          position: fixed;
          z-index: 9999;
          inset: 0;
          background: rgba(15, 23, 42, 0.92);
          align-items: center;
          justify-content: center;
          padding: 30px;
        }

        .image-modal-content {
          max-width: 92vw;
          max-height: 88vh;
          border-radius: 18px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
          object-fit: contain;
          background: #fff;
        }

        .image-modal-close {
          position: absolute;
          top: 18px;
          right: 26px;
          font-size: 42px;
          line-height: 1;
          color: #ffffff;
          cursor: pointer;
          font-weight: 400;
          user-select: none;
          border: none;
          background: transparent;
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

        .technician-note-box {
          border: 1px solid #d7deea;
          border-radius: 20px;
          background: #ffffff;
          overflow: hidden;
        }

        .technician-note-box textarea {
          width: 100%;
          min-height: 110px;
          border: none;
          outline: none;
          resize: vertical;
          padding: 16px;
          font-size: 15px;
          line-height: 1.7;
        }

        .technician-note-actions {
          display: flex;
          justify-content: flex-end;
          padding: 14px 16px 16px;
          border-top: 1px solid #edf2f7;
          background: #fafcff;
        }

        .technician-note-btn {
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

          .technician-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .summary-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .two-grid,
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

          .page-title {
            font-size: 38px;
          }
        }
      `}</style>

      <div className="technician-shell">
        <section className="page-header">
          <div className="page-eyebrow">Technician Portal</div>
          <h1 className="page-title">Technician Assignments</h1>
          <p className="page-subtitle">
            Manage and resolve issues assigned by the administration team.
          </p>
        </section>

        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-label">Assigned</div>
            <div className="summary-value">{summary.assigned || 0}</div>
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
            <div className="summary-label">Total Workload</div>
            <div className="summary-value">{summary.total || 0}</div>
          </div>
        </div>

        <div className="toolbar">
          <input
            className="toolbar-search"
            placeholder="Search assigned issues, reporter, building, category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="status-tabs">
            {["ASSIGNED", "IN PROGRESS", "RESOLVED"].map((status) => (
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

        <div className="technician-layout">
          <div className="panel-card issues-panel">
            <div className="panel-header">
              <div className="panel-title">{sectionTitle}</div>
            </div>

            <div className="issues-list">
              {loading ? (
                <div className="empty-note">Loading your assignments...</div>
              ) : filteredIssues.length === 0 ? (
                <div className="empty-note">No issues in this section.</div>
              ) : (
                filteredIssues.map((issue) => {
                  const latestAdminAlert = getAdminAlerts(issue)[0];

                  return (
                    <div
                      key={issue.id}
                      className={`issue-card ${selectedIssueId === issue.id ? "active" : ""}`}
                      onClick={() => setSelectedIssueId(issue.id)}
                    >
                      <div className="issue-card-top">
                        <div className="issue-thumb">
                          {issue.imageUrls && issue.imageUrls.length > 0 ? (
                            <img
                              src={`http://localhost:8080${issue.imageUrls[0]}`}
                              alt="Issue"
                            />
                          ) : null}
                        </div>

                        <div>
                          <div className="issue-title">{issue.title}</div>
                          <div className="issue-meta">
                            Reported by <strong>{issue.reporterName}</strong>
                            <br />
                            {formatDateTime(issue.createdAt)}
                            <br />
                            Priority: {issue.priority}
                            <br />
                            Assigned to <strong>{issue.assignedTechnicianName}</strong>
                          </div>
                        </div>

                        <div className="status-chip">{getDisplayStatus(issue)}</div>
                      </div>

                      <div className="issue-tags">
                        <span className="meta-pill">{issue.category}</span>
                        <span className="meta-pill">{issue.priority}</span>
                        <span className="meta-pill">{issue.building}</span>
                        <span className="meta-pill">{issue.assignedTeam}</span>
                      </div>

                      {statusFilter === "ASSIGNED" && latestAdminAlert && (
                        <div className="admin-alert">
                          <strong>Admin alert:</strong>
                          {getCommentVisibility(latestAdminAlert) === "PRIVATE" && (
                            <span className="private-chip">PRIVATE</span>
                          )}{" "}
                          {latestAdminAlert.text}
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
                      Reported by <strong>{selectedIssue.reporterName}</strong> |{" "}
                      {formatDateTime(selectedIssue.createdAt)}
                      <br />
                      Priority: {selectedIssue.priority} | Building: {selectedIssue.building}
                      <br />
                      Assigned to <strong>{selectedIssue.assignedTechnicianName}</strong>
                      {selectedIssue.assignedTeam ? ` (${selectedIssue.assignedTeam})` : ""}
                    </div>
                  </div>

                  <div className="status-chip">{getDisplayStatus(selectedIssue)}</div>
                </div>

                {issueImages.length > 0 && (
                  <div className="detail-gallery">
                    {issueImages.map((img, index) => (
                      <img
                        key={`${img}-${index}`}
                        src={`http://localhost:8080${img}`}
                        alt="Issue"
                        onClick={() => setPreviewImage(`http://localhost:8080${img}`)}
                      />
                    ))}
                  </div>
                )}

                <div className="section">
                  <div className="section-title">Issue Description</div>
                  <div className="description">{selectedIssue.description}</div>
                </div>

                <div className="section">
                  <div className="section-title">Issue Details</div>
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
                      <div className="info-label">Building</div>
                      <div className="info-value">{selectedIssue.building}</div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Location</div>
                      <div className="info-value">{selectedIssue.locationType}</div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Room Number</div>
                      <div className="info-value">{selectedIssue.roomNumber || "—"}</div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Assigned Date</div>
                      <div className="info-value">
                        {formatDateTime(selectedIssue.assignedAt)}
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Assigned Technician</div>
                      <div className="info-value">
                        {selectedIssue.assignedTechnicianName || "Unassigned"}
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Assigned Team</div>
                      <div className="info-value">
                        {selectedIssue.assignedTeam || "Unassigned"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section">
                  <div className="section-title">Status Control</div>
                  <div className="status-actions">
                    {selectedIssue.technicianStatus === "ASSIGNED" && (
                      <button
                        className="status-action-btn"
                        onClick={() =>
                          handleStatusChange(selectedIssue.id, "IN PROGRESS")
                        }
                      >
                        Start Working
                      </button>
                    )}

                    {selectedIssue.technicianStatus === "IN PROGRESS" && (
                      <button
                        className="status-action-btn"
                        onClick={() =>
                          handleStatusChange(selectedIssue.id, "RESOLVED")
                        }
                      >
                        Mark as Resolved
                      </button>
                    )}

                    {selectedIssue.technicianStatus === "RESOLVED" && (
                      <div className="status-action-btn" style={{ opacity: 0.7 }}>
                        Issue Resolved ✓
                      </div>
                    )}
                  </div>
                </div>

                {["ASSIGNED", "IN PROGRESS"].includes(selectedIssue.technicianStatus) && (
                  <div className="section">
                    <div className="section-title">Admin Alerts</div>
                    <div className="alert-tabs">
                      <button
                        type="button"
                        className={`alert-tab ${adminAlertTab === "PUBLIC" ? "active" : ""}`}
                        onClick={() => setAdminAlertTab("PUBLIC")}
                      >
                        Public
                      </button>
                      <button
                        type="button"
                        className={`alert-tab ${adminAlertTab === "PRIVATE" ? "active" : ""}`}
                        onClick={() => setAdminAlertTab("PRIVATE")}
                      >
                        Private
                        {unreadPrivateAdminAlerts.length > 0 && adminAlertTab !== "PRIVATE" && (
                          <span className="private-badge">{unreadPrivateAdminAlerts.length}</span>
                        )}
                      </button>
                    </div>

                    {visibleAdminAlerts.length === 0 ? (
                      <div className="empty-note">No admin alerts for this issue.</div>
                    ) : (
                      <div className="conversation-list">
                        {visibleAdminAlerts.map((alert) => (
                          <div
                            className="conversation-card"
                            key={alert.id}
                            onClick={() => setPendingScrollCommentId(alert.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="conversation-top">
                              <span className="conversation-author">Admin</span> •{" "}
                              {formatDateTime(alert.createdAt)}
                            </div>
                            <div className="conversation-text">{alert.text}</div>
                            {getCommentVisibility(alert) === "PRIVATE" && (
                              <div style={{ marginTop: "8px" }}>
                                <span className="private-chip">PRIVATE</span>
                              </div>
                            )}
                            <div style={{ marginTop: "12px" }}>
                              <button
                                type="button"
                                className="reply-link"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleReplyToComment(alert);
                                }}
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="section">
                  <div className="section-title">Technician Communication</div>

                  {replyToComment && (
                    <div className="conversation-card" style={{ marginBottom: "12px" }}>
                      <div className="conversation-top">
                        Replying to <span className="conversation-author">{replyToComment.authorName}</span>
                      </div>
                      <div className="conversation-text">{replyToComment.text}</div>
                      <div style={{ marginTop: "10px" }}>
                        <button
                          className="danger-btn"
                          onClick={() => {
                            setReplyToComment(null);
                            setTechnicianNote("");
                            setTechnicianMessageVisibility("PUBLIC");
                          }}
                        >
                          Cancel Reply
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="technician-note-box">
                    <div className="channel-toggle">
                      {["PUBLIC", "PRIVATE"].map((visibility) => (
                        <button
                          key={visibility}
                          type="button"
                          className={`channel-btn ${technicianMessageVisibility === visibility ? "active" : ""}`}
                          disabled={Boolean(replyToComment)}
                          onClick={() => setTechnicianMessageVisibility(visibility)}
                        >
                          {visibility === "PUBLIC" ? "Public" : "Private"}
                        </button>
                      ))}
                    </div>
                    <textarea
                      placeholder={
                        replyToComment
                          ? `Replying to ${replyToComment.authorName}...`
                          : technicianMessageVisibility === "PRIVATE"
                          ? "Send a private technician alert. Only admin and technician can see it."
                          : "Send a public technician alert. This can appear in featured conversations."
                      }
                      value={technicianNote}
                      onChange={(e) => setTechnicianNote(e.target.value)}
                    />
                    <div className="technician-note-actions">
                      <button
                        className="technician-note-btn"
                        onClick={handleTechnicianComment}
                        disabled={!technicianNote.trim()}
                      >
                        {replyToComment ? "Send Reply" : "Send Update"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="section">
                  <div className="section-title">Issue Discussion</div>
                  {discussionComments.length === 0 ? (
                    <div className="empty-note">No discussion yet. Start the conversation!</div>
                  ) : (
                    <div className="conversation-list">
                      {buildDiscussionTree(discussionComments).map((comment) =>
                        renderDiscussionNode(comment)
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="empty-note">Select an issue to view details</div>
            )}
          </div>
        </div>

        {previewImage && (
          <div className="image-modal" onClick={() => setPreviewImage("")}>
            <button className="image-modal-close" onClick={() => setPreviewImage("")}>
              ×
            </button>
            <img
              className="image-modal-content"
              src={previewImage}
              alt="Issue preview"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </>
  );
}
