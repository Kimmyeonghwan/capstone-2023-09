import { css } from '@emotion/react';

export const cssSpinStyle = css`
  text-align: center !important;
  padding-top: 300px;
  width: 100%;
`;

export const cssNothingStyle = (scaleValue: number) => css`
  display: flex;
  flex-direction: column;
  .emoji {
    font-size: calc(25px * ${scaleValue});
  }
  text-align: center !important;
  padding-top: 250px;
  width: 100%;
`;

export const cssSearchPageStyle = (isDrawerOpen: boolean) => css`
  // drawer가 열려있을 때는 스크롤 막음 + 딤드처리
  overflow-y: ${isDrawerOpen ? 'hidden' : 'scroll'};
  touch-action: ${isDrawerOpen ? 'none' : 'auto'};
  height: ${isDrawerOpen ? '100%' : 'auto'};
  width: 100%;
  position: ${isDrawerOpen ? 'fixed' : 'auto'};
  .dimmed {
    display: ${isDrawerOpen ? 'block' : 'none'};
    background-color: black;
    opacity: 0.4;
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: 100;
  }
`;
