import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('hr_token', token);
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('hr_token');
    delete apiClient.defaults.headers.common.Authorization;
  }
};

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('hr_token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
