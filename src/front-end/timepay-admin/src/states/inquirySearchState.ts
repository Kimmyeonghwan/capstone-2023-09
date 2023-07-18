import { atom } from 'recoil';
import { IGetInquiryRequest } from '../api/interfaces/IInquiry';

export const inquirySearchState = atom<IGetInquiryRequest>({
  key: 'inquiry-search',
  default: {
    state: '답변대기',
    category: '',
    title: undefined,
    writer: undefined,
    pagingIndex: 0,
    pagingSize: 10,
  },
});
