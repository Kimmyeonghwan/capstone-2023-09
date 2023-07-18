import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';
export const cssBox = css`
  .ant-btn {
    position: fixed;
    z-index: 200;
    background-color: ${COMMON_COLOR.AGENT_RED};
  }
`;
export const cssNewSearchHeaderStyle = (scaleValue: number) => css`
  position: fixed;
  margin-top: 30px;
  top: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
  gap: 10px;
  z-index: 120;
  background-color: ${COMMON_COLOR.WHITE};
  border-bottom: 1px solid ${COMMON_COLOR.SILVER_GRAY};
  padding-bottom: calc(15px * ${scaleValue});
  border-radius: 0px 0px 25px 25px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
  .submit-btn {
    font-size: calc(14px * ${scaleValue});
    height: max-content;
  }
  .back-arrow {
    width: 20px;
    height: auto;
  }
  .search-title-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: calc(15px * ${scaleValue}) calc(20px * ${scaleValue});
    padding-bottom: 0px;
  }
  .title-form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: calc(100% - 30px);
    .ant-form-item {
      width: 100%;
      margin: 0;
    }
    .ant-input {
      width: 100%;
      height: ${scaleValue === 1 ? '36px' : '43px'};
      font-size: calc(14px * ${scaleValue});
    }
    .ant-btn {
      background-color: ${COMMON_COLOR.MAIN1};
    }
  }
  .available-category-tag-container {
    padding-left: 20px;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    /* 스크롤바 숨김 */
    ::-webkit-scrollbar {
      display: none;
    }
    .ant-tag {
      padding: 5px 10px;
      border-radius: 20px;
      font-style: normal;
      font-weight: 600;
      font-size: calc(14px * ${scaleValue});
      line-height: calc(15px * ${scaleValue});
      color: black;
      border: unset;
      background: ${COMMON_COLOR.LIGHT_GRAY};
      &.ant-tag-checkable-checked {
        background: ${COMMON_COLOR.MAIN3};
      }
    }
  }
  .search-option-container {
    width: 100%;
    text-align: right;
    font-style: normal;
    font-weight: 600;
    font-size: calc(14px * ${scaleValue});
    line-height: calc(15px * ${scaleValue});
    color: black;
    background: ${COMMON_COLOR.WHITE};
    padding: 0px 20px 0px 20px;
    .ant-collapse-header {
      padding: 0;
    }
    .ant-collapse-content-box {
      padding: 0;
      padding-top: calc(22px * ${scaleValue});
    }

    .option-form {
      .ant-form-item {
        margin-bottom: calc(5px * ${scaleValue});
      }
      .ant-form-item-row {
        display: flex;
        flex-direction: row !important;
        .ant-col {
          flex: 1 1 auto !important;
          text-align: left;
          &.ant-form-item-label {
            .ant-form-item-no-colon {
              width: 90px;
              font-style: normal;
              font-weight: 600;
              font-size: calc(14px * ${scaleValue});
              line-height: calc(15px * ${scaleValue});
              color: black;
            }
          }
          &.ant-form-item-control {
            width: calc(100% - 90px);
            .ant-form-item-control-input-content {
              display: flex;
              flex-direction: row;
              gap: calc(5px * ${scaleValue});
              opacity: 100;
            }
          }
        }
      }
      .type-div {
        .ant-radio-group {
          width: 100%;
          text-align: center;
          margin-bottom: 10px;
          .ant-radio-button-wrapper {
            font-size: calc(14px * ${scaleValue});
          }
        }
      }

      .ant-select {
        width: 100px;
      }
      .volunteer-check {
        font-size: calc(14px * ${scaleValue});
      }
    }
  }
`;

export const cssSearchHeaderStyle = (scaleValue: number) => css`
  position: fixed;
  top: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
  gap: 10px;
  z-index: 120;
  background-color: ${COMMON_COLOR.WHITE};
  border-bottom: 1px solid ${COMMON_COLOR.SILVER_GRAY};
  padding-bottom: calc(15px * ${scaleValue});
  border-radius: 0px 0px 25px 25px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
  .submit-btn {
    font-size: calc(14px * ${scaleValue});
    height: max-content;
  }
  .back-arrow {
    width: 20px;
    height: auto;
  }
  .search-title-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: calc(15px * ${scaleValue}) calc(20px * ${scaleValue});
    padding-bottom: 0px;
  }
  .title-form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: calc(100% - 30px);
    .ant-form-item {
      width: 100%;
      margin: 0;
    }
    .ant-input {
      width: 100%;
      height: ${scaleValue === 1 ? '36px' : '43px'};
      font-size: calc(14px * ${scaleValue});
    }
    .ant-btn {
      background-color: ${COMMON_COLOR.MAIN1};
    }
  }
  .available-category-tag-container {
    padding-left: 20px;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    /* 스크롤바 숨김 */
    ::-webkit-scrollbar {
      display: none;
    }
    .ant-tag {
      padding: 5px 10px;
      border-radius: 20px;
      font-style: normal;
      font-weight: 600;
      font-size: calc(14px * ${scaleValue});
      line-height: calc(15px * ${scaleValue});
      color: black;
      border: unset;
      background: ${COMMON_COLOR.LIGHT_GRAY};
      &.ant-tag-checkable-checked {
        background: ${COMMON_COLOR.MAIN3};
      }
    }
  }
  .search-option-container {
    width: 100%;
    text-align: right;
    font-style: normal;
    font-weight: 600;
    font-size: calc(14px * ${scaleValue});
    line-height: calc(15px * ${scaleValue});
    color: black;
    background: ${COMMON_COLOR.WHITE};
    padding: 0px 20px 0px 20px;
    .ant-collapse-header {
      padding: 0;
    }
    .ant-collapse-content-box {
      padding: 0;
      padding-top: calc(22px * ${scaleValue});
    }

    .option-form {
      .ant-form-item {
        margin-bottom: calc(5px * ${scaleValue});
      }
      .ant-form-item-row {
        display: flex;
        flex-direction: row !important;
        .ant-col {
          flex: 1 1 auto !important;
          text-align: left;
          &.ant-form-item-label {
            .ant-form-item-no-colon {
              width: 90px;
              font-style: normal;
              font-weight: 600;
              font-size: calc(14px * ${scaleValue});
              line-height: calc(15px * ${scaleValue});
              color: black;
            }
          }
          &.ant-form-item-control {
            width: calc(100% - 90px);
            .ant-form-item-control-input-content {
              display: flex;
              flex-direction: row;
              gap: calc(5px * ${scaleValue});
              opacity: 100;
            }
          }
        }
      }
      .type-div {
        .ant-radio-group {
          width: 100%;
          text-align: center;
          margin-bottom: 10px;
          .ant-radio-button-wrapper {
            font-size: calc(14px * ${scaleValue});
          }
        }
      }

      .ant-select {
        width: 100px;
      }
      .volunteer-check {
        font-size: calc(14px * ${scaleValue});
      }
    }
  }
`;
