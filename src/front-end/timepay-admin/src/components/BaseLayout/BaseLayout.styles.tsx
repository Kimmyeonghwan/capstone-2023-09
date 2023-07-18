import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';
import '../../styles/fonts/pretendard/pretendard.css';

export const cssBaseLayoutStyle = css`
  .ant-layout {
    background: white;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', sans-serif !important;
  }

  .ant-layout-header {
    background: ${COMMON_COLOR.FONT2};
    padding: 5px;
    .menu-collapse-trigger-btn {
      padding: 0;
      border: 0;
      color: ${COMMON_COLOR.WHITE};
      font-size: 20px;
      cursor: pointer;
      transition: color 0.3s;
    }
    .menu-collapse-trigger-btn:hover {
      color: ${COMMON_COLOR.MAIN2};
    }
  }
  .ant-layout-sider {
    min-height: 100vh;
    .ant-layout-sider-children {
      text-align: center;
      background: ${COMMON_COLOR.FONT2};
      .logo {
        height: 64px;
        width: auto;
        padding: 10px;
        &.collapsed {
          visibility: hidden;
        }
      }
    }
  }

  .ant-menu {
    background: unset;
    font-family: unset;
    font-size: 15px;
    color: ${COMMON_COLOR.WHITE};
    .ant-menu-item-active {
      color: ${COMMON_COLOR.MAIN2} !important;
    }
  }

  .ant-layout-content {
    font-family: unset;
  }
  .logoutBtn {
    padding-right: 20px;
    margin-left: auto;
  }
`;
