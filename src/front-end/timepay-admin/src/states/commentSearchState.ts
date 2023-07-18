import { atom } from 'recoil';
import { IGetCommentRequest } from '../api/interfaces/IComment';

export const commentSearchState = atom<IGetCommentRequest>({
  key: 'comment-search',
  default: {
    boardId: undefined,
    query: 'name',
    value: undefined,
    pagingIndex: 0,
    pagingSize: 10,
  },
});
