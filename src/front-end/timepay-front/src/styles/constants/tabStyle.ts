import { css } from '@emotion/react';
import { COMMON_COLOR } from './colors';

export const cssTabStyle = (scaleValue: number) => css`
  height: 100%;
  .ant-tabs-nav {
    margin-bottom: 0px;
    border-bottom: 1px solid #cdcdcd;
  }
  .ant-tabs-tab {
    padding: 10px 30px;
  }
  .ant-tabs-tabpane-active {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .ant-spin {
    width: 100%;
    padding: 30px;
  }
  .ant-tabs-content {
    display: flex;
  }
  .ant-tabs-tab-btn {
    font-style: normal;
    font-weight: 700;
    font-size: calc(16px * ${scaleValue});
    line-height: calc(20px * ${scaleValue});
    color: ${COMMON_COLOR.FONT2} !important;
  }
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: ${COMMON_COLOR.MAIN1} !important;
    }
  }
  .ant-tabs-ink-bar {
    background-color: ${COMMON_COLOR.MAIN1};
    height: 5px;
  }

  .ant-tabs-content-holder {
    height: 100%;
    padding-bottom: calc(10px * ${scaleValue});
  }
`;
