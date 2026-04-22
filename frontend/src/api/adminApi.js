import api from "./axios";

export const getAdminIssues = () => api.get("/admin/issues");
export const getTechnicians = () => api.get("/admin/technicians");
export const getAdminSummary = () => api.get("/admin/summary");

export const updateAdminIssueStatus = (issueId, status) =>
  api.patch(`/admin/issues/${issueId}/status`, { status });

export const assignIssueTechnician = (issueId, technicianId) =>
  api.patch(`/admin/issues/${issueId}/assign`, { technicianId });

export const addAdminComment = (issueId, text, parentCommentId = null, visibility = "PUBLIC") =>
  api.post(`/admin/issues/${issueId}/comments`, { text, parentCommentId, visibility });

export const updateAdminComment = (issueId, commentId, text) =>
  api.patch(`/admin/issues/${issueId}/comments/${commentId}`, { text });

export const deleteAdminComment = (issueId, commentId) =>
  api.delete(`/admin/issues/${issueId}/comments/${commentId}`);

export const deleteResolvedIssue = (issueId) =>
  api.delete(`/admin/issues/${issueId}`);
