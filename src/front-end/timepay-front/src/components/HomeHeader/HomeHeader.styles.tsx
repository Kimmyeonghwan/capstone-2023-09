import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssHomeHeaderStyle = css`
  position: fixed;
  top: 0;

  width: 100%;
  height: 70px;
  padding: 30px 20px 15px 20px;

  background-color: ${COMMON_COLOR.LOGO1};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
`;

export const cssHomeHeaderNotificationStyle = css`
  font-size: 25px;
  margin-top: 6px;
  margin-left: auto;
  margin-bottom: 15px;
  color: ${COMMON_COLOR.WHITE};
  .ant-badge-dot {
    width: 9px;
    height: 9px;
    background: ${COMMON_COLOR.MAIN1};
  }
`;

export const cssHomeHeaderMenuItemStyle = css`
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 30px;
`;
