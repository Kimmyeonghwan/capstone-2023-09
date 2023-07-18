import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { IGetAdminRequest, IGetAdminResponse } from '../interfaces/IAdmin';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const useAdminRegister = () => {
  return useMutation<AxiosResponse<any>, AxiosError, any>({
    mutationKey: 'useAdminRegister',
    mutationFn: (data) =>
      apiRequest.post(API_URL.ADMIN_REGISTER, {
        ...data,
      }),
  });
};

export const useGetAdmins = (params?: IGetAdminRequest) => {
  return useQuery<AxiosResponse<IGetAdminResponse>, AxiosError>({
    queryKey: ['useGetAdmins', params],
    queryFn: () => apiRequest.get(API_URL.ADMINS, { params }),
    refetchOnWindowFocus: false,
  });
};

export const useDeleteAdmins = () => {
  return useMutation<AxiosResponse<any>, AxiosError, number>({
    mutationKey: 'useDeleteAdmins',
    mutationFn: (deleteAdminIds) =>
      apiRequest.delete(`${API_URL.ADMINS}/${deleteAdminIds}`),
  });
};
