import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssMyInfoStyle = (scaleValue: number) => css`
  margin-bottom: calc(25px * ${scaleValue});
  width: 100%;
  padding: 0 30px;
  .MyTopBox {
    display: flex;
    padding-top: calc(20px * ${scaleValue});
  }
  .MyImageWrap {
    width: 100px;
  }
  .MyProfileImage {
    width: 100px;
    height: 100px;
    border-radius: 70%;
  }
  .MyNameWrap {
    width: 100%;
    padding-left: 20px;
  }
  .MyName {
    font-size: calc(24px * ${scaleValue});
    font-weight: 600;
    color: gray;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: calc(30px * ${scaleValue});
    word-wrap: brek-word;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .MyPersonalNum {
    font-size: calc(16px * ${scaleValue});
    color: #6d6a6aa2;
  }
  .agentBox {
    border: solid 1px ${COMMON_COLOR.FONT1};
    border-radius: 5px;
    height: calc(50px * ${scaleValue});
    margin-top: 30px;
    position: relative;
    .text {
      position: absolute;
      top: 8px;
      padding-left: 20px;
      font-size: calc(20px * ${scaleValue});
      font-weight: bold;
      vertical-align: middle;
      color: ${COMMON_COLOR.MAIN1};
    }
    .agent {
      position: absolute;
      top: 8px;
      padding-left: calc(126px * ${scaleValue});
      font-size: calc(20px * ${scaleValue});
      vertical-align: middle;
      color: ${COMMON_COLOR.FONT2};
      overflow: hidden;
      text-overflow: ellipsis;
      height: calc(25px * ${scaleValue});
      word-wrap: brek-word;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
`;

export const cssBtnSpace = (scaleValue: number) => css`
  .space-align-container {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  .ant-space-align-center {
    display: flex;
    justify-content: center;
  }
  .space-align-block {
    flex: none;
    margin: 8px 4px;
    padding: 4px;
  }
  .agentRegister {
    font-size: calc(15px * ${scaleValue});
    font-weight: bold;
    height: calc(40px * ${scaleValue});
  }
  .agentDelete {
    height: calc(40px * ${scaleValue});
    font-size: calc(15px * ${scaleValue});
    font-weight: bold;
  }
  .ant-btn-primary {
    background-color: ${COMMON_COLOR.MAIN2};
  }
`;
