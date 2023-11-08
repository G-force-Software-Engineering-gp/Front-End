import { AuthContextType } from '@/contexts/AuthContext';
import axios, { AxiosInstance } from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

const baseURL = 'https://amirmohammadkomijani.pythonanywhere.com';

let authTokens: AuthContextType['authTokens'] | null = localStorage.getItem('authTokens')
  ? JSON.parse(localStorage.getItem('authTokens')!)
  : null;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${authTokens?.access}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')!) : null;
    req.headers.Authorization = `Bearer ${authTokens?.access}`;
  }

  const user = jwt_decode<AuthContextType['authTokens']>(authTokens!.access);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) {
    return req;
  }

  try {
    const response = await axios.post<AuthContextType['authTokens']>(`${baseURL}/auth/jwt/refresh/`, {
      refresh: authTokens!.refresh,
    });

    localStorage.setItem('authTokens', JSON.stringify(response.data));

    req.headers.Authorization = `Bearer ${response.data?.access}`;
  } catch (error) {
    console.error('Token refresh error:', error);
  }

  return req;
});

export default axiosInstance;
