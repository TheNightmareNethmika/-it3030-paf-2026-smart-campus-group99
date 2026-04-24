import { useEffect, useMemo, useState, useRef } from "react";
import {
  addAdminComment,
  assignIssueTechnician,
  deleteAdminComment,
  deleteResolvedIssue,
  getAdminIssues,
  getAdminSummary,
  getTechnicians,
  unassignIssueTechnician,
  updateAdminComment,
  updateAdminIssueStatus,
} from "../api/adminApi";

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

const loadStoredTab = (key, fallback, allowedValues) => {
  if (typeof window === "undefined") return fallback;

  const savedValue = window.localStorage.getItem(key);
  return allowedValues.includes(savedValue) ? savedValue : fallback;
};

export default function AdminPage() {
  const [issues, setIssues] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [summary, setSummary] = useState({});
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [statusFilter, setStatusFilter] = useState(() =>
    loadStoredTab("helpdesk-admin-status-filter", "OPEN", [
      "OPEN",
      "IN PROGRESS",
      "RESOLVED",
    ])
  );
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [adminNote, setAdminNote] = useState("");
  const [replyToComment, setReplyToComment] = useState(null);
  const [adminMessageVisibility, setAdminMessageVisibility] = useState("PUBLIC");
  const [technicianAlertTab, setTechnicianAlertTab] = useState("PUBLIC");
  const [readPrivateTechnicianAlertIds, setReadPrivateTechnicianAlertIds] = useState(() =>
    loadReadCommentIds("helpdesk-admin-read-private-technician-alerts")
  );
  const [previewImage, setPreviewImage] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [pendingScrollCommentId, setPendingScrollCommentId] = useState(null);
  const [techTeamFilter, setTechTeamFilter] = useState("all");
  const [techSpecFilter, setTechSpecFilter] = useState("all");
  const [techStatusFilter, setTechStatusFilter] = useState("all");
  const discussionNodeRefs = useRef({});

  const getAdminEmptyState = () => {
    if (search.trim()) {
      return {
        eyebrow: "No matches",
        title: "Nothing matched this search",
        description:
          "Try another keyword, building, reporter, or issue category to surface the right ticket.",
        accent: "Refine search",
        support: "Search by title, category, reporter, building, or technician name.",
      };
    }

    if (statusFilter === "OPEN") {
      return {
        eyebrow: "Open queue clear",
        title: "No open issues right now",
        description:
          "Newly reported requests will appear here for triage, assignment, and next-step coordination.",
        accent: "Awaiting new reports",
        support: "Fresh submissions will land here first for review and technician assignment.",
      };
    }

    if (statusFilter === "IN PROGRESS") {
      return {
        eyebrow: "Work moving smoothly",
        title: "No issues are in progress",
        description:
          "When active work begins, this queue will show the tickets currently being handled by technicians.",
        accent: "No active work items",
        support: "Technician updates and latest alerts will appear here while work is underway.",
      };
    }

    return {
      eyebrow: "Resolved queue clear",
      title: "No resolved issues yet",
      description:
        "Completed tickets will collect here so you can review outcomes and remove them from the admin queue when needed.",
      accent: "Nothing completed yet",
      support: "Resolved items stay here for final review before you clear them from the queue.",
    };
  };

  const renderAdminEmptyState = ({
    eyebrow,
    title,
    description,
    accent,
    support,
    compact = false,
  }) => {
    const containerStyle = {
      minHeight: compact ? "180px" : "340px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: compact ? "24px 20px" : "38px 28px",
      border: "1px solid #d8e5f6",
      borderRadius: compact ? "22px" : "28px",
      background:
        "radial-gradient(circle at top, rgba(37, 99, 235, 0.12), transparent 52%), linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%)",
      boxShadow: compact
        ? "inset 0 1px 0 rgba(255, 255, 255, 0.75), 0 10px 24px rgba(15, 23, 42, 0.04)"
        : "inset 0 1px 0 rgba(255, 255, 255, 0.75), 0 18px 38px rgba(15, 23, 42, 0.06)",
    };

    const artStyle = {
      width: compact ? "68px" : "96px",
      height: compact ? "68px" : "96px",
      borderRadius: compact ? "22px" : "30px",
      background:
        "radial-gradient(circle at top, rgba(37, 99, 235, 0.18), transparent 58%), linear-gradient(145deg, #ffffff 0%, #edf4ff 100%)",
      border: "1px solid #d5e3f8",
      boxShadow: compact
        ? "inset 0 1px 0 rgba(255, 255, 255, 0.86), 0 12px 24px rgba(37, 99, 235, 0.08)"
        : "inset 0 1px 0 rgba(255, 255, 255, 0.86), 0 18px 34px rgba(37, 99, 235, 0.12)",
      display: "grid",
      placeItems: "center",
      marginBottom: compact ? "16px" : "22px",
      position: "relative",
    };

    const innerArtStyle = {
      position: "absolute",
      inset: compact ? "8px" : "10px",
      borderRadius: compact ? "16px" : "22px",
      border: "1px solid rgba(143, 179, 232, 0.45)",
    };

    const glyphStyle = {
      width: compact ? "36px" : "44px",
      height: compact ? "36px" : "44px",
      borderRadius: compact ? "14px" : "16px",
      border: "2px solid #7fa7df",
      position: "relative",
      background: "linear-gradient(180deg, #f8fbff 0%, #edf4ff 100%)",
      boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.9)",
    };

    const lineCommon = {
      position: "absolute",
      left: "8px",
      right: "8px",
      height: "2px",
      borderRadius: "999px",
      background: "#7fa7df",
    };

    return (
      <div style={containerStyle}>
        <div style={artStyle}>
          <div style={innerArtStyle} />
          <div style={glyphStyle}>
            <div style={{ ...lineCommon, top: compact ? "11px" : "13px" }} />
            <div
              style={{
                ...lineCommon,
                top: compact ? "19px" : "23px",
                right: compact ? "12px" : "13px",
              }}
            />
          </div>
        </div>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#2563eb",
            marginBottom: "8px",
          }}
        >
          {eyebrow}
        </div>
        {accent ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "32px",
              padding: "0 14px",
              borderRadius: "999px",
              background: "rgba(37, 99, 235, 0.08)",
              border: "1px solid rgba(37, 99, 235, 0.12)",
              color: "#1d4ed8",
              fontSize: "12px",
              fontWeight: 800,
              marginBottom: "12px",
            }}
          >
            {accent}
          </div>
        ) : null}
        <div
          style={{
            fontSize: compact ? "20px" : "26px",
            lineHeight: 1.2,
            fontWeight: 800,
            color: "#0f172a",
            marginBottom: "10px",
            maxWidth: compact ? "360px" : "520px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            maxWidth: compact ? "360px" : "420px",
            color: "#64748b",
            fontSize: compact ? "14px" : "15px",
            lineHeight: compact ? 1.7 : 1.8,
          }}
        >
          {description}
        </div>
        {support ? (
          <div
            style={{
              marginTop: "16px",
              fontSize: "13px",
              lineHeight: 1.7,
              color: "#7b8798",
              maxWidth: "430px",
            }}
          >
            {support}
          </div>
        ) : null}
      </div>
    );
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("helpdesk-admin-status-filter", statusFilter);
  }, [statusFilter]);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [issuesRes, techRes, summaryRes] = await Promise.all([
        getAdminIssues(),
        getTechnicians(),
        getAdminSummary(),
      ]);

      const nonClosed = (issuesRes.data || []).filter(
        (issue) => issue.status !== "CLOSED"
      );

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

  const uniqueTeams = useMemo(() => {
    const teams = new Set(technicians.map((t) => t.team).filter(Boolean));
    return Array.from(teams).sort();
  }, [technicians]);

  const uniqueSpecializations = useMemo(() => {
    const specs = new Set(technicians.map((t) => t.specialization).filter(Boolean));
    return Array.from(specs).sort();
  }, [technicians]);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(technicians.map((t) => t.status).filter(Boolean));
    return Array.from(statuses).sort();
  }, [technicians]);

  const filteredTechnicians = useMemo(() => {
    return technicians.filter((tech) => {
      const teamMatch = techTeamFilter === "all" || tech.team === techTeamFilter;
      const specMatch = techSpecFilter === "all" || tech.specialization === techSpecFilter;
      const statusMatch = techStatusFilter === "all" || tech.status === techStatusFilter;
      return teamMatch && specMatch && statusMatch;
    });
  }, [technicians, techTeamFilter, techSpecFilter, techStatusFilter]);

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

  const latestTechnicianAlert = (issue) => {
    const updates = (issue.comments || [])
      .filter((comment) => technicianEmails.has(comment.authorEmail))
      .sort((a, b) => {
        const aTime = a.createdAt
          ? new Date(a.createdAt.replace("T", " ").split(".")[0]).getTime()
          : 0;
        const bTime = b.createdAt
          ? new Date(b.createdAt.replace("T", " ").split(".")[0]).getTime()
          : 0;
        return bTime - aTime;
      });

    return updates.length ? updates[0] : null;
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

  const technicianAlerts = useMemo(() => {
    if (!selectedIssue?.comments) return [];

    return [...selectedIssue.comments]
      .filter((comment) => technicianEmails.has(comment.authorEmail))
      .sort((a, b) => {
        const aTime = a.createdAt
          ? new Date(a.createdAt.replace("T", " ").split(".")[0]).getTime()
          : 0;
        const bTime = b.createdAt
          ? new Date(b.createdAt.replace("T", " ").split(".")[0]).getTime()
          : 0;
        return bTime - aTime;
      });
  }, [selectedIssue, technicianEmails]);

  const publicTechnicianAlerts = useMemo(
    () => technicianAlerts.filter((comment) => getCommentVisibility(comment) === "PUBLIC"),
    [technicianAlerts]
  );

  const privateTechnicianAlerts = useMemo(
    () => technicianAlerts.filter((comment) => getCommentVisibility(comment) === "PRIVATE"),
    [technicianAlerts]
  );

  const unreadPrivateTechnicianAlerts = useMemo(
    () =>
      privateTechnicianAlerts.filter(
        (comment) => !readPrivateTechnicianAlertIds.includes(comment.id)
      ),
    [privateTechnicianAlerts, readPrivateTechnicianAlertIds]
  );

  const visibleTechnicianAlerts =
    technicianAlertTab === "PRIVATE" ? privateTechnicianAlerts : publicTechnicianAlerts;

  useEffect(() => {
    if (technicianAlertTab !== "PRIVATE" || privateTechnicianAlerts.length === 0) {
      return;
    }

    setReadPrivateTechnicianAlertIds((prev) => {
      const merged = Array.from(
        new Set([...prev, ...privateTechnicianAlerts.map((comment) => comment.id)])
      );

      if (merged.length === prev.length) return prev;
      saveReadCommentIds("helpdesk-admin-read-private-technician-alerts", merged);
      return merged;
    });
  }, [technicianAlertTab, privateTechnicianAlerts]);

  const handleStatusChange = async (issueId, status) => {
    try {
      await updateAdminIssueStatus(issueId, status);
      await loadAdminData();
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

  const handleUnassignTechnician = async (issueId) => {
    try {
      await unassignIssueTechnician(issueId);
      await loadAdminData();
      setSelectedIssueId(issueId);
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          "Failed to cancel technician assignment."
      );
    }
  };

  const handleAdminComment = async () => {
    const trimmed = adminNote.trim();
    if (!trimmed || !selectedIssue) return;

    const parentCommentId = replyToComment ? replyToComment.id : null;

    try {
      const response = await addAdminComment(
        selectedIssue.id,
        trimmed,
        parentCommentId,
        replyToComment ? getCommentVisibility(replyToComment) : adminMessageVisibility
      );

      const updatedIssue = response.data;

      setIssues((prev) =>
        prev.map((issue) => (issue.id === updatedIssue.id ? updatedIssue : issue))
      );

      setSelectedIssueId(updatedIssue.id);
      setAdminNote("");
      setReplyToComment(null);
      setAdminMessageVisibility("PUBLIC");

      const newestMatchingComment = [...(updatedIssue.comments || [])]
        .filter(
          (comment) =>
            comment.authorEmail === "admin@helpdesk.edu" &&
            (comment.parentCommentId || null) === parentCommentId
        )
        .sort((a, b) => (b.id || 0) - (a.id || 0))[0];

      if (newestMatchingComment) {
        setPendingScrollCommentId(newestMatchingComment.id);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send admin note.");
    }
  };

  const handleReplyToComment = (comment) => {
    setReplyToComment(comment);
    setAdminMessageVisibility(getCommentVisibility(comment));
    setAdminNote("");

    setTimeout(() => {
      const textarea = document.querySelector(".admin-note-box textarea");
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
      await updateAdminComment(selectedIssue.id, commentId, trimmed);
      setEditingCommentId(null);
      setEditingCommentText("");
      await loadAdminData();
      setSelectedIssueId(selectedIssue.id);
    } catch (err) {
      console.error(err);
      alert("Failed to update admin comment.");
    }
  };

  const handleDeleteAdminComment = async (commentId) => {
    if (!selectedIssue) return;
    const confirmed = window.confirm("Delete this admin comment?");
    if (!confirmed) return;

    try {
      await deleteAdminComment(selectedIssue.id, commentId);
      await loadAdminData();
      setSelectedIssueId(selectedIssue.id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete admin comment.");
    }
  };

  const handleDeleteResolved = async () => {
    if (!selectedIssue) return;
    const confirmed = window.confirm(
      "Delete this resolved issue from admin workflow?"
    );
    if (!confirmed) return;

    try {
      await deleteResolvedIssue(selectedIssue.id);
      await loadAdminData();
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message || "Failed to delete resolved issue."
      );
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

            {comment.authorEmail === "admin@helpdesk.edu" && (
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
                  onClick={() => handleDeleteAdminComment(comment.id)}
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
                className="admin-note-box"
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
                  className="admin-note-btn"
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
    statusFilter === "OPEN"
      ? "Incoming Issues"
      : statusFilter === "IN PROGRESS"
      ? "In Progress Queue"
      : "Resolved Queue";

  const emptyState = getAdminEmptyState();

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
          margin-bottom: 0.01px;
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

        .tech-filter-container {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          margin-bottom: 18px;
          padding: 16px 20px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
        }

        .tech-filter-label {
          font-size: 13px;
          font-weight: 700;
          color: #667085;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          align-self: center;
        }

        .tech-filter-select {
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
          min-width: 140px;
        }

        .tech-filter-select:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .tech-filter-select:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .clear-tech-filters-btn {
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
          flex-shrink: 0;
          align-self: center;
          margin-left: auto;
        }

        .clear-tech-filters-btn:hover {
          background: rgba(220, 38, 38, 0.08);
          color: #dc2626;
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

        .assign-actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .assign-actions .assign-btn,
        .assign-actions .danger-btn {
          flex: 1;
          margin-top: 0;
        }

        .assign-btn:disabled {
          opacity: 0.8;
          cursor: default;
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

        .empty-state {
          min-height: 340px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 38px 28px;
          border: 1px solid #d8e5f6;
          border-radius: 28px;
          background:
            radial-gradient(circle at top, rgba(37, 99, 235, 0.12), transparent 52%),
            linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.75),
            0 18px 38px rgba(15, 23, 42, 0.06);
        }

        .empty-state-art {
          width: 96px;
          height: 96px;
          border-radius: 30px;
          background:
            radial-gradient(circle at top, rgba(37, 99, 235, 0.18), transparent 58%),
            linear-gradient(145deg, #ffffff 0%, #edf4ff 100%);
          border: 1px solid #d5e3f8;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.86),
            0 18px 34px rgba(37, 99, 235, 0.12);
          display: grid;
          place-items: center;
          margin-bottom: 22px;
          position: relative;
        }

        .empty-state-art::before {
          content: "";
          position: absolute;
          inset: 10px;
          border-radius: 22px;
          border: 1px solid rgba(143, 179, 232, 0.45);
        }

        .empty-state-glyph {
          width: 44px;
          height: 44px;
          border-radius: 16px;
          border: 2px solid #7fa7df;
          position: relative;
          background: linear-gradient(180deg, #f8fbff 0%, #edf4ff 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .empty-state-glyph::before,
        .empty-state-glyph::after {
          content: "";
          position: absolute;
          left: 8px;
          right: 8px;
          height: 2px;
          border-radius: 999px;
          background: #7fa7df;
        }

        .empty-state-glyph::before {
          top: 13px;
        }

        .empty-state-glyph::after {
          top: 23px;
          right: 13px;
        }

        .empty-state-eyebrow {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #2563eb;
          margin-bottom: 8px;
        }

        .empty-state-accent {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 32px;
          padding: 0 14px;
          border-radius: 999px;
          background: rgba(37, 99, 235, 0.08);
          border: 1px solid rgba(37, 99, 235, 0.12);
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .empty-state-title {
          font-size: 26px;
          line-height: 1.2;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 10px;
        }

        .empty-state-text {
          max-width: 420px;
          color: #64748b;
          font-size: 15px;
          line-height: 1.8;
        }

        .empty-state-support {
          margin-top: 16px;
          font-size: 13px;
          line-height: 1.7;
          color: #7b8798;
          max-width: 430px;
        }

        .empty-state.compact {
          min-height: 180px;
          padding: 24px 20px;
          border-radius: 22px;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.75),
            0 10px 24px rgba(15, 23, 42, 0.04);
        }

        .empty-state-art.compact {
          width: 68px;
          height: 68px;
          border-radius: 22px;
          margin-bottom: 16px;
        }

        .empty-state-art.compact::before {
          inset: 8px;
          border-radius: 16px;
        }

        .empty-state-title.compact {
          font-size: 20px;
          margin-bottom: 8px;
        }

        .empty-state-text.compact {
          max-width: 360px;
          font-size: 14px;
          line-height: 1.7;
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

          .page-title {
            font-size: 38px;
          }

          .tech-filter-container {
            flex-direction: column;
            align-items: stretch;
          }

          .tech-filter-label {
            align-self: flex-start;
          }

          .tech-filter-select {
            width: 100%;
            min-width: unset;
          }

          .clear-tech-filters-btn {
            margin-left: 0;
            width: 100%;
          }
        }
      `}</style>

      <div className="admin-shell">
        <section className="page-header">
          <div className="page-eyebrow">Administration</div>
          <h1 className="page-title">Ticket Management</h1>
          <p className="page-subtitle">
            Monitor and manage all support tickets across the helpdesk system.
          </p>
        </section>

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
                renderAdminEmptyState({
                  eyebrow: "Loading queue",
                  title: "Getting tickets ready",
                  description: "Current issues are being loaded for this section.",
                  compact: true,
                })
              ) : filteredIssues.length === 0 ? (
                renderAdminEmptyState(emptyState)
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
                          <strong>Technician alert:</strong>
                          {getCommentVisibility(alert) === "PRIVATE" && (
                            <span className="private-chip">PRIVATE</span>
                          )}{" "}
                          {alert.text}
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
                      Reported by <strong>{selectedIssue.reporterName}</strong> •{" "}
                      {formatDateTime(selectedIssue.createdAt)}
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
                      <div className="info-value">
                        {selectedIssue.roomNumber || "—"}
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Observed Date</div>
                      <div className="info-value">
                        {selectedIssue.incidentDate || "—"}
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Reporter Email</div>
                      <div className="info-value">{selectedIssue.reporterEmail}</div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Assigned At</div>
                      <div className="info-value">
                        {formatDateTime(selectedIssue.assignedAt)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section">
                  <div className="section-title">Status Control</div>
                  <div className="status-actions">
                    {selectedIssue.status === "OPEN" && (
                      <button
                        className="status-action-btn"
                        disabled={!selectedIssue.assignedTechnicianEmail}
                        onClick={() =>
                          handleStatusChange(selectedIssue.id, "IN PROGRESS")
                        }
                      >
                        Move to IN PROGRESS
                      </button>
                    )}

                    {selectedIssue.status === "IN PROGRESS" && (
                      <button
                        className="status-action-btn"
                        onClick={() =>
                          handleStatusChange(selectedIssue.id, "RESOLVED")
                        }
                      >
                        Move to RESOLVED
                      </button>
                    )}

                    {selectedIssue.status === "RESOLVED" && (
                      <button className="danger-btn" onClick={handleDeleteResolved}>
                        Remove from Admin Queue
                      </button>
                    )}
                  </div>

                  {selectedIssue.status === "OPEN" &&
                    !selectedIssue.assignedTechnicianEmail && (
                      <div style={{ marginTop: "14px" }}>
                        {renderAdminEmptyState({
                          eyebrow: "Assignment needed",
                          title: "Assign a technician first",
                          description:
                            "This ticket can move to in progress after a technician has been assigned.",
                          compact: true,
                        })}
                      </div>
                    )}
                </div>

                {selectedIssue.status === "OPEN" && (
                  <div className="section">
                    <div className="section-title">Assign Technician</div>
                    
                    <div className="tech-filter-container">
                      <span className="tech-filter-label">Filter by:</span>
                      <select
                        className="tech-filter-select"
                        value={techTeamFilter}
                        onChange={(e) => setTechTeamFilter(e.target.value)}
                      >
                        <option value="all">All Teams</option>
                        {uniqueTeams.map((team) => (
                          <option key={team} value={team}>
                            {team}
                          </option>
                        ))}
                      </select>

                      <select
                        className="tech-filter-select"
                        value={techSpecFilter}
                        onChange={(e) => setTechSpecFilter(e.target.value)}
                      >
                        <option value="all">All Specializations</option>
                        {uniqueSpecializations.map((spec) => (
                          <option key={spec} value={spec}>
                            {spec}
                          </option>
                        ))}
                      </select>

                      <select
                        className="tech-filter-select"
                        value={techStatusFilter}
                        onChange={(e) => setTechStatusFilter(e.target.value)}
                      >
                        <option value="all">All Status</option>
                        {uniqueStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                      {(techTeamFilter !== "all" || techSpecFilter !== "all" || techStatusFilter !== "all") && (
                        <button
                          className="clear-tech-filters-btn"
                          onClick={() => {
                            setTechTeamFilter("all");
                            setTechSpecFilter("all");
                            setTechStatusFilter("all");
                          }}
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>

                    <div className="tech-grid">
                      {filteredTechnicians.length === 0 ? (
                        <div style={{ gridColumn: "1 / -1" }}>
                          {renderAdminEmptyState({
                            eyebrow: "No technician match",
                            title: "No technicians fit these filters",
                            description:
                              "Adjust the team, specialization, or status filters to see more technician options.",
                            compact: true,
                          })}
                        </div>
                      ) : (
                        filteredTechnicians.map((tech) => {
                          const assigned =
                            selectedIssue.assignedTechnicianEmail === tech.email;

                          return (
                            <div className="tech-card" key={tech.id}>
                              <div className="tech-name">{tech.name}</div>
                              <div className="tech-team">{tech.team}</div>
                              <div className="tech-spec">{tech.specialization}</div>
                              <div className="tech-email">{tech.email}</div>
                              <div className="tech-phone">{tech.phone}</div>
                              <div className="tech-phone">Status: {tech.status}</div>

                              <div className={assigned ? "assign-actions" : undefined}>
                                <button
                                  className="assign-btn"
                                  disabled={assigned}
                                  onClick={() =>
                                    handleAssignTechnician(selectedIssue.id, tech.id)
                                  }
                                >
                                  {assigned ? "Assigned ✓" : "Assign Technician"}
                                </button>
                                {assigned && (
                                  <button
                                    className="danger-btn"
                                    type="button"
                                    onClick={() =>
                                      handleUnassignTechnician(selectedIssue.id)
                                    }
                                  >
                                    Cancel Assign
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}

                {selectedIssue.status === "IN PROGRESS" && (
                  <div className="section">
                    <div className="section-title">Technician Alerts</div>
                    <div className="alert-tabs">
                      <button
                        type="button"
                        className={`alert-tab ${technicianAlertTab === "PUBLIC" ? "active" : ""}`}
                        onClick={() => setTechnicianAlertTab("PUBLIC")}
                      >
                        Public
                      </button>
                      <button
                        type="button"
                        className={`alert-tab ${technicianAlertTab === "PRIVATE" ? "active" : ""}`}
                        onClick={() => setTechnicianAlertTab("PRIVATE")}
                      >
                        Private
                        {unreadPrivateTechnicianAlerts.length > 0 && technicianAlertTab !== "PRIVATE" && (
                          <span className="private-badge">{unreadPrivateTechnicianAlerts.length}</span>
                        )}
                      </button>
                    </div>

                    {visibleTechnicianAlerts.length === 0 ? (
                      <div className="empty-note">No technician alerts yet.</div>
                    ) : (
                      <div className="conversation-list">
                        {visibleTechnicianAlerts.map((comment) => (
                          <div
                            className="conversation-card"
                            key={comment.id}
                            onClick={() => setPendingScrollCommentId(comment.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="conversation-top">
                              <span className="conversation-author">
                                {comment.authorName}
                              </span>{" "}
                              • {formatDateTime(comment.createdAt)}
                            </div>
                            <div className="conversation-text">{comment.text}</div>
                            {getCommentVisibility(comment) === "PRIVATE" && (
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
                                  handleReplyToComment(comment);
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
                  <div className="section-title">Admin Communication</div>

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
                            setAdminMessageVisibility("PUBLIC");
                          }}
                        >
                          Cancel Reply
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="admin-note-box">
                    <div className="channel-toggle">
                      {["PUBLIC", "PRIVATE"].map((visibility) => (
                        <button
                          key={visibility}
                          type="button"
                          className={`channel-btn ${adminMessageVisibility === visibility ? "active" : ""}`}
                          disabled={Boolean(replyToComment)}
                          onClick={() => setAdminMessageVisibility(visibility)}
                        >
                          {visibility === "PUBLIC" ? "Public" : "Private"}
                        </button>
                      ))}
                    </div>
                    <textarea
                      placeholder={
                        adminMessageVisibility === "PRIVATE"
                          ? "Write a private admin message. Only admin and the assigned technician can see it."
                          : "Write a public admin message. This can appear in featured conversations."
                      }
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                    />
                    <div className="admin-note-actions">
                      <button className="admin-note-btn" onClick={handleAdminComment}>
                        {replyToComment ? "Send Reply" : "Send Admin Message"}
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
                      {buildDiscussionTree(discussionComments).map((comment) =>
                        renderDiscussionNode(comment)
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              renderAdminEmptyState({
                eyebrow: "Ready to review",
                accent: "Admin control panel",
                title: "Select an issue to view details",
                description:
                  "Pick a ticket from the queue to review the report, manage workflow updates, and coordinate with the assigned technician.",
                support:
                  "Issue details, technician assignment, alerts, and workflow controls will appear here once you select a ticket from the left queue.",
              })
            )}
          </div>
        </div>
      </div>

      {previewImage && (
        <div className="image-modal" onClick={() => setPreviewImage("")}> 
          <button className="image-modal-close" onClick={() => setPreviewImage("")}> 
            &times;
          </button>
          <img
            className="image-modal-content"
            src={previewImage}
            alt="Expanded issue"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
