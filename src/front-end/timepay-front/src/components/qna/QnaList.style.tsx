import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';
import '../../styles/fonts/pretendard/pretendard.css';

export const cssQnaListStyle = css`
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  align-items: center;
  padding: 20px;

  background-color: ${COMMON_COLOR.WHITE};
  .qnaStatus {
    font-size: 20px;
    font-weight: 600;
    margin-right: 15px;
    border-radius: 30px;
  }
  .qnaCategory {
    font-weight: 600;
    margin-right: 15px;
    font-size: 18px;
    border-radius: 5px;
    padding: 5px;
    color: ${COMMON_COLOR.FONT2};
  }
  .qnaTitle {
    font-size: 18px;
    font-weight: 500;
  }
`;

export const cssLineStyle = css`
  border-top: 0.9px solid ${COMMON_COLOR.FONT1};
  background-color: black;
`;
