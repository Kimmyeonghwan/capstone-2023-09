import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssCommentSearchFormStyle = css`
  padding: 10px;
  border: 1px solid ${COMMON_COLOR.SILVER_GRAY};
  border-radius: 5px;
  width: 100%;
  .ant-form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
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
    max-width: 250px;
  }
  .ant-input-number {
    width: 100%;
    max-width: 150px;
  }
  .ant-btn {
    width: 100%;
    max-width: 100px;
    background-color: ${COMMON_COLOR.FONT3};
  }
`;
