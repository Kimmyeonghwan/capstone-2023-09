import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';
import '../../styles/fonts/pretendard/pretendard.css';

export const cssQnaDeleteStyle = css`
  text-align: right;
  margin-right: 25px;
`;
export const cssEditBtnStyle = css`
  letter-spacing: 2px;
  font-weight: 500;
  margin-right: 10px;
`;
export const cssDeleteBtnStyle = css`
  letter-spacing: 2px;
  font-weight: 500;
`;
export const cssLikeContainer = css`
  display: flex;
  justify-content: flex-end;
  font-size: 15px;
  p {
    margin: 0;
    padding: 0;
    margin-top: 10px;
    margin-right: 10px;
    font-size: 18px;
    font-weight: 500;
  }
`;
export const cssLike = css`
  width: 55px;
  height: 45px;
  padding-top: 5px;
  border: 1px solid ${COMMON_COLOR.FONT1};
  border-radius: 5px;
  background-color: ${COMMON_COLOR.WHITE};
`;

export const cssPostDetail = css`
  font-family: unset !important;
  background: ${COMMON_COLOR.WHITE};
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const cssPostDetailPage = css`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  h1 {
    font-size: 22px;
    font-weight: 500;
    margin: 0;
    margin-top: 40px;
    margin-left: 20px;
  }
`;

// 1st block
export const cssPostDetailFirst = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 35px;
  margin-bottom: 10px;
  margin-left: 25px;
  margin-right: 25px;
  font-size: 18px;
  text-align: right;
`;
export const cssPostDetailProfile = css`
  display: flex;
  justify-content: flex-end;
  width: 30px;
  height: 30px;
  margin-left: 15px;
  border-radius: 25px;
`;
export const cssPostDetailUser = css`
  margin-left: 8px;
  margin-top: 3px;
  font-weight: 500;
  font-size: 18px;
`;
export const cssPostDetailCreatedAt = css`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  font-size: 18px;
  color: ${COMMON_COLOR.FONT3};
`;

// 2nd block
export const cssPostDetailSecond = css`
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;
export const cssPostDetailTitle = css`
  margin-top: 20px;
  font-size: 22px;
  font-weight: 600;
  margin-right: 10px;
`;
export const cssPostDetailStatus = css`
  margin-top: -5px;
`;

// 3rd block
export const cssPostDetailThird = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-left: 25px;
  margin-right: 25px;
  .category {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
export const cssPostDetailCategory1 = css`
  margin-top: 20px;
  margin-right: 15px;
  font-size: 19px;
  font-weight: 500;
`;
export const cssPostDetailCategory2 = css`
  margin-top: 20px;
  font-size: 19px;
  font-weight: 700;
  color: ${COMMON_COLOR.FONT2};
  letter-spacing: 1px;
`;
export const cssPostDetailPay = css`
  margin-top: 20px;
  font-size: 19px;
  font-weight: 600;
  background-color: ${COMMON_COLOR.MAIN1};
  color: ${COMMON_COLOR.WHITE};
  border-radius: 10px;
  padding: 5px;
`;

// 4th block
export const cssPostDetailFourth = css`
  margin-top: 20px;
  margin-left: 25px;
  margin-right: 25px;
`;
export const cssPostDetailRegion = css`
  margin-top: 20px;
  color: ${COMMON_COLOR.FONT2};
  font-size: 18px;
  font-weight: 600;
`;
export const cssPostDetailTime = css`
  margin-top: 10px;
  color: ${COMMON_COLOR.FONT2};
  font-size: 18px;
  font-weight: 600;
`;

// 5th block
export const cssPostDetailFifth = css`
  margin-left: 25px;
  margin-right: 25px;
  .content {
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
    margin-top: 10px;
  }
`;
export const cssPostDetailContent2 = css`
  margin-top: 10px;
  padding: 10px;
  border: 1.5px solid ${COMMON_COLOR.FONT1};
  border-radius: 5px;
  font-size: 19px;
  font-weight: 400;
  letter-spacing: 1px;
  line-height: 24px;
  span {
    white-space: pre-line;
  }
`;
export const cssPostDetailAttachment = css`
  margin-bottom: 10px;
`;

// 6th
export const cssPostDetailSixth = css`
  margin-top: 25px;
  margin-left: 25px;
  margin-right: 25px;
  margin-bottom: 200px;
  p {
    text-align: center;
    font-size: 17px;
    font-weight: 500;
    color: ${COMMON_COLOR.FONT2};
    line-height: 23px;
    letter-spacing: 0.5px;
  }
`;

export const cssReportContainer = css`
  display: flex;
  justify-content: flex-end;
  margin-right: 25px;
`;
export const cssReportBtnStyle = css`
  letter-spacing: 1.5px;
  font-weight: 500;
`;

// comment
export const cssCommentContainer = css`
  margin-top: 10px;
  margin-left: 25px;
  margin-right: 25px;
`;
export const cssCollectButton = css`
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 15px;
`;
export const cssCollectBtn = css`
  width: 50%;
  height: 40px;
  letter-spacing: 1.5px;
  font-weight: 600;
  font-size: 18px;
  color: ${COMMON_COLOR.WHITE};
  background-color: ${COMMON_COLOR.MAIN2};
  border: none;
  border-radius: 15px;
`;

export const cssApplicant = css`
  height: 300px;
  overflow: scroll;
  font-size: 18px;
`;

// footer
export const cssAuthorFooter = css`
  box-shadow: 0px -5px 2px 3px rgb(255, 255, 255, 0.5);
  position: fixed;
  width: 100%;
  height: 190px;
  bottom: 0;
  margin: 0;
  padding: 0;
  background-color: ${COMMON_COLOR.WHITE};
`;
export const cssNonAuthorFooter = css`
  box-shadow: 0px -5px 2px 3px rgb(255, 255, 255, 0.5);
  position: fixed;
  width: 100%;
  height: 125px;
  bottom: 0;
  margin: 0;
  padding: 0;
  background-color: ${COMMON_COLOR.WHITE};
`;
export const cssPostFooter2 = css`
  margin-left: 10px;
  .textInput {
    display: flex;
    flex-direction: row;
  }
  .checkbox {
    margin-top: 5px;
    font-size: 18px;
    margin-bottom: 5px;
  }
`;

export const cssPostTextarea = css`
  border: none;
  :focus {
    outline: none;
  }
`;
export const cssPostBtn = css`
  margin-top: 20px;
  margin-right: 10px;
  width: 18%;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: ${COMMON_COLOR.FONT1};
  color: ${COMMON_COLOR.BLACK};
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 1.3px;
  :active {
    background-color: ${COMMON_COLOR.GRAY};
  }
`;

// lines
export const cssLine1 = css`
  border-top: 1.5px solid ${COMMON_COLOR.FONT1};
  background-color: black;
  margin-top: 15px;
`;
export const cssLine2 = css`
  border-top: 1.5px solid ${COMMON_COLOR.FONT1};
  background-color: black;
`;
export const cssLine3 = css`
  border-top: 1.5px solid ${COMMON_COLOR.FONT1};
  background-color: black;
  margin-top: 20px;
  margin-left: 25px;
  margin-right: 25px;
`;
export const cssLine4 = css`
  border-top: 5px solid ${COMMON_COLOR.FONT1};
  background-color: black;
  margin-top: 25px;
`;
export const cssLine5 = css`
  border-top: 1.2px solid ${COMMON_COLOR.FONT4};
  background-color: black;
`;

export const cssSpinStyle = css`
  text-align: center !important;
  padding-top: 280px !important;
  width: 100%;
`;

export const cssSpinCommentStyle = css`
  text-align: center !important;
  padding-top: 50px !important;
  width: 100%;
`;

export const cssVolunteerInfoStyle = css`
  margin: 30px 25px 0 25px;
  background-color: #ffdf995c;
  border-radius: 20px;
  padding: 15px;
  .overview {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    font-weight: 700;
    font-size: 17px;
    margin-bottom: 10px;
    svg {
      width: 53px;
      height: auto;
    }
  }
  ul {
    color: ${COMMON_COLOR.FONT2};
    font-weight: 500;
    padding-left: 20px;
    font-size: 13px;
    word-break: keep-all;
  }
`;
