import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssAdminAdd = css`
  background-color: ${COMMON_COLOR.MAIN1};
  font-size: 15px;
  &:hover {
    ${COMMON_COLOR.MAIN2}
  }
`;

export const cssBox = css`
  padding-right: 5%;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row-reverse;
`;

export const cssAddModal = css`
  .footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
`;
