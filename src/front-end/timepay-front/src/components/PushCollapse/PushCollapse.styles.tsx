import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssPushCollapseStyle = (scaleValue: number) => css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 5px;
  width: 100%;
  background-color: ${COMMON_COLOR.WARM_GRAY};
`;
export const cssPushPanelStyle = (scaleValue: number) => css`
  &.not-read {
    background-color: ${COMMON_COLOR.LIGHT_YELLOW};
  }
  &.is-already-read {
    background-color: ${COMMON_COLOR.WHITE};
  }
  .ant-collapse-header {
    padding: 12px 30px !important;
  }
  .ant-collapse-header-text {
    width: 100%;
    font-style: normal;
    font-weight: 700;
    font-size: calc(15px * ${scaleValue});
    line-height: calc(20px * ${scaleValue});
    color: ${COMMON_COLOR.FONT2};
    border-radius: 0 !important;
    .icon {
      margin-right: 10px;
    }
    .title {
      width: 100%;
    }
    .detail-push {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .show-detail {
      font-size: calc(12px * ${scaleValue});
    }
    .push-header {
      display: flex;
      flex-direction: row;
      width: 100%;
    }
    .comment-preview {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
      width: 100%;
      display: block;
    }
  }
  .ant-collapse-content-box {
    font-style: normal;
    font-weight: 700;
    font-size: calc(15px * ${scaleValue});
    line-height: calc(20px * ${scaleValue});
    color: ${COMMON_COLOR.FONT2};
    padding: 12px 30px !important;
  }
  border-top: 1px solid ${COMMON_COLOR.SILVER_GRAY} !important;
  border-bottom: 1px solid ${COMMON_COLOR.SILVER_GRAY} !important;
`;
