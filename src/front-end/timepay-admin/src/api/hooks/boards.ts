import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import {
  IGetBoardRequest,
  IGetBoardResponse,
  IPostBoardStatus,
} from '../interfaces/IBoard';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const useGetBoards = (params?: IGetBoardRequest) => {
  return useQuery<AxiosResponse<IGetBoardResponse>, AxiosError>({
    queryKey: ['useGetBoards', params],
    queryFn: () =>
      apiRequest.get(API_URL.BOARDS__SEARCH, {
        params: {
          ...params,
          [params?.authorSearchKeyword as string]: params?.authorSearchValue,
          authorSearchKeyword: null,
          authorSearchValue: null,
        },
      }),
    refetchOnWindowFocus: false,
  });
};

export const usePostBoardHidden = () => {
  return useMutation<AxiosResponse<boolean>, AxiosError, number[]>({
    mutationKey: 'usePostBoardHidden',
    mutationFn: (data: number[]) =>
      apiRequest.post(API_URL.BOARDS__HIDDEN, { ids: data }),
  });
};

export const usePostBoardStatus = () => {
  return useMutation<AxiosResponse<boolean>, AxiosError, IPostBoardStatus>({
    mutationKey: 'usePostBoardStatus',
    mutationFn: (data) => apiRequest.post(API_URL.BOARDS__STATUS, data),
  });
};
