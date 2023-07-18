import { atom } from 'recoil';
import { IGetUserInfoRequest } from '../../api/interfaces/IUser';

export const mainSearchState = atom<IGetUserInfoRequest>({
  key: 'user-search',
  default: {
    userId: undefined,
    query: 'name',
    value: undefined,
    pagingIndex: 0,
    pagingSize: 10,
  },
});
