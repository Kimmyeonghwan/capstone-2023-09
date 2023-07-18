import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';
import '../../styles/fonts/pretendard/pretendard.css';

export const cssPushManagementTitle = css`
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
    .createBtn {
      width: 100px;
      background-color: ${COMMON_COLOR.MAIN1};
    }
    .deleteBtn {
      width: 100px;
    }
  }
`;
