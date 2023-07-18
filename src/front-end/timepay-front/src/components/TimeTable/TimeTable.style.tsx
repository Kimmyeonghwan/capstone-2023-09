import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssCalendarHeader = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  padding-top: 5px;
  padding-bottom: 15px;
  .radioBtn {
    display: flex;
    justify-content: flex-end;
    /* align-items: center; */
    font-weight: normal;
  }
`;

export const cssTimeTable = css`
  padding: 10px;
  .ant-typography {
    margin-top: 10px;
    margin-bottom: 3px;
  }
  .fc-header-toolbar {
    margin-bottom: 5px !important;
  }
  .fc-toolbar-title {
    font-size: 20px;
  }
  .fc-view-harness {
    border-radius: 20px 0px 0px 0px;
  }
  .fc-scrollgrid {
    border-radius: 20px 0px 0px 0px;
  }
  .fc-col-header-cell-cushion {
    color: ${COMMON_COLOR.FONT2};
  }
  .fc-event-main {
    overflow: 'hidden';
  }
  .fc-next-button {
    background: ${COMMON_COLOR.MAIN1};
    border-color: ${COMMON_COLOR.WHITE};
  }
  .fc-prev-button {
    background: ${COMMON_COLOR.MAIN1};
    border-color: ${COMMON_COLOR.WHITE};
  }
  .fc-today-button {
    background: ${COMMON_COLOR.MAIN2} !important;
    border-color: ${COMMON_COLOR.WHITE} !important;
  }
  .fc-button-primary {
    background: ${COMMON_COLOR.MAIN1};
    border-color: ${COMMON_COLOR.WHITE};
  }
  .fc-button-primary:hover {
    background: ${COMMON_COLOR.MAIN1};
    border-color: ${COMMON_COLOR.WHITE};
  }
  .fc-new-button {
    background: ${COMMON_COLOR.MAIN2};
    border-color: ${COMMON_COLOR.WHITE};
  }
`;
