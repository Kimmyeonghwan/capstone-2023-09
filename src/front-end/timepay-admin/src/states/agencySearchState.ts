import { atom } from 'recoil';
import { IGetAgencyRequest } from '../api/interfaces/IAgency';

export const agencySearchState = atom<IGetAgencyRequest>({
  key: 'agency-search',
  default: {
    pagingIndex: 0,
    pagingSize: 10,
    volunteer: 'n',
    volunteerCheck: false,
    query: undefined,
    queryValue: 'business',
  },
});
