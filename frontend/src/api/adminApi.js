import api from "./axios";

export const getAdminIssues = () => api.get("/admin/issues");
export const getTechnicians = () => api.get("/admin/technicians");
export const getAdminSummary = () => api.get("/admin/summary");

export const updateAdminIssueStatus = (issueId, status) =>
  api.patch(`/admin/issues/${issueId}/status`, { status });

export const assignIssueTechnician = (issueId, technicianId) =>
  api.patch(`/admin/issues/${issueId}/assign`, { technicianId });

export const addAdminComment = (issueId, text) =>
  api.post(`/admin/issues/${issueId}/comments`, { text });

export const deleteResolvedIssue = (issueId) =>
  api.delete(`/admin/issues/${issueId}`);