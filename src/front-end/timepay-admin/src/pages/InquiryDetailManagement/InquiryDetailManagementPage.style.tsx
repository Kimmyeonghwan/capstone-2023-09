import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssInquiryDetailManagementPageStyle = css`
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
  .answerBtn {
    background-color: ${COMMON_COLOR.MAIN1};
  }
`;
