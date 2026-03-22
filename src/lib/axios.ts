import axios from 'axios';

export const apiClient = axios.create({
  // Natively routes to the Upemba PostgreSQL/Django API Server
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Securely tracks Django session variables/CSRF protocols bridging localhost
});
