import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { ILoginRequest, ILoginResponse } from '../interfaces/ILogin';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const usePostLogin = () => {
  return useMutation<AxiosResponse<ILoginResponse>, AxiosError, ILoginRequest>({
    mutationKey: 'usePostLogin',
    mutationFn: (data) => apiRequest.post(API_URL.ADMIN_LOGIN, { ...data }),
  });
};

export const useLogout = () => {
  return useMutation<AxiosResponse<any>, AxiosError, any>({
    mutationKey: 'useLogout',
    mutationFn: (data) => apiRequest.post(API_URL.ADMIN_LOGOUT, { ...data }),
  });
};
