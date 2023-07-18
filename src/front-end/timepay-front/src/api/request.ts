import axios from 'axios';
import { getMultiTokenFromCookie, getTokenFromCookie } from '../utils/token';
import { FORM_DATA_REQUIRED_URLS, HEADER_NOT_REQUIRED_URLS } from './urls';

const request = axios.create({
  withCredentials: true,
  timeout: 1000000,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'http://13.125.119.30/',
});

request.interceptors.request.use((config) => {
  const isMulti = getMultiTokenFromCookie();
  const token =
    !isMulti || isMulti === 'undefined' ? getTokenFromCookie() : isMulti;
  // 여기에 token 이 필요한 api 요청일 때만 추가
  config.headers.set(
    'Authorization',
    !HEADER_NOT_REQUIRED_URLS.includes(config.url || '')
      ? token
        ? `Bearer ${token}`
        : undefined
      : undefined,
  );
  config.headers.set(
    'Content-Type',
    FORM_DATA_REQUIRED_URLS.includes(config.url || '')
      ? 'multipart/form-data'
      : 'application/json',
  );
  return config;
});

request.interceptors.response.use();

export const apiRequest = {
  get: (url: string, params?: object) => request.get(url, { ...params }),
  post: (url: string, data?: unknown) => request.post(url, data),
  postFormData: (url: string, formData: FormData) =>
    request.post(url, formData),
  patchFormData: (url: string, formData: FormData) =>
    request.patch(url, formData),
  patch: (url: string, data: unknown) => request.patch(url, data),
  put: (url: string, data?: unknown) => request.put(url, data),
  delete: (url: string, data?: any) => request.delete(url, data),
};
