import { atom } from 'recoil';
import { IGetNotificationRequest } from '../api/interfaces/INotification';

export const pushSearchState = atom<IGetNotificationRequest>({
  key: 'push-search',
  default: { title: undefined, pagingIndex: 0, pagingSize: 10 },
});
