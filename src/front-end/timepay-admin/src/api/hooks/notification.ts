import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import {
  IGetNotificationRequest,
  IGetNotificationResponse,
} from '../interfaces/INotification';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const useGetNotifications = (params?: IGetNotificationRequest) => {
  return useQuery<AxiosResponse<IGetNotificationResponse>, AxiosError>({
    queryKey: ['useGetNotifications', params],
    queryFn: () =>
      params && params.title
        ? apiRequest.get(API_URL.NOTIFICATIONS__SEARCH, { params })
        : apiRequest.get(API_URL.NOTIFICATIONS, { params }),
    refetchOnWindowFocus: false,
  });
};

export const useCreateNotifications = () => {
  return useMutation<AxiosResponse<boolean>, AxiosError, FormData>({
    mutationKey: 'useCreateNotifications',
    mutationFn: (data) => apiRequest.postFormData(API_URL.NOTIFICATIONS, data),
  });
};

export const useDeleteNotifications = () => {
  return useMutation<AxiosResponse<boolean>, AxiosError, number[]>({
    mutationKey: 'useDeleteNotifications',
    mutationFn: (deleteNotificationIds) =>
      apiRequest.delete(API_URL.NOTIFICATIONS, {
        data: { ids: deleteNotificationIds },
      }),
  });
};
