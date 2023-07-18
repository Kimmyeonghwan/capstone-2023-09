import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssPushTableStyle = css`
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

export const cssPushTableRowCountStyle = css`
  text-align: right;
`;
