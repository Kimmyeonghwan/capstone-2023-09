import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssAgencyEditPageStyle = css`
  padding: 10px 40px;
  .ant-form-item-extra {
    color: ${COMMON_COLOR.MAIN2} !important;
  }
  .ant-upload-picture-circle-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .submit-btn {
    margin-top: 30px;
    width: 100%;
    height: 55px;
    background-color: ${COMMON_COLOR.MAIN1};
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 20px;
  }
`;
