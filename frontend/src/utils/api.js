import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

// API endpoints
export const projectsAPI = {
  getAll: (params = {}) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const skillsAPI = {
  getAll: (params = {}) => api.get('/skills', { params }),
  getByCategory: (category) => api.get(`/skills/category/${category}`),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
};

export const contactAPI = {
  send: (data) => api.post('/contact', data),
  getAll: (params = {}) => api.get('/contact', { params }),
  updateStatus: (id, status) => api.put(`/contact/${id}`, { status }),
  delete: (id) => api.delete(`/contact/${id}`),
};

export const aboutAPI = {
  get: () => api.get('/about'),
  create: (data) => api.post('/about', data),
  update: (id, data) => api.put(`/about/${id}`, data),
};

export default api;
