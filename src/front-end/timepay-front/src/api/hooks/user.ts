import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { GetPageableData2 } from '../interfaces/ICommon';
import {
  IAgencyOrUser,
  IGetUserBoardRequest,
  IGetUserBoardResponse,
  IGetUserCommentRequest,
  IGetUserCommentResponse,
} from '../interfaces/IUser';
import { IGetMyCertificateResponse } from '../interfaces/IVolunteer';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const useLogout = () => {
  return useMutation<AxiosResponse<any>, AxiosError, any>({
    mutationKey: 'useLogout',
    mutationFn: () => apiRequest.post(API_URL.LOGOUT),
  });
};

export const useDelete = () => {
  return useMutation<AxiosResponse<any>, AxiosError>({
    mutationKey: 'useDelete',
    mutationFn: () => apiRequest.delete(API_URL.DELETE),
  });
};

export const useGetUserInfo = (userId?: number, enabled?: boolean) => {
  return useQuery<AxiosResponse<{ body: IAgencyOrUser }>, AxiosError>({
    queryKey: ['useGetUserInfo', userId],
    queryFn: () =>
      apiRequest.get(
        userId ? `${API_URL.USER_INFO_GET}${userId}` : API_URL.USER_INFO_GET,
      ),
    refetchOnWindowFocus: false,
    retry: false, // api 호출 실패해도 계속 호출하지 않음
    onError: (err: any) => {
      console.log('[ERROR] useGetUserInfo:', err);
    },
    enabled: enabled === undefined ? true : !!userId && enabled,
  });
};

export const useGetUserBoards = (
  params?: IGetUserBoardRequest,
  userId?: number,
  enabled?: boolean,
) => {
  return useQuery<AxiosResponse<{ body: IGetUserBoardResponse }>, AxiosError>({
    queryKey: ['useGetUserBoards', params, userId],
    queryFn: () =>
      apiRequest.get(
        userId
          ? `${API_URL.USER_INFO_GET}${userId}/board`
          : API_URL.API_USERS__MYPAGE__BOARD,
        { params: params },
      ),
    refetchOnWindowFocus: false,
    retry: false, // api 호출 실패해도 계속 호출하지 않음
    onError: (err: any) => {
      console.log('[ERROR] useGetUserBoards:', err);
    },
    enabled: enabled === undefined ? true : !!userId && enabled,
  });
};

export const useGetUserComments = (
  params?: IGetUserCommentRequest,
  userId?: number,
  enabled?: boolean,
) => {
  return useQuery<AxiosResponse<{ body: IGetUserCommentResponse }>, AxiosError>(
    {
      queryKey: ['useGetUserComments', params, userId],
      queryFn: () =>
        apiRequest.get(
          userId
            ? `${API_URL.USER_INFO_GET}${userId}/comment`
            : API_URL.API_USERS__MYPAGE__COMMENT,
          {
            params: params,
          },
        ),
      refetchOnWindowFocus: false,
      retry: false, // api 호출 실패해도 계속 호출하지 않음
      onError: (err: any) => {
        console.log('[ERROR] useGetUserComments:', err);
      },
      enabled: enabled === undefined ? true : !!userId && enabled,
    },
  );
};

export const useGetUserCertificate = (params: GetPageableData2) => {
  return useQuery<AxiosResponse<IGetMyCertificateResponse>, AxiosError>({
    queryKey: ['useGetUserCertificate'],
    queryFn: () =>
      apiRequest.get(API_URL.MY_CERTIFICATION, {
        params: params,
      }),
    refetchOnWindowFocus: false,
    retry: false, // api 호출 실패해도 계속 호출하지 않음
    onError: (err: any) => {
      console.log('[ERROR] useGetUserCertificate:', err);
    },
  });
};
