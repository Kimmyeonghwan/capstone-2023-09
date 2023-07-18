import { atom } from 'recoil';
import { IGetReportRequest } from '../api/interfaces/IReport';

export const reportSearchState = atom<IGetReportRequest>({
  key: 'report-search',
  default: {
    searchLabel: undefined,
    searchValue: undefined,
    reportId: undefined,
    reporterName: undefined,
    reason: undefined,
    startTime: undefined,
    endTime: undefined,
    query: '',
    value: undefined,
    pagingIndex: 0,
    pagingSize: 10,
  },
});
