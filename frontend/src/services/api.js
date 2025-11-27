import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (userData) => api.post('/users/login', userData),
  getProfile: () => api.get('/users/profile')
};

// Projects API
export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (projectData) => api.post('/projects', projectData),
  update: (id, projectData) => api.put(`/projects/${id}`, projectData),
  delete: (id) => api.delete(`/projects/${id}`)
};

// Blog API
export const blogAPI = {
  getAll: () => api.get('/blog'),
  getById: (id) => api.get(`/blog/${id}`),
  create: (postData) => api.post('/blog', postData),
  update: (id, postData) => api.put(`/blog/${id}`, postData),
  delete: (id) => api.delete(`/blog/${id}`)
};

// Comments API
export const commentsAPI = {
  getByPost: (postId) => api.get(`/blog/${postId}/comments`),
  create: (postId, commentData) => api.post(`/blog/${postId}/comments`, commentData)
};

// Contact API
export const contactAPI = {
  send: (messageData) => api.post('/contact', messageData),
  getAll: () => api.get('/contact')
};

export default api;
