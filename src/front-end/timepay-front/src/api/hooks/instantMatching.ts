import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { IPostInstantMatchingRequest } from '../interfaces/IInstantMatching';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const usePostInstantMatching = () => {
  return useMutation<
    AxiosResponse<{
      deal_board_id?: number;
      status?: string;
      success: boolean;
    }>,
    AxiosError,
    IPostInstantMatchingRequest
  >({
    mutationKey: 'usePostInstantMatching',
    mutationFn: (data: IPostInstantMatchingRequest) =>
      apiRequest.post(API_URL.INSTANT_MATCHING, data),
  });
};
