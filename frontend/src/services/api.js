import axiosInstance from './axiosInstance';
import axios from 'axios';


export const fetchStudents = async () => {
  const response = await axiosInstance.get('/students');
  return response.data;
};

export const addStudent = async (newStudent) => {
  const response = await axiosInstance.post('/students', newStudent);
  return response.data;
};

// Add more functions for interacting with your API here




// Normal Axios setup
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // handle unauthorized error, e.g. remove token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
