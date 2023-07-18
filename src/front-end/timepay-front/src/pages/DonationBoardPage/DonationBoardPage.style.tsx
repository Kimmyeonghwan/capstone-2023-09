import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssDonationBoardPageStyle = (scaleValue: number) => css`
  padding: 20px;
  .board-header {
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    .default {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
    .mine {
      display: flex;
      flex-direction: row;
      gap: 5px;
      .ant-btn {
        font-size: calc(12px * ${scaleValue});
        padding: 4px 10px;
      }
    }
  }
  .title-container {
    font-size: calc(20px * ${scaleValue});
    font-weight: 700;
    padding: 10px 0;
  }
  .donation-info-container {
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${COMMON_COLOR.FONT2};
    font-size: calc(14px * ${scaleValue});
  }
  .organization-info-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    margin-bottom: 10px;
    gap: 5px;
    padding-right: 10px;
    font-size: calc(16px * ${scaleValue});
    img {
      width: calc(25px * ${scaleValue});
      height: calc(25px * ${scaleValue});
      border-radius: 20px;
    }
  }
  .ant-progress {
    font-size: calc(12px * ${scaleValue});
  }
  .content-container {
    border: 1px solid ${COMMON_COLOR.FONT1};
    padding: calc(15px * ${scaleValue});
    min-height: 400px;
    margin-bottom: 40px;
    word-break: break-all;
    font-size: calc(14px * ${scaleValue});
  }
  .ant-btn {
    width: 100%;
    font-size: calc(16px * ${scaleValue});
    font-weight: 700;
    height: max-content;
  }
`;
