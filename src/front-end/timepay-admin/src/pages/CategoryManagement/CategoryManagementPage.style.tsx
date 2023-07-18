import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';
import '../../styles/fonts/pretendard/pretendard.css';

export const cssCategoryManagementTitle = css`
  margin: 10px;
  .ant-card-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .control-box {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: 10px;
    }
  }
`;
