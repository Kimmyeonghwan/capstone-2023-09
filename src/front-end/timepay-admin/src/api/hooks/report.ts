import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { IGetReportResponse, IPatchReportRequest } from '../interfaces/IReport';
import { apiRequest } from '../request';
import { API_URL } from '../urls';

export const useGetReports = (params?: any) => {
  return useQuery<AxiosResponse<IGetReportResponse>, AxiosError>({
    queryKey: ['useGetReports', params],
    queryFn: () =>
      params && params.startTime && params.endTime
        ? apiRequest.get(API_URL.REPORTS__SEARCH, {
            params: {
              query: '',
              value: '',
              startDate: params.startTime.format('YYYY-MM-DD HH:mm:ss'),
              endDate: params.endTime.format('YYYY-MM-DD HH:mm:ss'),
            },
          })
        : params.reason
        ? apiRequest.get(API_URL.REPORTS__SEARCH, {
            params: {
              query: 'content',
              value: params.reason,
              searchLabel: null,
              searchValue: null,
            },
          })
        : params.reportId || params.reporterName
        ? apiRequest.get(API_URL.REPORTS__SEARCH, {
            params: {
              query: params.searchLabel,
              value:
                (params.reportId as string) ||
                params.reporterName ||
                params.reason,
              searchLabel: null,
              searchValue: null,
            },
          })
        : apiRequest.get(API_URL.REPORTS, { params }),
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const usePatchReport = () => {
  return useMutation<AxiosResponse<string>, AxiosError, IPatchReportRequest>({
    mutationKey: 'usePatchReport',
    mutationFn: (data) =>
      apiRequest.patch(API_URL.REPORTS__PENALTY, {
        ...data,
      }),
  });
};
