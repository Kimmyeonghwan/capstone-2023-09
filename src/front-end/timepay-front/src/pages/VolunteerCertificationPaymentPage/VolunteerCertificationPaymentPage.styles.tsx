import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssVolunteerCertificationPaymentPageStyle = css`
  padding: 20px;
  .ant-table {
    font-size: 16px;
    width: 100%;
    .ant-table-cell {
      word-break: keep-all;
    }
  }
  .ant-btn-link {
    padding: 0;
    height: max-content;
    color: ${COMMON_COLOR.MAIN2};
    font-weight: bold;
    font-size: 16px;
    span {
      text-decoration: underline;
    }
    border-radius: 0;
  }
  .ant-spin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const cssVolunteerOverviewStyle = css`
  display: flex;
  flex-direction: column;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: ${COMMON_COLOR.FONT2};
  .header {
    color: ${COMMON_COLOR.MAIN1};
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 15px;
    padding-bottom: 13px;
  }
  .title {
    color: ${COMMON_COLOR.BLACK};
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 15px;
    padding-bottom: 13px;
  }
`;

export const cssVolunteerUserInfoStyle = css`
  display: flex;
  flex-direction: column;
  color: ${COMMON_COLOR.FONT2};
  font-size: 14px;
  .name {
    color: ${COMMON_COLOR.BLACK};
    font-weight: 700;
    font-size: 16px;
  }
`;
