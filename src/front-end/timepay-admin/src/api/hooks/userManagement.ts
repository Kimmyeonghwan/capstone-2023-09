import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { apiRequest } from '../request';
import { API_URL } from '../urls';
import { IGetUserInfoRequest, IGetUserInfoResponse } from '../interfaces/IUser';

export const useGetUserInfos = (params?: IGetUserInfoRequest) => {
  return useQuery<AxiosResponse<IGetUserInfoResponse>, AxiosError>({
    queryKey: ['useGetUserInfos', params],
    queryFn: () =>
      params && (params.value || params.userId)
        ? apiRequest.get(API_URL.USERINFOS__SEARCH, {
            params: {
              ...params,

              query: params.userId ? 'userId' : params.query,
              value: params.userId || params.value,
            },
          })
        : apiRequest.get(API_URL.USERINFOS, {
            params: {
              ...params,
              userId: null,
              query: null,
              value: null,
            },
          }),
    refetchOnWindowFocus: false,
  });
};
