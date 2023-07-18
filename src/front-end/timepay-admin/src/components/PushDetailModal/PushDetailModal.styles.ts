import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssPushDetailModalStyle = css`
  .ant-modal-content {
    padding: 30px;
  }
  .ant-modal-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 20px;
  }

  .post-detail-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .post-detail-inner-container {
    border: 1px solid ${COMMON_COLOR.FONT1};
    border-radius: 5px;
    padding: 10px;
  }
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 15px;
  }
  img {
    width: 100%;
    height: auto;
  }
`;
