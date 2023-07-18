import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import {
  IPostFreeBoard,
  IGetFreeBoard,
  IGetDealBoard,
} from '../interfaces/IPost';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const useGetFreeBoards = () => {
  return useQuery<AxiosResponse<IGetFreeBoard>, AxiosError>({
    queryKey: ['useGetFreeBoards'],
    queryFn: () => apiRequest.get(API_URL.FREE_BOARDS),
    refetchOnWindowFocus: false,
  });
};

// 같이 쓰기
export const useCreateFreeBoards = () => {
  return useMutation<AxiosResponse<any>, AxiosError, FormData>({
    mutationKey: 'usePostFreeBoards',
    mutationFn: (data) =>
      apiRequest.postFormData(API_URL.FREE_BOARDS_WRITE, data),
  });
};

export const useGetDealBoards = () => {
  return useQuery<AxiosResponse<IGetDealBoard>, AxiosError>({
    queryKey: ['useGetDealBoards'],
    queryFn: () => apiRequest.get(API_URL.DEAL_BOARDS),
    refetchOnWindowFocus: false,
  });
};
// 도움 주기
export const useCreateDealBoards = () => {
  return useMutation<AxiosResponse<any>, AxiosError, FormData>({
    mutationKey: 'usePostDealBoards',
    mutationFn: (data) =>
      apiRequest.postFormData(API_URL.DEAL_BOARDS_WRITE, data),
  });
};
