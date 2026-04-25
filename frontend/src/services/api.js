import axios from 'axios'

const BASE_URL = 'http://localhost:8081/api'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

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

  // Maps advanced search to the existing filter endpoint
  advancedSearch: ({ query, type, status, location, minCapacity } = {}) =>
    apiClient.get('/resources', {
      params: {
        ...(type && { type }),
        ...(status && { status }),
        ...(location && { location }),
        ...(minCapacity && { minCapacity }),
      },
    }),
  getSearchSuggestions: () => Promise.resolve({ data: [] }),
  parseQuery: () => Promise.resolve({ data: {} }),
}

export default apiClient
