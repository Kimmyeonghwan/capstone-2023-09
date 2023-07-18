import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssMyStyle = (scaleValue: number) => css`
  .MyEdit {
    margin-top: 20px;
    text-align: right;
    margin-right: 30px;
  }
  .Edit {
    width: max-content;
    padding: 0 10px;
    height: calc(30px * ${scaleValue});
    border-radius: calc(15px * ${scaleValue});
    border: none;
    background-color: ${COMMON_COLOR.FONT1};
    font-size: calc(15px * ${scaleValue});
  }
`;

export const cssMyInfoStyle = (scaleValue: number) => css`
  margin-bottom: calc(25px * ${scaleValue});
  width: 100%;
  padding: 0 30px;
  .info-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: calc(15px * ${scaleValue});
    font-style: normal;
    font-weight: 400;
    font-size: calc(20px * ${scaleValue});
    line-height: calc(15px * ${scaleValue});
    color: #858585;
    img {
      width: 70px;
      height: 70px;
      border-radius: 100%;
    }
    margin-bottom: 20px;
  }
  .info-detail {
    display: flex;
    flex-direction: column;
    gap: calc(7px * ${scaleValue});

    div {
      display: flex;
      flex-direction: row;
      width: 100%;
      gap: 15px;
      .label {
        font-style: normal;
        font-weight: 700;
        font-size: calc(16px * ${scaleValue});
        line-height: calc(15px * ${scaleValue});
        color: #f1af23;
      }
      .value {
        font-style: normal;
        font-weight: 400;
        font-size: calc(16px * ${scaleValue});
        line-height: calc(15px * ${scaleValue});
        color: #787878;
        .yes {
          color: green;
        }
        .no {
          color: red;
        }
      }
    }
  }
`;

export const cssMyPage = css`
  width: 100%;
  height: 100%;
  padding: 10px 30px;
`;

export const cssMyPageProfileBlock = (scaleValue: number) => css`
  .MyTopBox {
    display: flex;
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
    text-overflow: ellipsis;
    overflow: hidden;
    height: calc(30px * ${scaleValue});
    word-wrap: brek-word;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .MyPersonalNum {
    font-size: calc(12px * ${scaleValue});
    color: #6d6a6aa2;
  }
`;

export const cssMyPageInfoBlock = (scaleValue: number) => css`
  .MyTotalBox {
    display: flex;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 30px;
  }
  MyLeftBox {
    display: inline-block;
    width: 40%;
  }
  .MyRightBox {
    display: inline-block;
    width: 55%;
    margin-left: 5%;
  }
  .MyTitleText {
    font-size: calc(13px * ${scaleValue});
    font-weight: 600;
    color: #f1af23;
    margin-top: calc(20px * ${scaleValue});
  }
  .MyContentText {
    font-size: calc(13px * ${scaleValue});
    font-weight: 600;
    color: gray;
    margin-top: calc(20px * ${scaleValue});
    overflow: hidden;
    width: 100%;

    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const cssMyPageButtonBlock = (scaleValue: number) => css`
  .MyBlockBox {
    justify-content: center;
    align-items: center;
    border: 2px solid #e0dfdf;
    border-radius: 8px;
    margin: 0px 30px;
    margin-bottom: 30px;
  }
  .MyPageMoveBox {
    padding-left: calc(10px * ${scaleValue});
    width: 80%;
    height: 40px;
    margin-top: calc(7px * ${scaleValue});
  }
  .MyPageText {
    width: 100%;
    height: 100%;
    text-align: left;

    background-color: white;
    color: #787878;

    border: 1px solid white;
    border-radius: 8px;
    font-size: calc(15px * ${scaleValue});
    font-weight: 700;
  }
`;
