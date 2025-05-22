import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
  withCredentials: true 
});

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized (redirect to login)
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;