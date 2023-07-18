import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { apiRequest } from '../request';
import { API_URL } from '../urls';
import { IGetAgentResponse, IPostAgentRequest } from '../interfaces/IAgent';

export const useGetAgent = () => {
  return useQuery<AxiosResponse<IGetAgentResponse>, AxiosError>({
    queryKey: ['useGetAgent'],
    queryFn: () => apiRequest.get(API_URL.AGENT, {}),
    refetchOnWindowFocus: false,
    retry: false,
    onError: (err: any) => {
      console.log('[ERROR] useGetAgent:', err);
    },
  });
};

export const usePostAgentRegister = () => {
  return useMutation<AxiosResponse<any>, AxiosError, any>({
    mutationKey: 'usePostAgentRegister',
    mutationFn: (data: IPostAgentRequest) =>
      apiRequest.post(API_URL.AGENT__REGISTER, { uid: data.uid }),
  });
};

export const useDeleteAgent = () => {
  return useMutation<AxiosResponse<any>, AxiosError, any>({
    mutationKey: 'useDeleteAgent',
    mutationFn: () => apiRequest.delete(API_URL.AGENT__DELETE),
  });
};
