import { atom } from 'recoil';
import { IAgency } from '../api/interfaces/IAgency';

// 개인 유저 타입 나중에 지정
export const userState = atom<object | null>({
  key: 'user',
  default: null,
});

// 기관 유저 상태
export const agencyState = atom<IAgency | null>({
  key: 'agency',
  default: null,
});
