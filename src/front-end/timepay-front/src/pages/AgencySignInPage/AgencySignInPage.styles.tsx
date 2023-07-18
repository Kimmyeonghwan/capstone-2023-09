import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssAgencySignInPaeStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  img {
    margin-top: 45px;
    margin-bottom: 60px;
    width: 182px;
    height: 177.93px;
  }
  .ant-typography {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
  }
  .ant-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 40px;
    .ant-btn {
      width: 130px;
      background-color: ${COMMON_COLOR.MAIN1};
      span {
        font-style: normal;
        font-weight: 300;
        font-size: 13px;
        line-height: 20px;
      }
    }
  }
  .ant-btn-link {
    span {
      color: ${COMMON_COLOR.BLACK};
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      text-decoration-line: underline;
    }
  }
`;

export const cssLinkNormalBtnStyle = css`
  span {
    font-size: 14px !important;
    color: ${COMMON_COLOR.FONT2} !important;
    text-decoration: underline;
  }
  position: absolute;
  top: 5px;
  left: 5px;
`;
