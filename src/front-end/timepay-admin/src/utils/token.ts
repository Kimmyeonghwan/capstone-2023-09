import cookie from 'cookie';

export const TOKEN_NAME = 'token_admin';

export const getTokenFromCookie = () => {
  return cookie.parse(document.cookie)[TOKEN_NAME];
};

/** 토큰 값과 토큰 유효기간(1시간단위)을 저장하는 함수 */
export const setTokenToCookie = (value: string, exp: number) => {
  if (exp > 0) {
    const date = new Date();
    date.setTime(date.getTime() + exp * 1 * 60 * 60 * 1000);
    document.cookie = `${TOKEN_NAME}=${value};expires=${date.toUTCString()};path=/`;
  } else document.cookie = `${TOKEN_NAME}=${value};path=/`;
};
