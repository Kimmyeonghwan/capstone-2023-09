import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import {
  IPasswordChangeRequest,
  IPasswordChangeResponse,
} from '../interfaces/IPasswordChange';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const usePasswordChange = () => {
  return useMutation<
    AxiosResponse<IPasswordChangeResponse>,
    AxiosError,
    IPasswordChangeRequest
  >({
    mutationKey: 'usePasswordChange',
    mutationFn: (data) =>
      apiRequest.post(API_URL.ADMIN_PASSWORD_CHANGE, { ...data }),
  });
};
