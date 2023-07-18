import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssSimplePostCardHeadStyle = (scaleValue: number) => css`
  display: flex;
  flex-direction: column;
  gap: calc(5px * ${scaleValue});
  padding: 10px 10px 0 10px;
  .tag {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: calc(5px * ${scaleValue});
    .amount {
      width: max-content;
    }
  }
  .title {
    height: 22px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: calc(5px * ${scaleValue});
    font-weight: 700;
    font-size: calc(16px * ${scaleValue});
    line-height: calc(15px * ${scaleValue});
    .title-div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    font-style: normal;
    .attachment {
      height: calc(14px * ${scaleValue});
    }
  }
  .ant-progress {
    font-size: calc(12px * ${scaleValue});
  }
`;

export const cssSimplePostCardBodyStyle = (scaleValue: number) => css`
  padding: 10px 20px;
  padding-bottom: calc(30px * ${scaleValue});
  .post-card-location {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: calc(20px * ${scaleValue});
    gap: calc(6px * ${scaleValue});
    font-style: normal;
    font-weight: 400;
    font-size: calc(13px * ${scaleValue});
    line-height: calc(20px * ${scaleValue});
    color: ${COMMON_COLOR.FONT3};
  }
  .post-card-time {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: calc(6px * ${scaleValue});
    height: calc(20px * ${scaleValue});
    font-style: normal;
    font-weight: 400;
    font-size: calc(13px * ${scaleValue});
    line-height: calc(20px * ${scaleValue});
    color: ${COMMON_COLOR.FONT3};
  }
  .post-card-content {
    font-style: normal;
    font-weight: 400;
    font-size: calc(12px * ${scaleValue});
    line-height: calc(20px * ${scaleValue});
    margin-top: calc(6px * ${scaleValue});
    height: calc(5em * ${scaleValue});
    overflow: hidden;
    color: ${COMMON_COLOR.BLACK};
  }
`;

export const cssSimplePostCardFooterStyle = (scaleValue: number) => css`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${COMMON_COLOR.FONT3};
  width: 100%;
  bottom: 0;
  height: calc(70px * ${scaleValue});
  padding: 40px 10px 20px 10px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 28%);
  font-style: normal;
  font-weight: 400;
  font-size: calc(13px * ${scaleValue});
  line-height: calc(15px * ${scaleValue});
  .nickname {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: calc(5px * ${scaleValue});
    svg {
      width: calc(16px * ${scaleValue});
      height: calc(16px * ${scaleValue});
    }
  }
`;

export const cssSimplePostCardStyle = (scaleValue: number) => css`
  width: calc(100% - 10px);
  margin: 5px;
  .ant-card-body {
    padding: 0px;
    padding-bottom: calc(20px * ${scaleValue});
    .volunteer-badge {
      position: absolute;
      top: 13px;
      right: 21px;
      svg {
        width: calc(47px * ${scaleValue});
        height: calc(61px * ${scaleValue});
      }
    }
  }
`;
