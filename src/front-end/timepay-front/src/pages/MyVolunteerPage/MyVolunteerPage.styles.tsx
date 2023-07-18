import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssMyVolunteerPageStyle = (scaleValue: number) => css`
  padding: 20px;
  .volunteer-overview {
    font-style: normal;
    font-weight: 700;
    font-size: calc(15px * ${scaleValue});
    line-height: calc(15px * ${scaleValue});
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .title {
      color: ${COMMON_COLOR.MAIN2};
    }
  }

  .ant-table {
    font-size: calc(16px * ${scaleValue});
    width: 100%;
    .ant-table-cell {
      word-break: keep-all;
    }
  }
  .agency-info {
    color: ${COMMON_COLOR.FONT2};
    font-size: calc(14px * ${scaleValue});
  }
  .ant-btn-link {
    padding: 0;
    height: max-content;
    color: ${COMMON_COLOR.MAIN2};
    font-weight: bold;
    font-size: calc(16px * ${scaleValue});
    span {
      text-decoration: underline;
    }
    border-radius: 0;
  }
  .ant-spin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .volunteer-extra {
    color: ${COMMON_COLOR.FONT2};
    font-size: calc(14px * ${scaleValue});
    margin-top: calc(10px * ${scaleValue});
  }
  .certificate {
    color: ${COMMON_COLOR.BLACK};
  }
  .no-certificate {
    color: ${COMMON_COLOR.FONT4};
  }
`;
