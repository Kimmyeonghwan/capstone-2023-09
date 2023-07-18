import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssPostTableStyle = css`
  width: 100%;
  .ant-table-cell {
    word-break: keep-all;
    .ant-btn {
      padding: 0;
      span {
        color: ${COMMON_COLOR.MAIN1};
        text-decoration: underline !important;
      }
    }
  }
`;

export const cssPostTableRowCountStyle = css`
  text-align: right;
`;
