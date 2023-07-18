import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';
import '../../styles/fonts/pretendard/pretendard.css';

export const cssQnaDeleteStyle = css`
  text-align: right;
  margin-top: 15px;
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

export const cssPostEditPage = css`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

// 1st block
export const cssPostDetailFirst = css`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: 25px;
  margin-right: 25px;
  font-size: 18px;
`;
export const cssPostDetailProfile = css`
  display: flex;
  justify-content: flex-start;
  width: 50px;
  height: 50px;
  margin-top: -10px;
  border-radius: 25px;
  background-color: ${COMMON_COLOR.BLUE_GRAY};
`;
export const cssPostDetailUser = css`
  margin-top: -35px;
  margin-left: 65px;
  font-weight: 500;
`;

// 2nd block
export const cssPostEditSecond = css`
  margin-left: 25px;
  margin-right: 25px;
`;
export const cssPostDetailTitle = css`
  margin-top: 20px;
  font-size: 19px;
  font-weight: 600;
`;
export const cssPostDetailStatus = css`
  margin-top: 25px;
`;

// 3rd block
export const cssPostDetailThird = css`
  display: flex;
  justify-content: space-between;
  margin-left: 25px;
  margin-right: 25px;
  .category {
    display: flex;
    align-items: center;
  }
`;
export const cssPostDetailCategory1 = css`
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: ${COMMON_COLOR.BLACK};
`;
export const cssPostDetailCategory2 = css`
  margin-left: 20px;
  font-size: 16px;
  font-weight: 700;
  color: ${COMMON_COLOR.FONT2};
`;
export const cssPostDetailPay = css`
  display: flex;
  align-items: center;
  text-align: right;
  font-size: 18px;
  font-weight: 500;
  background-color: ${COMMON_COLOR.MAIN3};
  border-radius: 10px;
  padding: 5px 8px;
`;

// 4th block
export const cssPostDetailFourth = css`
  align-items: center;
  margin-left: 25px;
  margin-right: 25px;
`;
export const cssPostDetailRegion = css`
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
`;
export const cssPostDetailContent1 = css`
  margin-top: 20px;
  font-size: 19px;
  font-weight: 600;
`;
export const cssPostEditContent2 = css`
  margin-top: 10px;
  padding: 10px;
  border: 1.5px solid ${COMMON_COLOR.MAIN1};
  border-radius: 10px;
  font-size: 18px;
  letter-spacing: 1.3px;
`;
export const cssPostDetailAttachment = css`
  margin-bottom: 10px;
`;

// footer
export const cssPostEditFooter = css`
  box-shadow: 0px -5px 2px 3px rgb(255, 255, 255, 0.5);
  position: fixed;
  width: 100%;
  height: 70px;
  bottom: 0;
  margin: 0;
  padding: 0;
  background-color: ${COMMON_COLOR.WHITE};
`;
export const cssPostEditFooter2 = css`
  display: flex;
  flex-direction: row;
`;

export const cssPostTextarea = css`
  margin: 0;
  margin-top: 10px;
  padding: 10px;
  border: 1.5px solid ${COMMON_COLOR.MAIN1};
  border-radius: 10px;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1.3px;
`;

export const cssPostEditBtn2 = css`
  width: 100%;
  height: 70px;
  background-color: ${COMMON_COLOR.FONT1};
  font-weight: 600;
  font-size: 22px;
  letter-spacing: 2.5px;
  border-radius: 0;
  border: none;
  background-color: ${COMMON_COLOR.MAIN1};
`;

// lines
export const cssLine1 = css`
  border-top: 1.5px solid ${COMMON_COLOR.LIGHT_GRAY};
  background-color: black;
  margin-top: 15px;
  margin-bottom: 15px;
`;
export const cssLine2 = css`
  border-top: 1.5px solid ${COMMON_COLOR.LIGHT_GRAY};
  background-color: black;
`;
export const cssLine3 = css`
  border-top: 1px solid ${COMMON_COLOR.LIGHT_GRAY};
  background-color: black;
  margin-top: 20px;
  margin-bottom: 20px;
`;
