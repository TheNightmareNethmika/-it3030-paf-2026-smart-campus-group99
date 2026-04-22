import api from "./axios";

export const getTechnicianIssues = () => api.get("/technician/issues");
export const getTechnicianSummary = () => api.get("/technician/summary");

export const updateTechnicianIssueStatus = (issueId, status) =>
  api.patch(`/technician/issues/${issueId}/status`, { status });

export const addTechnicianComment = (issueId, text, parentCommentId = null, visibility = "PUBLIC") =>
  api.post(`/technician/issues/${issueId}/comments`, { text, parentCommentId, visibility });

export const updateTechnicianComment = (issueId, commentId, text) =>
  api.patch(`/technician/issues/${issueId}/comments/${commentId}`, { text });

export const deleteTechnicianComment = (issueId, commentId) =>
  api.delete(`/technician/issues/${issueId}/comments/${commentId}`);
