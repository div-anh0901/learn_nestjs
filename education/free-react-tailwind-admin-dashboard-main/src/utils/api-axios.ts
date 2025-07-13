// src/api/axios.ts
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { CreateUser, LoginType, Pagination, ProfileType, DataStudents, UpdateProfile, ApiResponse } from './type-request';

// Load base URL from .env
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // send cookies (for sessions or auth)
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token'); // or sessionStorage
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle global errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      // Optional: handle errors globally
      switch (status) {
        case 401:
          console.warn('Unauthorized: Redirecting to login...');
          // window.location.href = '/login'; // Or use React Router
          break;
        case 403:
          console.error('Forbidden');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error(`Error ${status}:`, error.response.data);
      }
    } else {
      console.error('Network error or no response from server');
    }

    return Promise.reject(error);
  }
);


export const registerUser = async (data: CreateUser) => {
    const response = await api.post('/users/register', data);
    return response.data;
  };

  export const loginUser = async (data: LoginType) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  };


export const getProfile =  async ()=>{
    const response = await api.get('/users/me');
    return response.data;
}

export const updateProfile = async(data: UpdateProfile) =>{
  const response = await api.put('/users/me',data);
    return response.data;
}

export const uploadFile = async (file: any)=>{
  const response = await api.post('/upload-file/images', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data
}


export const getStudents = async(data: Pagination) : Promise<ApiResponse<DataStudents[]>> =>{
  const response = await api.post('/students/getAlls',data);
    return {
      data: response.data.data,
      meta: response.data.meta
    };
}
