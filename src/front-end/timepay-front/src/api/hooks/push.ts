import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { GetPageableData } from '../interfaces/ICommon';
import { IGetNotificationResponse } from '../interfaces/IPush';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const useGetNotifications = (params: GetPageableData) => {
  return useQuery<AxiosResponse<IGetNotificationResponse>, AxiosError>({
    queryKey: ['useGetNotifications'],
    queryFn: () => apiRequest.get(API_URL.NOTIFICATIONS, { params: params }),
    refetchOnWindowFocus: false,
  });
};

export const usePutNotificationViewed = () => {
  return useMutation<AxiosResponse<any>, AxiosError, number>({
    mutationKey: 'usePutNotificationViewed',
    mutationFn: (notificationId: number) =>
      apiRequest.put(`${API_URL.NOTIFICATIONS}/${notificationId}`),
  });
};
