import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { IComment, IPostComment } from '../interfaces/IComment';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const useGetComments = (postPk: number) => {
  return useQuery<AxiosResponse<IPostComment[]>, AxiosError>({
    queryKey: ['useGetComments', postPk],
    queryFn: () => apiRequest.get(`${API_URL.DEAL_BOARDS_COMMENT}/${postPk}`),
    refetchOnWindowFocus: false,
  });
};

export const useGetAppliedComment = (boardId: number) => {
  return useQuery<AxiosResponse<IPostComment[]>, AxiosError>({
    queryKey: ['useGetAppliedComment'],
    queryFn: () => apiRequest.get(API_URL.DEAL_BOARDS_COMMENT_APPLIED(boardId)),
    refetchOnWindowFocus: false,
    enabled: !!boardId,
  });
};

export const useCreateComment = (postPk: number) => {
  return useMutation<AxiosResponse<boolean>, AxiosError, IPostComment>({
    mutationKey: 'usePostComment',
    mutationFn: (data) =>
      apiRequest.post(`${API_URL.DEAL_BOARDS_COMMENT_WRITE}/${postPk}`, {
        ...data,
      }),
  });
};

export const useDeleteComment = () => {
  return useMutation<
    AxiosResponse<any>,
    AxiosError,
    { postPk: number; id: number }
  >({
    mutationKey: 'useDeleteComment',
    mutationFn: ({ postPk, id }: { postPk: number; id: number }) =>
      apiRequest.delete(
        `${API_URL.DEAL_BOARDS_COMMENT_DELETE}/${postPk}/${id}`,
      ),
  });
};
