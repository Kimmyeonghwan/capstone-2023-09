import { AxiosError, AxiosResponse } from 'axios';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/paths';
import {
  IDonationBoard,
  IGetDonationBoardsResponse,
  IPostDonateTimepayRequest,
  IPostDonationBoardWriteRequest,
  IPostDonationBoardWriteResponse,
  IPutDonationBoardEditRequest,
} from '../interfaces/IDonation';
import { IGetSearchBoardRequest } from '../interfaces/IPost';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const usePostDonationBoardWrite = () => {
  return useMutation<
    AxiosResponse<IPostDonationBoardWriteResponse>,
    AxiosError,
    IPostDonationBoardWriteRequest
  >({
    mutationKey: 'usePostDonationBoardWrite',
    mutationFn: (data: IPostDonationBoardWriteRequest) =>
      apiRequest.post(API_URL.DONATION_WRITE, data),
  });
};

export const useInfiniteGetDonationBoards = (
  params: IGetSearchBoardRequest,
) => {
  const navigate = useNavigate();
  return useInfiniteQuery<
    AxiosResponse<IGetDonationBoardsResponse>,
    AxiosError
  >({
    queryKey: ['useGetDonationBoards', params.pagingIndex, params.pagingSize],
    queryFn: ({ pageParam = 0 }) =>
      apiRequest.get(API_URL.DONATE_BOARDS, {
        params: { pagingSize: 10, pagingIndex: pageParam },
      }),
    refetchOnWindowFocus: false,
    retry: false, // api 호출 실패해도 계속 호출하지 않음
    onError: (err: any) => {
      console.log('[ERROR] useGetDonationBoardWithId', err);
      navigate(PATH.HOME);
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
    enabled: params.type === 'event',
  });
};

export const useGetDonationBoardWithId = (boardId?: number) => {
  const navigate = useNavigate();
  return useQuery<AxiosResponse<IDonationBoard>, AxiosError>({
    queryKey: ['useGetDonationBoardWithId', boardId],
    queryFn: () => apiRequest.get(`${API_URL.DONATION_BOARD_ID}/${boardId}`),
    refetchOnWindowFocus: false,
    retry: false, // api 호출 실패해도 계속 호출하지 않음
    onError: (err: any) => {
      console.log('[ERROR] useGetDonationBoardWithId', err);
      navigate(PATH.HOME);
    },
  });
};

export const usePostDonateTimepay = () => {
  return useMutation<
    AxiosResponse<IPostDonationBoardWriteResponse>,
    AxiosError,
    IPostDonateTimepayRequest
  >({
    mutationKey: 'usePostDonateTimepay',
    mutationFn: (data: IPostDonateTimepayRequest) =>
      apiRequest.post(`${API_URL.DONATE_TIMEPAY}/${data.boardId}`, {
        donateTimePay: data.donateTimePay,
      }),
  });
};

export const usePutDonationBoardEdit = () => {
  return useMutation<
    AxiosResponse<any>,
    AxiosError,
    IPutDonationBoardEditRequest
  >({
    mutationKey: 'usePutDonationBoardEdit',
    mutationFn: (data: IPutDonationBoardEditRequest) =>
      apiRequest.put(
        `${API_URL.DONATION_BOARD_EDIT}/${data.boardId}`,
        data.board,
      ),
  });
};

export const useDeleteDonationBoard = () => {
  return useMutation<AxiosResponse<any>, AxiosError, number>({
    mutationKey: 'useDeleteDonationBoard',
    mutationFn: (boardId: number) =>
      apiRequest.delete(`${API_URL.DONATION_BOARD_DELETE}/${boardId}`),
  });
};
