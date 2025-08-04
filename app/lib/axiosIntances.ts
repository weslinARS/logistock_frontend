import axios from 'axios';
import qs from 'qs';
import { HttpStatus, type ApiError, type ApiResponse } from './types/api.type';

const axiosPublicInstance = axios.create({
  baseURL: 'http://localhost:3004',
});
const axiosPrivateInstance = axios.create({
  baseURL: 'http://localhost:3004',
});
// enviar token y serializar los params
axiosPrivateInstance.interceptors.request.use((config) => {
  if (config.params) {
    config.paramsSerializer = (params) =>
      qs.stringify(params, {
        arrayFormat: 'repeat',
      });
  }
  return config;
});

const handleResponseError = (error: any) => {
  if (error.response && error.response.data) {
    return Promise.reject(error.response.data as ApiResponse<null>);
  }

  return Promise.reject({
    message: 'Error de red o el servidor no responde',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: 'INTERNAL_SERVER_ERROR',
  } as ApiError);
};

axiosPublicInstance.interceptors.response.use(
  (res) => res.data,
  handleResponseError,
);
axiosPrivateInstance.interceptors.response.use(
  (res) => res.data,
  handleResponseError,
);

export { axiosPrivateInstance, axiosPublicInstance };
