import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import {
  IGetCategoryRequest,
  IGetCategoryResponse,
} from '../interfaces/ICategory';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const useGetCategory = (params: IGetCategoryRequest) => {
  return useQuery<AxiosResponse<IGetCategoryResponse>, AxiosError>({
    queryKey: ['useGetCategory', params],
    queryFn: () => apiRequest.get(API_URL.USERS__CATEGORY, { params: params }),
    refetchOnWindowFocus: false,
    retry: false, // api 호출 실패해도 계속 호출하지 않음
    onError: (err: any) => {
      console.log('[ERROR] useGetCategory:', err);
    },
  });
};
