import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssQnASearchFormStyle = css`
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid ${COMMON_COLOR.SILVER_GRAY};
  border-radius: 5px;
  width: 100%;
  .ant-form {
    display: flex;
    flex-direction: column;
  }
  .ant-row {
    width: 100%;
    gap: 10px;
  }
  .ant-select {
    width: 100%;
    max-width: 120px;
  }
  .ant-input {
    width: 100%;
    max-width: 300px;
  }
  .ant-input-number {
    width: 100%;
    max-width: 150px;
  }
  .ant-btn {
    width: 100%;
    max-width: 100px;
    background-color: ${COMMON_COLOR.MAIN1};
  }
`;
