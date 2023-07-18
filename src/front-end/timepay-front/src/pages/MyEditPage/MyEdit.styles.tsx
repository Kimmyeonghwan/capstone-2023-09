import { css } from '@emotion/react';

/*수직 수평 중앙 정렬*/
export const topWrapperCSS = (scaleValue: number) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10%;
  label {
    font-size: calc(14px * ${scaleValue}) !important;
  }
  .ant-col {
    font-size: calc(14px * ${scaleValue});
  }
  input {
    font-size: calc(14px * ${scaleValue});
  }
  .ant-select-selector {
    font-size: calc(14px * ${scaleValue});
  }
  .ant-btn {
    font-size: calc(17px * ${scaleValue});
    height: max-content;
  }
`;

export const cssMyEditSubmitBtn = css`
  font-size: 17px;
  width: 180px;
  height: 35px;
  margin-bottom: 40px;
`;

export const cssMyEditCenter = css`
  text-align: center;
`;

export const cssMyEditMargin = css`
  margin-top: 20px;
`;
