import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

//set base URL
const baseURL = 'https://amirmohammadkomijani.pythonanywhere.com';
// check authtoken in local storage
let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;

// create axios instance
const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `bearer ${authTokens?.access}` },
});
// axios request interceptor is use to check and change anything
// before API call
axiosInstance.interceptors.request.use(async (req) => {
  // check if we do not have authtoken in local storage then check local storage for authtoken
  if (!authTokens) {
    authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
    req.headers.Authorization = `bearer ${authTokens?.access}`;
  }
  // check if our authtoken is expired then call refresh token to
  // get new token and set it in the local storage
  const user = jwt_decode(authTokens.access);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  if (!isExpired) return req;

  const response = await axios.post(`${baseURL}/auth/token/refresh/`, {
    refresh: authTokens.refresh,
  });

  localStorage.setItem('authTokens', JSON.stringify(response.data));
  req.headers.Authorization = `bearer ${response.data.access}`;
  return req;
});

export default axiosInstance;
