import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';
import '../../styles/fonts/pretendard/pretendard.css';

export const cssCategorySelect = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const cssMainHeaderBlank = css`
  width: 100%;
  height: 80px;
`;
export const cssCategorySelectText = css`
  text-align: center;
  color: ${COMMON_COLOR.MAIN2};
  font-size: 20px;
  font-weight: 700;
  h3 {
    margin-bottom: 20px;
  }
  h6 {
    font-weight: 500;
    font-size: 17px;
    color: ${COMMON_COLOR.FONT3};
    line-height: 25px;
    margin-bottom: 30px;
  }
`;
export const cssCategorySelectContent = css`
  border: 1px solid ${COMMON_COLOR.FONT4};
  border-radius: 5px;
  padding: 15px;
`;
export const cssCategoryListStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 290px;
  .ant-btn {
    width: 140px;
    height: 56px;
    letter-spacing: 1px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    border: 1.5px solid ${COMMON_COLOR.FONT1};
    color: ${COMMON_COLOR.FONT2};
  }
`;
export const cssCategorySelectButton = css`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  .choice {
    width: 140px;
    height: 40px;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 1.3px;
    color: ${COMMON_COLOR.WHITE};
    background-color: ${COMMON_COLOR.MAIN2};
    border: none;
  }
  .later {
    margin-top: 5px;
    font-size: 15px;
    font-weight: 500;
    border: none;
    color: ${COMMON_COLOR.FONT2};
    :hover {
      border: none;
    }
  }
`;
