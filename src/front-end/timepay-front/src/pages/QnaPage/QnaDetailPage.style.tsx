import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';
import '../../styles/fonts/pretendard/pretendard.css';

export const cssQnaDeleteStyle = css`
  text-align: right;
  margin-bottom: 15px;
`;
export const cssDeleteBtnStyle = css`
  letter-spacing: 2px;
  font-weight: 500;
`;

export const cssQnaDetailStyle = css`
  margin-top: 90px;
  margin-left: 20px;
  margin-right: 20px;
  p {
    text-align: right;
    font-size: 17px;
    padding: 0;
    margin: 0;
  }
  h2 {
    font-size: 24px;
    font-weight: 500;
  }
  h6 {
    margin: 0;
    padding: 0;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 19px;
    font-weight: 400;
  }
`;

export const cssQnaDetail2Style = css`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  h1 {
    margin: 0;
    padding: 0;
    margin-top: 5px;
    font-size: 21px;
    font-weight: 700;
  }
  h5 {
    margin: 0;
    padding: 0;
    margin-top: 7px;
    margin-left: 10px;
    font-size: 18px;
    font-weight: 500;
  }
`;

export const cssLine2Style = css`
  border-top: 1px solid ${COMMON_COLOR.FONT1};
  margin-top: 10px;
`;
