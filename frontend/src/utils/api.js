import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ============ Auth APIs ============
export const authAPI = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  register: (data) => 
    api.post('/auth/register', data),
}

// ============ Tracking APIs ============
export const trackingAPI = {
  // Get all tracking records (employees see all, customers see their own)
  getAll: () => 
    api.get('/tracking'),
  
  // Search for a specific tracking record by tracking number
  search: (trackingNumber) => 
    api.get(`/tracking/search/${trackingNumber}`),
  
  // Create or update a tracking record
  create: (data) => 
    api.post('/tracking', data),
  
  // Update existing tracking record
  update: (id, data) => 
    api.post('/tracking', { ...data, _id: id }),
  
  // Delete a tracking record
  delete: (id) => 
    api.delete(`/tracking/${id}`),
}

// ============ Upload APIs ============
export const uploadAPI = {
  // Upload Excel file with tracking records
  uploadExcel: (file, columnMapping) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('columnMapping', JSON.stringify(columnMapping))
    
    return api.post('/upload/excel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

// ============ Error Handler Utility ============
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      status: error.response.status,
      message: error.response.data?.message || 'An error occurred',
      data: error.response.data,
    }
  } else if (error.request) {
    // Request made but no response received
    return {
      status: 0,
      message: 'No response from server. Please check your connection.',
      data: null,
    }
  } else {
    // Error in request setup
    return {
      status: 0,
      message: error.message || 'An unexpected error occurred',
      data: null,
    }
  }
}

export default api