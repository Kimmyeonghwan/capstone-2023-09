import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

/*수직 수평 중앙 정렬*/
export const topWrapperCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10%;
`;

export const cssJoinText = css`
  font-size: 30px;
  font-weight: bold;
`;

export const cssJoinMargin = css`
  margin-top: 10px;
`;

export const cssJoinProfileImg = css`
  text-align: center;
  margin-top: 30px;
`;

export const cssJoinSubmitBtnBox = css`
  text-align: center;
`;

export const cssJoinSubmitBtn = css`
  font-size: 17px;
  width: 180px;
  height: 35px;
  margin-bottom: 40px;
`;

export const cssJoinSelectBox = css`
  width: 100px;
`;

export const cssJoinNick = css`
  width: 100%;
`;

export const cssPolicyLinkStyle = css`
  color: ${COMMON_COLOR.FONT2};
  font-size: 16px;
  letter-spacing: 0.38px;
  margin-bottom: 15px;
  span {
    color: ${COMMON_COLOR.BLACK};
    text-decoration: underline;
    font-weight: 700;
    letter-spacing: 0.38px;
  }
`;
