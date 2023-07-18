import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssInstantActivityPageStyle = () => css`
  padding: 20px 30px;

  .ant-steps {
    display: flex;
    flex-direction: row;
    .ant-steps-item-icon {
      margin-right: 10px !important;
    }
    .ant-steps-item-tail {
      display: none !important;
    }
    .ant-steps-item-title {
      display: inline-block;
    }
    @media (max-width: 345px) {
      .ant-steps-item-title {
        display: none;
      }
    }
  }
`;

export const cssInstantActivityStepItemStyle = (
  isCurrent: boolean,
  scaleValue: number,
) => css`
  display: ${isCurrent ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  word-break: keep-all;

  .helper-user-nickname {
    font-size: calc(16px * ${scaleValue});
    font-weight: 700;
    padding-bottom: calc(20px * ${scaleValue});
    padding-top: calc(30px * ${scaleValue});
    word-break: keep-all;
  }
  .help-user {
    font-size: calc(18px * ${scaleValue});
    word-break: keep-all;
  }
  .guide {
    font-size: calc(14px * ${scaleValue});
    color: ${COMMON_COLOR.MAIN2};
    word-break: keep-all;
  }

  .control-box {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    gap: calc(10px * ${scaleValue});
    margin-top: calc(30px * ${scaleValue});
    .ant-btn {
      font-size: calc(14px * ${scaleValue});
      height: max-content;
    }
  }
  .ant-form {
    font-size: calc(14px * ${scaleValue});
    .form-info {
      font-size: calc(18px * ${scaleValue});
      font-weight: 700;
      padding-top: calc(30px * ${scaleValue});
      padding-bottom: calc(10px * ${scaleValue});
    }
    label {
      font-size: calc(14px * ${scaleValue});
    }
    input {
      font-size: calc(14px * ${scaleValue});
    }
    textarea {
      font-size: calc(14px * ${scaleValue});
    }
  }
  ul {
    padding: 0 20px;
    word-break: keep-all;
  }
`;
