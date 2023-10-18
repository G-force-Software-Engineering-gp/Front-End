import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const baseURL = 'https://amirmohammadkomijani.pythonanywhere.com';

const useAxios = () => {
  // getting setUser and setAuthTokens
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  // just explained in axiosInstance file
  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `bearer ${authTokens?.access}` },
  });
  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/auth/token/refresh/`, {
      refresh: authTokens.refresh,
    });

    localStorage.setItem('authTokens', JSON.stringify(response.data));
    // !! new part !! we want if our token changed then
    // renew the user and authtoken for new usages
    setAuthTokens(response.data);
    setUser(jwt_decode(response.data.access));
    req.headers.Authorization = `bearer ${response.data.access}`;
    return req;
  });
  return axiosInstance;
};

export default useAxios;
