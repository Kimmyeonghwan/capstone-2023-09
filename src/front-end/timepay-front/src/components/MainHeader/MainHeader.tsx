import { Button, Layout, Modal } from 'antd';
import { useRecoilValue } from 'recoil';
import { headerTitleState } from '../../states/uiState';
import {
  cssBox,
  cssMainHeaderStyle,
  cssNewMainHeaderStyle,
} from './MainHeader.styles';
import { ReactComponent as BackArrow } from '../../assets/images/icons/header-back-arrow.svg';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import {
  getMultiTokenFromCookie,
  setMultiTokenToCookie,
} from '../../utils/token';
import modal from 'antd/es/modal';
import { COMMON_COLOR } from '../../styles/constants/colors';

const MainHeader = () => {
  const navigate = useNavigate();
  const headerTitle = useRecoilValue(headerTitleState);
  const handleClickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const { confirm } = Modal;
  const token = getMultiTokenFromCookie();

  const logoutToken = useCallback(() => {
    setMultiTokenToCookie('undefined', 0);
    if (window.location.pathname === '/my') {
      window.location.reload();
    }
    navigate('/my');
  }, [navigate]);
  const openMuliTokenModal = useCallback(() => {
    confirm({
      title: '대리인 활동 종료',
      content: (
        <span>
          <p />
          대리인 활동을 종료할 수 있습니다. <p />
          <p />
        </span>
      ),
      onOk: logoutToken,
      okText: '대리인 활동 종료하기',
      okButtonProps: { style: { backgroundColor: COMMON_COLOR.MAIN2 } },
      onCancel() {},
      cancelText: '취소',
    });
  }, [confirm, logoutToken]);

  return (
    <>
      {!token || token === 'undefined' ? (
        <Layout.Header css={cssMainHeaderStyle}>
          <BackArrow onClick={handleClickBack} />
          <span className="header-title">{headerTitle}</span>
        </Layout.Header>
      ) : (
        <div css={cssBox}>
          <Button
            className="agentAction"
            type="primary"
            block
            onClick={openMuliTokenModal}
          >
            대리인 활동중입니다
          </Button>
          <p />
          <Layout.Header css={cssNewMainHeaderStyle}>
            <BackArrow onClick={handleClickBack} />
            <span className="header-title">{headerTitle}</span>
          </Layout.Header>
        </div>
      )}
    </>
  );
};

export default MainHeader;
