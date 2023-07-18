import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssFloating = css`
  float: right;
  width: 100%;
  .ant-btn {
    width: 60px;
    height: 60px;
    position: fixed;
    right: 16px;
    bottom: 94px;
  }
`;

export const cssMainFooterStyle = css`
  position: fixed;
  bottom: 0;

  background: ${COMMON_COLOR.WHITE};
  width: 100%;
  height: 80px;
  padding: 0 10px;
  padding-top: 11px;
  padding-bottom: 13px;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
  box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.05);

  span {
    font-size: 30px;
  }
  a {
    width: 100%;
    height: 100%;
  }
  .ant-btn {
    padding: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 0.5px solid ${COMMON_COLOR.WHITE};
    color: ${COMMON_COLOR.FONT2};
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: none;
  }

  .active {
    .ant-btn {
      color: ${COMMON_COLOR.MAIN1};
      border: 0.5px solid ${COMMON_COLOR.MAIN1};
    }
  }
`;

export const cssPlusPostBtnStyle = css`
  min-width: 54px;
  background-color: ${COMMON_COLOR.MAIN1};

  color: ${COMMON_COLOR.WHITE} !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const cssHomeBtnStyle = css`
  min-width: 54px;
  background-color: ${COMMON_COLOR.MAIN1};
  color: ${COMMON_COLOR.WHITE} !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 54px !important;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
`;
