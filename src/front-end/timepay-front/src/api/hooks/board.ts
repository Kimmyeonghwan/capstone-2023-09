import { AxiosError, AxiosResponse } from 'axios';
import { useInfiniteQuery } from 'react-query';
import {
  IDeleteBoard,
  IGetSearchBoardRequest,
  IGetSearchBoardResponse,
  IReportBoard,
  IBoard,
  IPutBoardEditRequest,
} from '../interfaces/IPost';
import { apiRequest } from '../request';
import { API_URL } from '../urls';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/paths';

export const useInfiniteGetSearchBoard = (params: IGetSearchBoardRequest) => {
  return useInfiniteQuery<AxiosResponse<IGetSearchBoardResponse>, AxiosError>({
    queryKey: ['useGetSearchBoard', params],
    queryFn: ({ pageParam = 0 }) =>
      apiRequest.get(API_URL.DEAL_BOARDS__SEARCH, {
        params: { ...params, pagingIndex: pageParam },
      }),
    refetchOnWindowFocus: false,
    retry: false, // api 호출 실패해도 계속 호출하지 않음
    onError: (err: any) => {
      console.log('[ERROR] useGetSearchBoard:', err);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.totalPages - 1 === lastPage.data.pageable.pageNumber)
        return undefined;
      return lastPage.data.pageable.pageNumber + 1;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      if (firstPage.data.pageable.pageNumber === 0) return undefined;
      return firstPage.data.pageable.pageNumber - 1;
    },
    // 도움요청, 같이하기일 때만 허용
    enabled: !(params.type && params.type === 'event'),
  });
};

export const useGetBoard = (postPk: number) => {
  return useQuery<AxiosResponse<IBoard>, AxiosError>({
    queryKey: ['useGetBoard', postPk],
    queryFn: () => apiRequest.get(`${API_URL.DEAL_BOARDS}/${postPk}`),
    refetchOnWindowFocus: false,
  });
};

export const useGetBoardWithId = (postPk?: number) => {
  const navigate = useNavigate();
  return useQuery<AxiosResponse<IBoard>, AxiosError>({
    queryKey: ['useGetDonationBoardWithId', postPk],
    queryFn: () => apiRequest.get(`${API_URL.DEAL_BOARDS}/${postPk}`),
    refetchOnWindowFocus: false,
    retry: false, // api 호출 실패해도 계속 호출하지 않음
    onError: (err: any) => {
      console.log('[ERROR] useGetDonationBoardWithId', err);
      navigate(PATH.HOME);
    },
  });
};

export const usePutBoard = () => {
  return useMutation<AxiosResponse<any>, AxiosError, IPutBoardEditRequest>({
    mutationKey: 'usePutDonationBoardEdit',
    mutationFn: (data: IPutBoardEditRequest) =>
      apiRequest.put(
        `${API_URL.DEAL_BOARDS}/update/${data.boardId}`,
        data.board,
      ),
  });
};

export const useDeleteBoard = () => {
  return useMutation<AxiosResponse<IDeleteBoard>, AxiosError, string>({
    mutationKey: 'useDeleteBoard',
    mutationFn: (id) =>
      apiRequest.delete(`${API_URL.DEAL_BOARDS_DELETE}/${id}`),
  });
};

export const useCreateReports = () => {
  return useMutation<AxiosResponse<boolean>, AxiosError, IReportBoard>({
    mutationKey: 'useReports',
    mutationFn: (data) =>
      apiRequest.post(API_URL.FREE_BOARDS_WRITE, {
        ...data,
      }),
  });
};

export const usePutBoardStateFinish = () => {
  return useMutation<AxiosResponse<any>, AxiosError, number>({
    mutationKey: 'usePutBoardStateFinish',
    mutationFn: (boardId) =>
      apiRequest.put(`${API_URL.DEAL_BOARDS}/${boardId}/finish`),
  });
};

export const usePutBoardAdopt = () => {
  return useMutation<
    AxiosResponse<any>,
    AxiosError,
    { postPk: number; commentsId?: number[] }
  >({
    mutationKey: 'usePutBoardAdopt',
    mutationFn: (data) =>
      apiRequest.put(API_URL.DEAL_BOARDS_COMMENTS_ADOPTED(data.postPk), {
        commentsId: data.commentsId || [],
      }),
  });
};
