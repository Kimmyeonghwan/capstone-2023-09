import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssRegisterModal = (scaleValue: number) => css`
  .ant-modal-title {
    color: ${COMMON_COLOR.MAIN1};
    font-size: 20px;
  }
  .ant-modal-footer {
    text-align: center;
  }
  .ant-modal-body {
    border: solid 1px ${COMMON_COLOR.FONT1};
    border-radius: 5px;
    padding-inline-start: 20px;
    padding-inline-end: 20px;
    font-size: 16px;
  }
  .myUIDnumber {
    color: ${COMMON_COLOR.FONT2};
  }
  .guide {
    text-align: center;
    align-items: center;
    display: flex;
    color: ${COMMON_COLOR.MAIN1};
    flex-direction: column;
  }
`;

export const cssModalFooter = (scaleValue: number) => css`
  .space-align-block {
    margin: 8px 4px;
    padding: 4px;
  }
  .agentRegister {
    font-size: calc(15px * ${scaleValue});
    font-weight: bold;

    height: calc(35px * ${scaleValue});
    width: 110px;
  }
  .agentDelete {
    height: calc(35px * ${scaleValue});
    font-size: calc(15px * ${scaleValue});
    background-color: ${COMMON_COLOR.FONT4};
    font-weight: bold;
    width: 110px;
  }
`;
