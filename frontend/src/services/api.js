import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor - extract user-friendly error
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data
    return Promise.reject(data || { message: 'An unexpected error occurred. Please try again.' })
  }
)

export const resourceApi = {
  getAll: (params = {}) => apiClient.get('/resources', { params }),
  getById: (id) => apiClient.get(`/resources/${id}`),
  create: (data) => apiClient.post('/resources', data),
  update: (id, data) => apiClient.put(`/resources/${id}`, data),
  delete: (id) => apiClient.delete(`/resources/${id}`),
  
  // Advanced search endpoints
  advancedSearch: (searchRequest) => apiClient.post('/resources/search/advanced', searchRequest),
  getSearchSuggestions: (query) => apiClient.get('/resources/search/suggestions', { params: { query } }),
  parseQuery: (query) => apiClient.get('/resources/search/parse', { params: { query } }),
}

export default apiClient
