import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import qs from 'qs';
import { HttpStatus, type ApiError, type ApiResponse } from './types/api.type';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3004',
});
// enviar token y serializar los params
axiosInstance.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user);
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.params) {
    config.paramsSerializer = (params) =>
      qs.stringify(params, {
        arrayFormat: 'repeat',
      });
  }
  return config;
});
// interceptar la respuesta de la api para obtener el objeto data
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    return response.data;
  },
  (error: AxiosError<unknown>) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data as ApiResponse<null>);
    }

    return Promise.reject({
      message: 'Error de red o el servidor no responde',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: 'INTERNAL_SERVER_ERROR',
    } as ApiError);
  },
);
export default axiosInstance;
