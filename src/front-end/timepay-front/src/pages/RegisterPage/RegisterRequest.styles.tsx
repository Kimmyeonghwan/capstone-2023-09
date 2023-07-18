import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssRegisterRequestPageStyle = () => css``;

export const cssRegisterRequestStepItemStyle = (isCurrent: boolean) => css`
  display: ${isCurrent ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  word-break: keep-all;

  .helper-user-nickname {
    font-size: 15px;
    font-weight: 700;
    padding-bottom: 15px;
    padding-top: 15px;
    word-break: keep-all;
  }
  .help-user {
    font-size: 15px;
    word-break: keep-all;
  }
  .guide {
    font-size: 15px;
    color: ${COMMON_COLOR.MAIN2};
    word-break: keep-all;
  }

  .control-box {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 15px;
    .ant-btn {
      font-size: 15px;
      height: max-content;
    }
  }
  .ant-form {
    font-size: 15px;
    .form-info {
      font-size: 15px;
      font-weight: 700;
      padding-top: 15px;
      padding-bottom: 15px;
    }
    label {
      font-size: 15px;
    }
    input {
      font-size: 15px;
    }
    textarea {
      font-size: 15px;
    }
  }
  ul {
    padding: 0 20px;
    word-break: keep-all;
  }
`;

export const cssPostInputNumberStyle = css`
  margin: 0 20px;
  .ant-input-wrapper {
    width: 140px !important;
  }
`;

export const cssPostAutoStyle = css`
  margin: 0 20px;
`;
