import { Modal } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import {
  IGetCommentRequest,
  IGetCommentResponse,
  IPatchCommentRequest,
} from '../interfaces/IComment';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const useGetComments = (params?: IGetCommentRequest) => {
  return useQuery<AxiosResponse<IGetCommentResponse>, AxiosError>({
    queryKey: ['useGetComments', params],
    queryFn: () =>
      params && (params.value || params.boardId)
        ? apiRequest.get(API_URL.COMMENTS__SEARCH, {
            params: {
              ...params,
              boardId: null,
              query: params.boardId ? 'boardId' : params.query,
              value: params.boardId || params.value,
            },
          })
        : apiRequest.get(API_URL.COMMENTS, {
            params: {
              ...params,
              query: null,
              value: null,
              boardId: null,
            },
          }),
    refetchOnWindowFocus: false,
    retry: false, // api 호출 실패해도 계속 호출하지 않음
    onError: (err: any) => {
      console.log('[ERROR] useGetComments:', err);
      Modal.error({
        type: 'error',
        content: '에러가 발생했습니다.',
      });
    },
  });
};

export const usePatchComment = () => {
  return useMutation<AxiosResponse<string>, AxiosError, IPatchCommentRequest>({
    mutationKey: 'usePatchComment',
    mutationFn: (data) =>
      apiRequest.patch(API_URL.COMMENTS__HIDE, {
        ...data,
      }),
  });
};
