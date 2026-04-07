import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addComment, closeIssue, deleteComment, deleteIssue, getIssueById, updateComment } from "../api/issueApi";

export default function IssueDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");
  const [replyToComment, setReplyToComment] = useState(null);
  const [pendingScrollCommentId, setPendingScrollCommentId] = useState(null);
  const commentNodeRefs = useRef({});
  const [previewImage, setPreviewImage] = useState("");
  const commentFormRef = useRef(null);
  const [commentImages, setCommentImages] = useState([]);
  const [commentFileError, setCommentFileError] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [editingCommentImages, setEditingCommentImages] = useState([]);
  const [editingNewImages, setEditingNewImages] = useState([]);
  const [editingCommentFileError, setEditingCommentFileError] = useState("");
  const currentUserEmail = "student@sliit.lk";

  useEffect(() => {
    fetchIssue();
  }, [id]);

  useEffect(() => {
    if (pendingScrollCommentId && commentNodeRefs.current[pendingScrollCommentId]) {
      commentNodeRefs.current[pendingScrollCommentId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setPendingScrollCommentId(null);
    }
  }, [pendingScrollCommentId, ticket]);

  const fetchIssue = async () => {
    try {
      setLoading(true);
      const response = await getIssueById(id);
      setTicket(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load issue details.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseTicket = async () => {
    const confirmed = window.confirm("Close this ticket?");
    if (!confirmed) return;

    try {
      await closeIssue(id);
      fetchIssue();
    } catch (err) {
      console.error(err);
      alert("Failed to close ticket.");
    }
  };

  const handleDeleteTicket = async () => {
    const confirmed = window.confirm("Delete this closed ticket?");
    if (!confirmed) return;

    try {
      await deleteIssue(id);
      navigate("/my-reports");
    } catch (err) {
      console.error(err);
      alert("Failed to delete ticket.");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    setCommentError("");
    setCommentFileError("");

    const trimmedText = commentText.trim();

    if (trimmedText === "" && commentImages.length === 0) {
      setCommentError("Add text or at least one image.");
      return;
    }

    const replyParentId = replyToComment ? replyToComment.id : null;

    const formData = new FormData();
    formData.append("text", trimmedText);
    if (replyParentId) {
      formData.append("parentCommentId", replyParentId);
    }

    commentImages.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await addComment(id, formData);
      const updatedIssue = response.data;

      setTicket(updatedIssue);
      setCommentText("");
      setCommentImages([]);
      setCommentFileError("");
      setShowCommentForm(false);
      setReplyToComment(null);

      const newestMatchingComment = [...(updatedIssue.comments || [])]
        .filter(
          (comment) =>
            comment.authorEmail === currentUserEmail &&
            (comment.parentCommentId || null) === replyParentId
        )
        .sort((a, b) => (b.id || 0) - (a.id || 0))[0];

      if (newestMatchingComment) {
        setPendingScrollCommentId(newestMatchingComment.id);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.text) {
        setCommentError(err.response.data.text);
      } else {
        setCommentError("Failed to add comment.");
      }
    }
  };

const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm("Delete this comment?");
    if (!confirmed) return;

    try {
      await deleteComment(id, commentId);
      fetchIssue();
    } catch (err) {
      console.error(err);
      alert("Failed to delete comment.");
    }
  };

  const handleStartEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.text || "");
    setEditingCommentImages(comment.imageUrls ? [...comment.imageUrls] : []);
    setEditingNewImages([]);
    setEditingCommentFileError("");
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditingCommentText("");
    setEditingCommentImages([]);
    setEditingNewImages([]);
    setEditingCommentFileError("");
  };

  const handleSaveEditComment = async (commentId) => {
    const trimmedText = editingCommentText.trim();

    if (trimmedText === "" && editingCommentImages.length === 0 && editingNewImages.length === 0) {
      alert("Add text or at least one image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("text", trimmedText);

      editingCommentImages.forEach((imgUrl) => {
        formData.append("existingImageUrls", imgUrl);
      });

      editingNewImages.forEach((file) => {
        formData.append("images", file);
      });

      await updateComment(id, commentId, formData);

      setEditingCommentId(null);
      setEditingCommentText("");
      setEditingCommentImages([]);
      setEditingNewImages([]);
      setEditingCommentFileError("");

      fetchIssue();
    } catch (err) {
      console.error(err);
      alert("Failed to update comment.");
    }
  };

  const handleEditCommentImageSelection = (e) => {
    setEditingCommentFileError("");
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    const invalidFiles = files.filter((file) => !file.type.startsWith("image/"));
    if (invalidFiles.length > 0) {
      setEditingCommentFileError("Only image files are allowed. Please upload JPG, PNG, WEBP, or GIF files only.");
      e.target.value = "";
      return;
    }

    if (editingCommentImages.length + editingNewImages.length + files.length > 3) {
      setEditingCommentFileError("You can upload a maximum of 3 images per comment.");
      e.target.value = "";
      return;
    }

    setEditingNewImages((prev) => [...prev, ...files]);
    e.target.value = "";
  };

  const removeExistingEditImage = (indexToRemove) => {
    setEditingCommentImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    setEditingCommentFileError("");
  };

  const removeNewEditImage = (indexToRemove) => {
    setEditingNewImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    setEditingCommentFileError("");
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

  const getStageState = (status) => {
    const normalized = (status || "").toUpperCase();

    return {
      open: true,
      inProgress: ["IN PROGRESS", "RESOLVED", "CLOSED"].includes(normalized),
      resolved: ["RESOLVED", "CLOSED"].includes(normalized),
      closed: normalized === "CLOSED",
    };
  };

  const stageState = getStageState(ticket?.status);

    const getGalleryClass = (images) => {
    const count = images?.length || 0;
    if (count === 1) return "single-image";
    if (count === 2) return "two-images";
    if (count === 3) return "three-images";
    if (count >= 4) return "multi-images";
    return "";
  };

const handleCommentImageSelection = (e) => {
    setCommentFileError("");
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    const invalidFiles = files.filter((file) => !file.type.startsWith("image/"));
    if (invalidFiles.length > 0) {
      setCommentFileError("Only image files are allowed. Please upload JPG, PNG, WEBP, or GIF files only.");
      e.target.value = "";
      return;
    }

    if (commentImages.length + files.length > 3) {
      setCommentFileError("You can upload a maximum of 3 images per comment.");
      e.target.value = "";
      return;
    }

    setCommentImages((prev) => [...prev, ...files]);
    e.target.value = "";
  };

const removeCommentImage = (indexToRemove) => {
    setCommentImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    setCommentFileError("");
  };

  if (loading) {
    return <div style={{ padding: "30px" }}>Loading issue details...</div>;
  }

  if (error) {
    return <div style={{ padding: "30px", color: "#b91c1c" }}>{error}</div>;
  }

  if (!ticket) {
    return <div style={{ padding: "30px" }}>Issue not found.</div>;
  }

const buildCommentTree = (comments = []) => {
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
      const node = map.get(comment.id);

      if (comment.parentCommentId && map.has(comment.parentCommentId)) {
        map.get(comment.parentCommentId).replies.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  };

  const renderCommentNode = (comment, level = 0) => {
    const isOwnComment = comment.authorEmail === currentUserEmail;

    return (
      <div
        key={comment.id}
        ref={(el) => {
          if (el) commentNodeRefs.current[comment.id] = el;
        }}
        style={{
          marginLeft: level > 0 ? `${Math.min(level * 28, 84)}px` : "0px",
          borderLeft: level > 0 ? "3px solid #e5e7eb" : "none",
          paddingLeft: level > 0 ? "14px" : "0px",
          marginTop: level > 0 ? "14px" : "0px",
        }}
      >
        <div className="comment-item">
          <div className="comment-line"></div>

          <div className="comment-body">
            <div className="comment-top">
              <span className="comment-author">{comment.authorName}</span>
              <span className="dot-separator">•</span>
              <span className="comment-time">{formatDateTime(comment.createdAt)}</span>
            </div>

            {editingCommentId === comment.id ? (
              <>
                <textarea
                  className="edit-comment-textarea"
                  value={editingCommentText}
                  onChange={(e) => setEditingCommentText(e.target.value)}
                />

                <div className="edit-comment-image-preview-container">
                  {editingCommentImages.map((img, index) => (
                    <div className="edit-comment-image-preview-item" key={`old-${img}-${index}`}>
                      <img src={`http://localhost:8080${img}`} alt="Existing" />
                      <button
                        type="button"
                        className="edit-comment-remove-image-btn"
                        onClick={() => removeExistingEditImage(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}

                  {editingNewImages.map((file, index) => (
                    <div className="edit-comment-image-preview-item" key={`new-${file.name}-${index}`}>
                      <img src={URL.createObjectURL(file)} alt="New" />
                      <button
                        type="button"
                        className="edit-comment-remove-image-btn"
                        onClick={() => removeNewEditImage(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  id={`editCommentImagesInput-${comment.id}`}
                  onChange={handleEditCommentImageSelection}
                />

                {editingCommentFileError && (
                  <div className="field-error">{editingCommentFileError}</div>
                )}

                <div className="comment-actions">
                  <button
                    type="button"
                    className="edit-comment-upload-btn"
                    onClick={() =>
                      document.getElementById(`editCommentImagesInput-${comment.id}`).click()
                    }
                  >
                    Add Image
                  </button>

                  <button
                    type="button"
                    className="save-comment-btn"
                    onClick={() => handleSaveEditComment(comment.id)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="cancel-edit-btn"
                    onClick={handleCancelEditComment}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="comment-text">{comment.text}</div>

                {comment.imageUrls && comment.imageUrls.length > 0 && (
                  <div className="comment-image-gallery">
                    {comment.imageUrls.map((img, index) => (
                      <div className="comment-image-tile" key={`${img}-${index}`}>
                        <img
                          src={`http://localhost:8080${img}`}
                          alt="Comment"
                          className="comment-image"
                          onClick={() => setPreviewImage(`http://localhost:8080${img}`)}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="comment-actions">
                  <button
                    type="button"
                    className="edit-comment-btn"
                    onClick={() => handleReplyToComment(comment)}
                  >
                    Reply
                  </button>

                  {isOwnComment && (
                    <>
                      <button
                        type="button"
                        className="edit-comment-btn"
                        onClick={() => handleStartEditComment(comment)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="delete-comment-btn"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </>
            )}

            {comment.replies && comment.replies.length > 0 && (
              <div>
                {comment.replies.map((reply) => renderCommentNode(reply, level + 1))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

const handleReplyToComment = (comment) => {
    setReplyToComment(comment);
    setShowCommentForm(true);

    setTimeout(() => {
      commentFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      const textarea = document.querySelector('.comment-entry-box textarea');
      textarea?.focus();
    }, 120);
  };

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
          color: #1c1c1c;
        }

        .page-shell {
          max-width: 1280px;
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

        .progress-card {
          background: #ffffff;
          border: 1px solid #edeff1;
          border-radius: 18px;
          padding: 24px 28px;
          margin-bottom: 18px;
        }

        .progress-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 16px;
        }

        .progress-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .stage {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dot {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #cbd5e1;
          background: #ffffff;
          color: #94a3b8;
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .dot.active {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
        }

        .stage-label {
          font-size: 15px;
          color: #111827;
          font-weight: 500;
        }

        .connector {
          width: 52px;
          height: 3px;
          background: #dbeafe;
          border-radius: 999px;
        }

        .post-shell {
          background: #ffffff;
          border: 1px solid #edeff1;
          border-radius: 18px;
          padding: 28px 30px 30px;
        }

        .post-meta-top {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          font-size: 14px;
          color: #6b7280;
        }

        .post-author {
          font-weight: 700;
          color: #111827;
        }

        .dot-separator {
          color: #9ca3af;
        }

        .post-title {
          font-size: 42px;
          line-height: 1.15;
          font-weight: 700;
          color: #111827;
          margin-bottom: 18px;
          word-break: break-word;
        }

        .top-status-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .status-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 12px;
          border-radius: 999px;
          background: #dbeafe;
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 700;
        }

        .owner-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .close-btn {
          border: none;
          background: #fee8e8;
          color: #f15151;
          border-radius: 999px;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .waiting-text {
          font-size: 13px;
          font-weight: 700;
          color: #64748b;
        }

        .delete-icon-btn {
          border: none;
          background: transparent;
          color: #94a3b8;
          font-size: 16px;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          transition: all 0.18s ease;
        }

        .delete-icon-btn:hover {
          background: #fee2e2;
          color: #b91c1c;
          transform: scale(1.08);
        }

        .delete-icon-btn:active {
          transform: scale(0.96);
        }

        .image-gallery {
          display: grid;
          gap: 10px;
          margin-bottom: 20px;
          border-radius: 16px;
          overflow: hidden;
        }

        .detail-gallery {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .detail-gallery .image-tile {
          height: 180px;
        }

        .detail-gallery .issue-image {
          cursor: zoom-in;
        }

        .image-gallery.single-image {
          grid-template-columns: 1fr;
        }

        .image-gallery.two-images {
          grid-template-columns: repeat(2, 1fr);
        }

        .image-gallery.three-images {
          grid-template-columns: repeat(2, 1fr);
        }

        .image-gallery.multi-images {
          grid-template-columns: repeat(2, 1fr);
        }

        .image-tile {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: #e5e7eb;
        }

        .image-gallery.single-image .image-tile {
          height: 300px;
          max-height: 320px;
        }

        .image-gallery.two-images .image-tile {
          height: 200px;
        }

        .image-gallery.three-images .image-tile {
          height: 170px;
        }

        .image-gallery.three-images .image-tile.featured-top {
          grid-column: 1 / -1;
          height: 260px;
          max-height: 280px;
        }

        .image-gallery.multi-images .image-tile {
          height: 160px;
        }

        .issue-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: zoom-in;
          transition: transform 0.2s ease, filter 0.2s ease;
        }

        .issue-image:hover {
          transform: scale(1.02);
          filter: brightness(0.95);
        }

        .description-block {
          margin-bottom: 28px;
        }

        .description-text {
          font-size: 19px;
          line-height: 1.9;
          color: #1f2937;
          white-space: pre-line;
          word-break: break-word;
        }

        .post-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          padding-bottom: 22px;
          border-bottom: 1px solid #edeff1;
          margin-bottom: 24px;
        }

        .comment-toggle-btn {
          border: 1px solid #d1d5db;
          background: #f9fafb;
          color: #111827;
          border-radius: 999px;
          padding: 11px 16px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .comment-toggle-btn:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        .summary-section {
          margin-bottom: 32px;
        }

        .section-heading {
          font-size: 26px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 18px;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .summary-item {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 18px 18px;
        }

        .summary-label {
          font-size: 12px;
          font-weight: 700;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }

        .summary-value {
          font-size: 17px;
          color: #111827;
          line-height: 1.7;
          word-break: break-word;
        }

        .comments-section {
          margin-top: 8px;
        }

        .comment-form-wrap {
          margin-bottom: 26px;
        }

        .comment-entry-box {
          border: 1px solid #d1d5db;
          border-radius: 18px;
          background: #ffffff;
          overflow: hidden;
        }

        .comment-entry-box textarea {
          width: 100%;
          min-height: 120px;
          border: none;
          outline: none;
          resize: vertical;
          padding: 18px 18px 14px;
          font-size: 15px;
          line-height: 1.7;
          color: #111827;
          background: #ffffff;
        }

        .comment-entry-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 14px 16px 16px;
          border-top: 1px solid #edeff1;
          background: #fafafa;
        }

        .btn {
          border: none;
          border-radius: 999px;
          padding: 11px 18px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .btn:hover {
          transform: translateY(-1px);
        }

        .btn-primary {
          background: #2563eb;
          color: #ffffff;
        }

        .btn-secondary {
          background: #e5e7eb;
          color: #111827;
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .comment-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .comment-line {
          width: 2px;
          background: #e5e7eb;
          align-self: stretch;
          border-radius: 999px;
          margin-left: 9px;
        }

        .comment-body {
          flex: 1;
          min-width: 0;
        }

        .comment-top {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .comment-author {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
        }

        .comment-time {
          font-size: 13px;
          color: #6b7280;
        }

        .comment-text {
          font-size: 16px;
          line-height: 1.85;
          color: #1f2937;
          white-space: pre-line;
          word-break: break-word;
          margin-bottom: 12px;
        }

        .empty-comments {
          font-size: 15px;
          color: #6b7280;
          line-height: 1.7;
        }

        .field-error {
          color: #b91c1c;
          font-size: 13px;
          font-weight: 600;
          margin: 10px 18px 0;
        }

        .comment-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 16px 14px;
          border-top: 1px solid #edeff1;
          background: #ffffff;
        }

        .comment-toolbar-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .comment-icon-btn {
          border: none;
          background: transparent;
          color: #6b5bd2;
          width: 34px;
          height: 34px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.18s ease, transform 0.18s ease;
        }

        .comment-icon-btn:hover {
          background: #f3f0ff;
          transform: translateY(-1px);
        }

        .comment-gif-label {
          font-size: 13px;
          font-weight: 700;
          color: #6b5bd2;
          padding: 6px 8px;
          border-radius: 999px;
          background: transparent;
        }

        .comment-toolbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: auto;
        }

        .comment-menu-dots {
          border: none;
          background: transparent;
          color: #8b7fd6;
          font-size: 22px;
          line-height: 1;
          cursor: default;
          padding: 0 4px;
        }

        .comment-image-preview-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }

        .comment-image-preview-item {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #d1d5db;
          background: #ffffff;
        }

        .comment-image-preview-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .comment-remove-image-btn {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 22px;
          height: 22px;
          border: none;
          border-radius: 999px;
          background: rgba(17, 24, 39, 0.88);
          color: #ffffff;
          font-size: 14px;
          line-height: 1;
          cursor: pointer;
        }

        .comment-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .delete-comment-btn,
        .edit-comment-btn,
        .save-comment-btn,
        .cancel-edit-btn {
          border: none;
          background: transparent;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 6px;
        }

        .delete-comment-btn {
          color: #9ca3af;
        }

        .delete-comment-btn:hover {
          color: #ef4444;
          text-decoration: underline;
        }

        .edit-comment-btn {
          color: #6b7280;
        }

        .edit-comment-btn:hover {
          color: #2563eb;
          text-decoration: underline;
        }

        .save-comment-btn {
          color: #2563eb;
        }

        .save-comment-btn:hover {
          text-decoration: underline;
        }

        .cancel-edit-btn {
          color: #6b7280;
        }

        .cancel-edit-btn:hover {
          text-decoration: underline;
        }

        .edit-comment-textarea {
          width: 100%;
          min-height: 90px;
          border: 1px solid #d1d5db;
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 10px;
          resize: vertical;
          outline: none;
        }

        .edit-comment-textarea:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.10);
        }

        .edit-comment-image-preview-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }

        .edit-comment-image-preview-item {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #d1d5db;
          background: #ffffff;
        }

        .edit-comment-image-preview-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .edit-comment-remove-image-btn {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 22px;
          height: 22px;
          border: none;
          border-radius: 999px;
          background: rgba(17, 24, 39, 0.88);
          color: #ffffff;
          font-size: 14px;
          line-height: 1;
          cursor: pointer;
        }

        .edit-comment-upload-btn {
          border: none;
          background: transparent;
          color: #6b5bd2;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          padding: 4px 6px;
        }

        .edit-comment-upload-btn:hover {
          text-decoration: underline;
        }

        .delete-comment-btn:hover {
          color: #ef4444;
          text-decoration: underline;
        }

        .comment-image-gallery {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }

        .comment-image-tile {
          width: 110px;
          height: 110px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #d1d5db;
          background: #f3f4f6;
        }

        .comment-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          cursor: zoom-in;
        }

        .side-panel {
          position: sticky;
          top: 24px;
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

          .post-shell {
            padding: 22px 18px 24px;
          }

          .progress-card {
            padding: 20px 18px;
          }

          .post-title {
            font-size: 30px;
          }

          .summary-grid {
            grid-template-columns: 1fr;
          }

          .connector {
            width: 28px;
          }

          .image-gallery.single-image .image-tile {
            height: 220px;
          }

          .image-gallery.two-images,
          .image-gallery.three-images,
          .image-gallery.multi-images {
            grid-template-columns: 1fr;
          }

          .image-gallery.two-images .image-tile,
          .image-gallery.three-images .image-tile,
          .image-gallery.three-images .image-tile.featured-top,
          .image-gallery.multi-images .image-tile {
            height: 180px;
            grid-column: auto;
          }
        }
      `}</style>

      <div className="page-shell">
        <div className="layout">
          <main className="main-column">
            <section className="progress-card">
              <div className="progress-title">Ticket Progress</div>
              <div className="progress-wrap">
                <div className="stage">
                  <div className="dot active">✓</div>
                  <div className="stage-label">Open</div>
                </div>

                <div className="connector"></div>

                <div className="stage">
                  <div className={`dot ${stageState.inProgress ? "active" : ""}`}>
                    {stageState.inProgress ? "✓" : "2"}
                  </div>
                  <div className="stage-label">In Progress</div>
                </div>

                <div className="connector"></div>

                <div className="stage">
                  <div className={`dot ${stageState.resolved ? "active" : ""}`}>
                    {stageState.resolved ? "✓" : "3"}
                  </div>
                  <div className="stage-label">Resolved</div>
                </div>

                <div className="connector"></div>

                <div className="stage">
                  <div className={`dot ${stageState.closed ? "active" : ""}`}>
                    {stageState.closed ? "✓" : "4"}
                  </div>
                  <div className="stage-label">Closed</div>
                </div>
              </div>
            </section>

            <section className="post-shell">
              <div className="post-meta-top">
                <span>Posted by</span>
                <span className="post-author">{ticket.reporterName}</span>
                <span className="dot-separator">•</span>
                <span>{formatDateTime(ticket.createdAt)}</span>
              </div>

              <h1 className="post-title">{ticket.title}</h1>

              <div className="top-status-row">
                <div className="status-chip">{ticket.status}</div>

                <div className="owner-actions">
                  {(ticket.status === "OPEN" || ticket.status === "RESOLVED") && (
                    <button type="button" className="close-btn" onClick={handleCloseTicket}>
                      Close Ticket
                    </button>
                  )}

                  {ticket.status === "IN PROGRESS" && (
                    <div className="waiting-text">Awaiting support update</div>
                  )}

                  {ticket.status === "CLOSED" && (
                    <button
                      type="button"
                      className="delete-icon-btn"
                      title="Delete ticket"
                      onClick={handleDeleteTicket}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
                {ticket.imageUrls && ticket.imageUrls.length > 0 && (
                <div className={`detail-gallery ${getGalleryClass(ticket.imageUrls)}`}>
                  {ticket.imageUrls.map((img, index) => (
                    <div
                      className={`image-tile ${
                        ticket.imageUrls.length === 3 && index === 0 ? "featured-top" : ""
                      }`}
                      key={`${img}-${index}`}
                    >
                      <img
                        src={`http://localhost:8080${img}`}
                        alt="Issue"
                        className="issue-image"
                        onClick={() => setPreviewImage(`http://localhost:8080${img}`)}
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="description-block">
                <div className="description-text">{ticket.description}</div>
              </div>

              <div className="post-actions">
                <button
                  type="button"
                  className="comment-toggle-btn"
                  onClick={() => {
                    setShowCommentForm(true);
                    setTimeout(() => {
                      commentFormRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 100);
                  }}
                >
                  Comments ({ticket.comments?.length || 0})
                </button>
              </div>

              <section className="summary-section">
                <h2 className="section-heading">Issue Summary</h2>

                <div className="summary-grid">
                  <div className="summary-item">
                    <div className="summary-label">Category</div>
                    <div className="summary-value">{ticket.category}</div>
                  </div>

                  <div className="summary-item">
                    <div className="summary-label">Priority</div>
                    <div className="summary-value">{ticket.priority}</div>
                  </div>

                  <div className="summary-item">
                    <div className="summary-label">Location Type</div>
                    <div className="summary-value">{ticket.locationType}</div>
                  </div>

                  <div className="summary-item">
                    <div className="summary-label">Building / Area</div>
                    <div className="summary-value">{ticket.building}</div>
                  </div>

                  <div className="summary-item">
                    <div className="summary-label">Exact Location</div>
                    <div className="summary-value">{ticket.roomNumber || "-"}</div>
                  </div>

                  <div className="summary-item">
                    <div className="summary-label">Date Observed</div>
                    <div className="summary-value">{ticket.incidentDate}</div>
                  </div>

                  {ticket.assetId && (
                    <div className="summary-item">
                      <div className="summary-label">Equipment ID / Asset Tag</div>
                      <div className="summary-value">{ticket.assetId}</div>
                    </div>
                  )}

                  {ticket.contactNumber && (
                    <div className="summary-item">
                      <div className="summary-label">Preferred Contact Number</div>
                      <div className="summary-value">{ticket.contactNumber}</div>
                    </div>
                  )}
                </div>
              </section>

              <section className="comments-section">
                <h2 className="section-heading">Comments</h2>

            {showCommentForm && (
                  <div className="comment-form-wrap" ref={commentFormRef}>
                    {replyToComment && (
                      <div
                        style={{
                          background: "#eef2ff",
                          border: "1px solid #c7d2fe",
                          color: "#3730a3",
                          borderRadius: "14px",
                          padding: "12px 14px",
                          marginBottom: "12px",
                          fontSize: "13px",
                          lineHeight: "1.6",
                        }}
                      >
                        Replying to <strong>{replyToComment.authorName}</strong>:{" "}
                        {replyToComment.text}
                        <div style={{ marginTop: "10px" }}>
                          <button
                            type="button"
                            className="cancel-edit-btn"
                            onClick={() => setReplyToComment(null)}
                          >
                            Cancel Reply
                          </button>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleAddComment}>
                      <div className="comment-entry-box">
        <textarea
          name="text"
          placeholder="Join the conversation"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        {/* Image previews */}
        <div className="comment-image-preview-container">
          {commentImages.map((file, index) => (
            <div className="comment-image-preview-item" key={`${file.name}-${index}`}>
              <img src={URL.createObjectURL(file)} alt="preview" />
              <button
                type="button"
                className="comment-remove-image-btn"
                onClick={() => removeCommentImage(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Hidden input */}
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          id="commentImagesInput"
          onChange={handleCommentImageSelection}
        />

        {/* Errors */}
        {commentFileError && <div className="field-error">{commentFileError}</div>}
        {commentError && <div className="field-error">{commentError}</div>}

        {/* Toolbar */}
        <div className="comment-toolbar">
          <div className="comment-toolbar-left">
            <button
              type="button"
              className="comment-icon-btn"
              onClick={() => document.getElementById("commentImagesInput").click()}
            >
              🖼️
            </button>
            <span className="comment-gif-label">GIF</span>
          </div>

          <div className="comment-toolbar-right">
            <button type="button" className="comment-menu-dots">…</button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowCommentForm(false);
                setCommentText("");
                setCommentError("");
                setCommentImages([]);
                setCommentFileError("");
                setReplyToComment(null);
            }}
            >
              Cancel
            </button>

            <button type="submit" className="btn btn-primary">
              Comment
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
)}

                {ticket.comments && ticket.comments.length > 0 ? (
                  <div className="comments-list">
                    {buildCommentTree(ticket.comments).map((comment) =>
                      renderCommentNode(comment)
                    )}
                  </div>
                ) : (
                  <div className="empty-comments">
                    No comments yet. Start the conversation using the comments button above.
                  </div>
                )}
              </section>
            </section>
          </main>

          <aside className="side-panel">
            <section className="premium-actions">
              <h3>Quick Actions</h3>
              <p>Move through your support space quickly with these shortcuts.</p>

              <div className="action-links">
                <Link to="/" className="action-link">
                  <div>
                    <div className="action-link-title">Return to Help Centre</div>
                    <div className="action-link-sub">Go back to the support home</div>
                  </div>
                  <div className="action-arrow">→</div>
                </Link>

                <Link to="/my-reports" className="action-link">
                  <div>
                    <div className="action-link-title">View My Reports</div>
                    <div className="action-link-sub">See tickets you created</div>
                  </div>
                  <div className="action-arrow">→</div>
                </Link>

                <Link to="/featured" className="action-link">
                  <div>
                    <div className="action-link-title">Featured Conversations</div>
                    <div className="action-link-sub">Browse public issue discussions</div>
                  </div>
                  <div className="action-arrow">→</div>
                </Link>

                <Link to="/report" className="action-link">
                  <div>
                    <div className="action-link-title">Create Another Report</div>
                    <div className="action-link-sub">Submit a new issue ticket</div>
                  </div>
                  <div className="action-arrow">→</div>
                </Link>
              </div>
            </section>
          </aside>
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