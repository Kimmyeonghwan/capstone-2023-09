import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { IQna, IPostQna, IGetQna } from '../interfaces/IQna';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const useGetInquiry = () => {
  return useQuery<AxiosResponse<IGetQna>, AxiosError>({
    queryKey: ['useGetInquiry'],
    queryFn: () => apiRequest.get(API_URL.INQUIRY),
    refetchOnWindowFocus: false,
  });
};

export const useCreateInquiry = () => {
  return useMutation<AxiosResponse<boolean>, AxiosError, IPostQna>({
    mutationKey: 'useCreateInquiry',
    mutationFn: (data) =>
      apiRequest.post(API_URL.INQUIRY_WRITE, {
        ...data,
      }),
  });
};

export const useDeleteNotifications = () => {
  return useMutation<AxiosResponse<boolean>, AxiosError, number[]>({
    mutationKey: 'useDeleteInquiry',
    mutationFn: (deleteInquiryIds) =>
      apiRequest.delete(API_URL.NOTIFICATIONS, {
        data: { ids: deleteInquiryIds },
      }),
  });
};
