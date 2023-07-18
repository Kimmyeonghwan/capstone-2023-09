import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { IAgencyLoginRequest } from '../interfaces/IAgency';
import { GetPageableData } from '../interfaces/ICommon';
import { IGetDonationBoardsResponse } from '../interfaces/IDonation';
import { IGetMyPageCertificateResponse } from '../interfaces/IVolunteer';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const usePostAgencyLogin = () => {
  return useMutation<AxiosResponse<any>, AxiosError, IAgencyLoginRequest>({
    mutationKey: 'usePostAgencyLogin',
    mutationFn: (data) =>
      apiRequest.post(API_URL.ORGANIZATIONS_LOGIN, { ...data }),
  });
};

export const useAgencyLogout = () => {
  return useMutation<AxiosResponse<any>, AxiosError, any>({
    mutationKey: 'useAgencyLogout',
    mutationFn: () => apiRequest.post(API_URL.ORGANIZATIONS_LOGOUT),
  });
};

export const usePostAgencyRegister = () => {
  return useMutation<AxiosResponse<any>, AxiosError, FormData>({
    mutationKey: 'usePostAgencyRegister',
    mutationFn: (data) =>
      apiRequest.postFormData(API_URL.ORGANIZATIONS_REGISTER, data),
  });
};

export const usePatchAgencyUpdate = () => {
  return useMutation<AxiosResponse<any>, AxiosError, FormData>({
    mutationKey: 'usePatchAgencyUpdate',
    mutationFn: (data) =>
      apiRequest.patchFormData(API_URL.ORGANIZATIONS_EDIT, data),
  });
};

export const useDeleteAgency = () => {
  return useMutation<AxiosResponse<any>, AxiosError>({
    mutationKey: 'useDeleteAgency',
    mutationFn: () => apiRequest.delete(API_URL.ORGANIZATIONS_DELETE),
  });
};

export const useGetMyPageCertificate = (boardId?: number) => {
  return useQuery<AxiosResponse<IGetMyPageCertificateResponse>, AxiosError>({
    queryKey: ['useGetQueryMyPageCertificate', boardId],
    queryFn: () =>
      apiRequest.get(API_URL.ORGANIZATION__MY_PAGE__CERTIFICATE, {
        params: { boardId },
      }),
    refetchOnWindowFocus: false,
    retry: false, // api 호출 실패해도 계속 호출하지 않음
    onError: (err: any) => {
      console.log('[ERROR] useGetQueryMyPageCertificate:', err);
    },
    enabled: !!boardId && !isNaN(Number(boardId)),
  });
};

export const usePostQueryMyPageCertificatePublish = () => {
  return useMutation<AxiosResponse<any>, AxiosError, FormData>({
    mutationKey: 'usePostQueryMyPageCertificatePublish',
    mutationFn: (data) =>
      apiRequest.postFormData(API_URL.ORGANIZATION__MY_PAGE__PUBLISH, data),
  });
};

export const useGetMyDonateBoard = (params: GetPageableData) => {
  return useQuery<AxiosResponse<IGetDonationBoardsResponse>, AxiosError>({
    queryKey: ['useGetMyDonateBoard', params],
    queryFn: () =>
      apiRequest.get(API_URL.ORGANIZATION_DONATE_MY_PAGE, {
        params: { ...params },
      }),
    refetchOnWindowFocus: false,
    retry: false, // api 호출 실패해도 계속 호출하지 않음
    onError: (err: any) => {
      console.log('[ERROR] useGetQueryMyPageCertificate:', err);
    },
  });
};
