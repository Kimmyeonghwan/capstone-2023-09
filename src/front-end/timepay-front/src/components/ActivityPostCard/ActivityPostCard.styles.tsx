import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssActivityPostCardStyle = (scaleValue: number) => css`
  padding: 10px 20px;
  border-top: 1px solid ${COMMON_COLOR.FONT1};
  border-bottom: 1px solid ${COMMON_COLOR.FONT1};
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: calc(5px * ${scaleValue});
  color: ${COMMON_COLOR.BLACK};
  .activity-post-card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: calc(5px * ${scaleValue});
    margin-left: -5px;
  }
  .activity-post-card-title {
    font-style: normal;
    font-weight: 700;
    font-size: calc(15px * ${scaleValue});
    line-height: calc(20px * ${scaleValue});
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }
  .activity-post-date-time {
    font-style: normal;
    font-weight: 700;
    font-size: calc(14px * ${scaleValue});
    line-height: calc(20px * ${scaleValue});
    color: ${COMMON_COLOR.FONT2};
  }
  .activity-post-pay {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: calc(5px * ${scaleValue});
    font-weight: 700;
    font-size: calc(14px * ${scaleValue});
    line-height: calc(20px * ${scaleValue});
    color: ${COMMON_COLOR.FONT2};
    .pay-number {
      color: ${COMMON_COLOR.BLACK};
    }
  }
`;
