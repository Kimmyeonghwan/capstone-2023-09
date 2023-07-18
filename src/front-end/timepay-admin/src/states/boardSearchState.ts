import { atom } from 'recoil';
import { IGetBoardRequest } from '../api/interfaces/IBoard';

export const boardSearchState = atom<IGetBoardRequest>({
  key: 'board-search',
  default: {
    title: undefined,
    author: undefined,
    type: undefined,
    category: undefined,
    sortType: undefined,
    startTime: undefined,
    endTime: undefined,
    volunteer: undefined,
    pagingIndex: 0,
    pagingSize: 10,
    authorSearchKeyword: 'author',
    authorSearchValue: undefined,
  },
});
