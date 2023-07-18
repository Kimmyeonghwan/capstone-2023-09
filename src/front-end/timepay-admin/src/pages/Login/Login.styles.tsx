import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssLoginOuterBox = css`
  margin: 0 auto;
`;

export const cssLoginButtonStyle = css`
  width: 150px;
  height: 40px;
  background: ${COMMON_COLOR.LOGO1};
`;

export const cssLoginInnerBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
