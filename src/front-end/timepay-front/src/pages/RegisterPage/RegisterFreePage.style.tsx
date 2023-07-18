import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';
import '../../styles/fonts/pretendard/pretendard.css';

export const cssPostPageStyle = css`
  background: ${COMMON_COLOR.WHITE};
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  padding: 0;
  margin: 0;

  .ant-form-item-row {
    flex-direction: column;
  }
  .ant-form-item-label {
    font-size: 20px;
    label {
      font-size: 18px;
      font-weight: 500;
    }
  }
  .time {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
  .guide {
    width: 310px;
    padding: 10px;
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 30px;
    font-weight: 500;
    background: ${COMMON_COLOR.BRIGHT_GRAY};
    border-radius: 10px;
  }
`;

export const cssPostCategoryStyle = css`
  margin-top: 180px;
  margin-left: 20px;
`;

export const cssPostDateStyle = css`
  margin-top: 10px;
  margin-left: 20px;
`;

export const cssPostTitleStyle = css`
  font-size: 18px;
  margin-left: 20px;
  margin-right: 20px;
  :focus {
    outline: none;
  }
`;
export const cssPostTitleStyle2 = css`
  font-size: 18px;
  margin-top: 120px;
  margin-left: 20px;
  margin-right: 20px;
  :focus {
    outline: none;
  }
`;
export const cssPostTitleInputStyle = css`
  font-size: 18px;
  padding: 5px 10px;
  :focus {
    outline: none;
  }
`;
export const cssPostContentStyle = css`
  font-size: 18px;
  margin-left: 20px;
  padding-bottom: 10px;
  padding-right: 20px;
  :focus {
    outline: none;
  }
`;
export const cssPostContentInputStyle = css`
  font-size: 18px;
  padding: 5px 10px;
  :focus {
    outline: none;
  }
`;

export const cssLineStyle = css`
  width: 100%;
  border-top: 1px solid ${COMMON_COLOR.FONT1};
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const cssPostFooterStyle = css`
  position: fixed;
  width: 100%;
  height: 70px;
  bottom: 0;
  padding: 0;
`;
export const cssPostBtnStyle = css`
  width: 100%;
  height: 70px;
  background: ${COMMON_COLOR.MAIN1};
  color: ${COMMON_COLOR.WHITE};
  border: none;
  letter-spacing: 3px;
  font-size: 24px;
  font-weight: 600;
`;
export const cssPostBtnStyle2 = css`
  width: 100%;
  height: 70px;
  background: ${COMMON_COLOR.LIGHT_GRAY};
  color: ${COMMON_COLOR.WHITE};
  border: none;
  letter-spacing: 3px;
  font-size: 24px;
  font-weight: 600;
  opacity: 100;
`;
