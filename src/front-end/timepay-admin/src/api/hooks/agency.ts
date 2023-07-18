import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { IGetAgenciesResponse, IGetAgencyRequest } from '../interfaces/IAgency';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const useGetAgencies = (params?: IGetAgencyRequest) => {
  return useQuery<AxiosResponse<IGetAgenciesResponse>, AxiosError>({
    queryKey: ['useGetAgencies', params],
    queryFn: () =>
      params && (params.value || params.volunteer)
        ? apiRequest.get(API_URL.ORGANIZATION_SEARCH, { params })
        : apiRequest.get(API_URL.ORGANIZATION_MAIN, { params }),
    refetchOnWindowFocus: false,
  });
};

export const usePatchAgencyAuthority = () => {
  return useMutation<AxiosResponse<boolean>, AxiosError, number>({
    mutationKey: 'usePatchAgencyAuthority',
    mutationFn: (data: number) =>
      apiRequest.patch(`${API_URL.ORGANIZATION_AUTHORITY}?userId=${data}`),
  });
};

export const usePatchAgencyPenalty = () => {
  return useMutation<AxiosResponse<boolean>, AxiosError, number>({
    mutationKey: 'usePatchAgencyPenalty',
    mutationFn: (data) =>
      apiRequest.patch(`${API_URL.ORGANIZATION_PENALTY}?userId=${data}`),
  });
};
