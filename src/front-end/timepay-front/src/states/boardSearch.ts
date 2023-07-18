import { atom } from 'recoil';
import { IGetSearchBoardRequest } from '../api/interfaces/IPost';

export const initialBoardSearchState = {
  pagingIndex: 0,
  pagingSize: 10,
  title: undefined,
  type: 'help',
  category: undefined,
  sortType: undefined,
  startDate: null,
  startTime: undefined,
  endDate: null,
  endTime: undefined,
  volunteer: undefined,
};

export const boardSearchState = atom<IGetSearchBoardRequest>({
  key: 'board-search',
  default: initialBoardSearchState,
});
