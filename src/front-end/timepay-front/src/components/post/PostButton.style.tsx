import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';
import '../../styles/fonts/pretendard/pretendard.css';

export const cssPostButtons = css`
  display: flex;
  justify-content: center;
`;

export const cssPostButton = css`
  height: 50px;
  margin-top: 7px;
  margin-bottom: 7px;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2.3px;
  border-radius: 5px;
  border: none;
  color: ${COMMON_COLOR.WHITE};
  :hover {
    color: ${COMMON_COLOR.WHITE};
  }
  &.apply {
    width: 95%;
    background-color: ${COMMON_COLOR.MAIN1};
  }
  &.completed {
    width: 95%;
    background-color: #ff4910;
    margin-right: 6px;
  }
  &.deleted {
    width: 45%;
    background-color: #6c6363;
    margin-left: 6px;
  }
  &.link-volunteer {
    width: 95%;
    background-color: skyblue;
  }
  &.theEnd {
    width: 95%;
    color: ${COMMON_COLOR.FONT3};
    background-color: ${COMMON_COLOR.WHITE};
    font-weight: 400;
    letter-spacing: 1.5px;
  }
  &.disable {
    background-color: ${COMMON_COLOR.FONT1};
  }
`;

export const cssCommentTableStyle = css`
  .comment-user {
    color: ${COMMON_COLOR.MAIN2};
    font-weight: 700;
    font-size: 15px;
  }
  .comment-content {
    word-break: keep-all;
    font-size: 18px;
  }
`;
