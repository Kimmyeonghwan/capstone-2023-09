import { atom } from 'recoil';

export const headerTitleState = atom<string | null>({
  key: 'header-title',
  default: null,
});

export const fontSizeState = atom<'big' | 'small'>({
  key: 'font-size',
  default: 'small',
});

export const searchDrawerOpenState = atom<boolean>({
  key: 'search-drawer-open',
  default: false,
});

export const pathToAfterLogin = atom<string | undefined>({
  key: 'path-after-login',
  default: undefined,
});
