import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssLinkAgencyBtnStyle = css`
  span {
    color: ${COMMON_COLOR.FONT2};
    text-decoration: underline;
  }
  position: absolute;
  right: 10px;
  top: 5px;
  right: 5px;
`;

/*수직 수평 중앙 정렬*/
export const topWrapperCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const cssTopText = css`
  font-size: 20px;
  font-weight: bold;
`;

export const cssMiddleText = css`
  font-size: 25px;
  font-weight: bold;
`;

export const cssLogo = css`
  margin-top: 30px;
  //width: 150px;
`;

export const cssBottomText = css`
  font-size: 20px;
  font-weight: bold;
`;

export const cssKakaoLoginBtn = css`
  margin-top: 30px;
`;
