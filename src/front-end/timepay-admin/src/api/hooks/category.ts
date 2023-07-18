import { useMutation, useQuery } from 'react-query';
import {
  IGetCategoryRequest,
  IGetCategoryResponse,
} from '../interfaces/ICategory';
import { AxiosError, AxiosResponse } from 'axios';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const useGetCategories = (params?: IGetCategoryRequest) => {
  return useQuery<AxiosResponse<IGetCategoryResponse>, AxiosError>({
    queryKey: ['useGetCategories', params],
    queryFn: () => apiRequest.get(API_URL.CATEGORIES, { params }),
    refetchOnWindowFocus: false,
  });
};

export const usePostCategories = () => {
  return useMutation<AxiosResponse<any>, AxiosError, any>({
    mutationKey: 'usePostCategories',
    mutationFn: (data) =>
      apiRequest.post(
        `${API_URL.CATEGORIES__CREATE}?categoryName=${data.categoryName}&boardType=${data.boardType}`,
        {},
      ),
  });
};

export const usePatchCategories = () => {
  return useMutation<AxiosResponse<string>, AxiosError, any>({
    mutationKey: 'usePatchCategories',
    mutationFn: (data) =>
      apiRequest.patch(
        `${API_URL.CATEGORIES__UPDATE}?categoryId=${data.categoryId}&query=${data.useYn}`,
        {},
      ),
  });
};
