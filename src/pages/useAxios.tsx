import AuthContext, { AuthContextType } from '@/contexts/AuthContext';
import axios, { AxiosInstance } from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { useContext } from 'react';

const baseURL = 'https://amirmohammadkomijani.pythonanywhere.com';
const useAxios = () => {
  const authContext = useContext<AuthContextType | null>(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext is not provided properly.');
  }
  const { authTokens, setUser, setAuthTokens } = authContext;
  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${authTokens?.access}`,
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
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
      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));
      req.headers.Authorization = `Bearer ${response.data?.access}`;
    } catch (error) {
      console.error('Token refresh error:', error);
    }

    return req;
  });

  return axiosInstance;
};

export default useAxios;
