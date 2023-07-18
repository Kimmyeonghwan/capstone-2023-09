import { css } from '@emotion/react';

export const cssReportDetailModalStyle = css`
  .ant-modal-content {
    padding: 30px;
  }
  .ant-modal-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 20px;
  }

  .reportContent {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .reportInnerContent {
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding: 10px;
  }

  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 15px;
  }
`;
