import api from "./axios";

export const getAllIssues = () => api.get("/issues");
export const getIssueById = (id) => api.get(`/issues/${id}`);
export const getMyIssues = () => api.get("/issues/my");
// Do not set Content-Type for FormData — axios must set multipart boundary.
const formDataConfig = {
  transformRequest: [
    (data, headers) => {
      if (data instanceof FormData) {
        delete headers["Content-Type"];
      }
      return data;
    },
  ],
};

export const createIssue = (formData) => api.post("/issues", formData, formDataConfig);
export const addComment = (id, formData) =>
  api.post(`/issues/${id}/comments`, formData, formDataConfig);
export const closeIssue = (id) => api.patch(`/issues/${id}/close`);
export const deleteIssue = (id) => api.delete(`/issues/${id}`);
export const deleteComment = (issueId, commentId) =>
  api.delete(`/issues/${issueId}/comments/${commentId}`);
export const updateComment = (issueId, commentId, formData) =>
  api.patch(`/issues/${issueId}/comments/${commentId}`, formData, formDataConfig);
  