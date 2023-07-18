import { css } from '@emotion/react';

export const cssInstantActivityQRModalStyle = (scaleValue: number) => css`
  .ant-modal-title {
    font-size: calc(16px * ${scaleValue});
  }
  .ant-modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    word-break: keep-all;
    font-size: calc(14px * ${scaleValue});
  }
  .ant-modal-footer {
    .ant-btn {
      font-size: calc(14px * ${scaleValue});
      height: max-content;
    }
  }
`;
