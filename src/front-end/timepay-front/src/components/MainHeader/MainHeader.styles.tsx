import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssBox = css`
  .ant-btn {
    position: fixed;
    z-index: 200;
    background-color: ${COMMON_COLOR.AGENT_RED};
  }
`;

export const cssNewMainHeaderStyle = (token: any) => css`
  position: fixed;
  top: 0;

  background: ${COMMON_COLOR.WHITE};
  width: 100%;
  height: 70px;

  padding: 25px 25px 20px;
  margin-top: 15px;

  color: ${COMMON_COLOR.MAIN1};
  font-weight: 700;
  font-size: 20px;
  line-height: 15px;
  border: 0;
  border-bottom: 1px solid ${COMMON_COLOR.SILVER_GRAY};

  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;

  .header-title {
    margin-top: 1px;
  }

  z-index: 100;
`;

export const cssMainHeaderStyle = (token: any) => css`
  position: fixed;
  top: 0;

  background: ${COMMON_COLOR.WHITE};
  width: 100%;
  height: 70px;

  padding: 25px 25px 20px;
  margin-top: 1;

  color: ${COMMON_COLOR.MAIN1};
  font-weight: 700;
  font-size: 20px;
  line-height: 15px;
  border: 0;
  border-bottom: 1px solid ${COMMON_COLOR.SILVER_GRAY};

  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;

  .header-title {
    margin-top: 1px;
  }

  z-index: 100;
`;
