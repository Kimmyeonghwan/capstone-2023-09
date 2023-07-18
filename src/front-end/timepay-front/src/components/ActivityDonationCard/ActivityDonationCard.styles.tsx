import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssActivityDonationCardStyle = (scaleValue: number) => css`
  padding: 10px 20px;
  border-top: 1px solid ${COMMON_COLOR.FONT1};
  border-bottom: 1px solid ${COMMON_COLOR.FONT1};
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: calc(5px * ${scaleValue});
  color: ${COMMON_COLOR.BLACK};

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
  .donate-detail {
    font-style: normal;
    font-weight: 700;
    font-size: calc(14px * ${scaleValue});
    line-height: calc(20px * ${scaleValue});
    color: ${COMMON_COLOR.FONT2};
    display: flex;
    flex-direction: row;
    gap: 20px;
    .tp {
      color: ${COMMON_COLOR.BLACK};
    }
  }
  .activity-post-date-time {
    font-style: normal;
    font-weight: 700;
    font-size: calc(14px * ${scaleValue});
    line-height: calc(20px * ${scaleValue});
    color: ${COMMON_COLOR.FONT2};
  }
`;
