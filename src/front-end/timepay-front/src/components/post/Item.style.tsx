import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';
import '../../styles/fonts/pretendard/pretendard.css';

export const cssComments = css`
  margin-bottom: 20px;
  z-index: 1;
`;
export const cssMyCommentItem = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1.3px solid ${COMMON_COLOR.LIGHT_GRAY};
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 30px 0px 30px 30px;
  font-size: 18px;
`;
export const cssAppliedCommentItem = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1.3px solid ${COMMON_COLOR.MAIN1};
  background: ${COMMON_COLOR.WARM_GRAY};
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 30px 0px 30px 30px;
  font-size: 18px;
`;
export const cssOtherCommentItem = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1.3px solid ${COMMON_COLOR.SILVER_GRAY};
  background: ${COMMON_COLOR.WARM_GRAY};
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 30px 0px 30px 30px;
  font-size: 18px;
`;
export const cssPostDetailProfile = css`
  display: flex;
  margin-right: 20px;
  margin-bottom: 10px;
  border-radius: 50px;
  align-items: center;
`;
export const cssCommentProfile = css`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  border-radius: 50px;
  background-color: ${COMMON_COLOR.BLUE_GRAY};
`;
export const cssCommentUser = css`
  font-weight: 500;
  font-size: 18px;
  font-size: 18px;
`;

export const cssCommentText = css`
  width: 100%;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 400;
  line-height: 25px;
  span {
    white-space: pre-line;
  }
`;

export const cssEditDelete = css`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 16px;
  .edit {
    margin-right: 10px;
    height: 25px;
    border: none;
    padding: 0;
    font-size: 16px;
  }
  .sidebar {
    margin-bottom: 3px;
  }
  .delete {
    margin-left: 8px;
    margin-right: 5px;
    height: 25px;
    border: none;
    padding: 0;
    font-size: 16px;
  }
`;
