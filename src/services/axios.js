import axios from 'axios';
import getToken from '../utils/user/getToken';

const backendUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5300/' : 'https://online-store-postgresql.onrender.com/';
const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (config.headers) {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
      config.headers['Access-Control-Allow-Origin'] = backendUrl;
    }

    return config;
  },
  (error) => {
    const response = error.response;
    return response;
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      //Todo: dispatch logout
      // dispatchLoginFailure(error.response?.data.message);
    }
    const response = error.response ? error.response : error;
    return response;
  },
);

export default axiosInstance;
