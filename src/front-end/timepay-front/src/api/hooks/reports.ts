import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { IReportBoard } from '../interfaces/IPost';
import { apiRequest } from '../request';

export const useCreateReports = () => {
  return useMutation<
    AxiosResponse<boolean>,
    AxiosError,
    { real_id: number; body: IReportBoard }
  >({
    mutationKey: 'useReports',
    mutationFn: (data) =>
      apiRequest.post(`/api/deal-boards/${data.real_id}/report`, {
        ...data.body,
      }),
  });
};
