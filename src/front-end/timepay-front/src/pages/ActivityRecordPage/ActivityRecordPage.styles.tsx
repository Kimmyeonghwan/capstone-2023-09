import { css } from '@emotion/react';

export const cssActivityRecordPageStyle = (scaleValue: number) => css`
  .ant-pagination {
    text-align: center;
    font-size: calc(14px * ${scaleValue});
  }
`;

export const cssHorizontalForm = (scaleValue: number) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: calc(5px * ${scaleValue});
  padding: 5px;
  font-size: calc(14px * ${scaleValue});
  justify-content: space-between;
  .ant-select {
    width: 125px;
    .ant-select-selector {
      font-size: calc(14px * ${scaleValue});
    }
    padding-right: 5px;
  }
`;

export const cssNothingStyle = (scaleValue: number) => css`
  display: flex;
  flex-direction: column;
  .emoji {
    font-size: calc(25px * ${scaleValue});
  }
  font-size: calc(14px * ${scaleValue});
  text-align: center !important;
  padding: 200px 0;
  width: 100%;
`;

export const cssSpinStyle = css`
  text-align: center !important;
  padding-top: 280px !important;
  width: 100%;
`;
