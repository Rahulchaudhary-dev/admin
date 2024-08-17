import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
const baseURL: string | undefined = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({
  baseURL,
  headers: {
    // 'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // timeout: 1000,
  // withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token') || '';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getRequest<T>(
  URL: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return axiosClient.get<T>(`${URL}`, config);
}

export function postRequest<T>(
  URL: string,
  payload: T,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> {
  return axiosClient.post<T>(`${URL}`, payload, config);
}

export function patchRequest<T>(
  URL: string,
  payload: T,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return axiosClient.patch<T>(`${URL}`, payload, config);
}

export function deleteRequest<T>(
  URL: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return axiosClient.delete<T>(`${URL}`, config);
}

export default axiosClient;
