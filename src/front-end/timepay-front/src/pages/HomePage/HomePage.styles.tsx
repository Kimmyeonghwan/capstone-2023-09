import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';
export const cssBox = css`
  .ant-btn {
    position: fixed;
    z-index: 200;
    background-color: ${COMMON_COLOR.AGENT_RED};
  }
`;

export const cssHomePageStyle = (scaleValue: number) => css`
  display: flex;
  flex-direction: column;
  .title-search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(30px * ${scaleValue});
    background-color: ${COMMON_COLOR.LOGO1};
    padding-top: 100px;
    padding-bottom: calc(36px * ${scaleValue});
    .title-search {
      display: flex;
      flex-direction: row;
      gap: calc(5px * ${scaleValue});
      .ant-btn {
        border-color: ${COMMON_COLOR.WHITE};
        color: ${COMMON_COLOR.WHITE};
        font-style: normal;
        font-weight: 700;
        font-size: calc(18px * ${scaleValue});
        height: calc(32px * ${scaleValue});
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .ant-input {
        width: 172px;
        font-size: calc(14px * ${scaleValue}) !important;
      }
    }
  }
  .category-search-container {
    padding-top: calc(45px * ${scaleValue});
    padding-bottom: calc(22px * ${scaleValue});
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(20px * ${scaleValue});

    font-style: normal;
    font-weight: 700;
    font-size: calc(18px * ${scaleValue});
    line-height: calc(15px * ${scaleValue});
    color: ${COMMON_COLOR.FONT3};
  }
  .info-container {
    font-style: normal;
    font-weight: 700;
    font-size: calc(14px * ${scaleValue});
    line-height: calc(20px * ${scaleValue});
    color: #c1c1c1;
    width: 290px;
    margin: auto;
    word-break: keep-all;
    padding-bottom: calc(20px * ${scaleValue});
  }
`;

export const cssCategoryListStyle = (scaleValue: number) => css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 290px;
  .ant-btn {
    width: 140px;
    height: calc(56px * ${scaleValue});
    font-style: normal;
    font-weight: 400;
    font-size: calc(15px * ${scaleValue});
    line-height: 20px;
    color: ${COMMON_COLOR.FONT2};
  }
`;
