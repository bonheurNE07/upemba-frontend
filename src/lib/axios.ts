import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Structural Request Interceptor
// Statically attaches the DRF auth token gracefully to every active fetch sequence
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Native Django Token Auth uses 'auth_token' cookie securely
    const token = Cookies.get('auth_token');
    
    if (token && config.headers) {
      // Conform exactly to standard Django Rest Framework "Token" protocol limits
      config.headers.Authorization = `Token ${token}`; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Structural Response Interceptor
// Diagnoses API Drops catching the Django `HTTP_401_UNAUTHORIZED` globally
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Catch 401 Unauthorized strictly
    if (error.response?.status === 401) {
      
      // Since it is standard DRF Token Auth, there is no automatic refresh. 
      // The token was either deleted or revoked. We log them out natively.
      Cookies.remove('auth_token');
      
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    // Pass arbitrary non 401 errors cleanly forward
    return Promise.reject(error);
  }
);
