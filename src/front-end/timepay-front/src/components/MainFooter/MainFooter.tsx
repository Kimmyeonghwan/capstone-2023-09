import {
  cssFloating,
  cssHomeBtnStyle,
  cssMainFooterStyle,
  cssPlusPostBtnStyle,
} from './MainFooter.styles';
import { MenuProps, Modal } from 'antd';
import { Button, Dropdown, Layout } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { ReactComponent as ModifyFontSizeBig } from '../../assets/images/icons/modify-font-size-big.svg';
import { ReactComponent as ModifyFontSizeSmall } from '../../assets/images/icons/modify-font-size-small.svg';
import { ReactComponent as WriteBoard } from '../../assets/images/icons/write-board.svg';
import { ReactComponent as ActivityRecord } from '../../assets/images/icons/activity-record.svg';
import { ReactComponent as Home } from '../../assets/images/icons/home.svg';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/paths';
import { useCallback, useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { fontSizeState } from '../../states/uiState';
import useFontSize from '../../hooks/useFontSize';
import { useGetUserInfo } from '../../api/hooks/user';
import InstantActivityQRModal from '../InstantActivityQRModal';

const MainFooter = () => {
  const { data } = useGetUserInfo();
  const { isBig } = useFontSize();
  const setFontSize = useSetRecoilState(fontSizeState);
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpenQR, setIsOpenQR] = useState(false);

  const isAgency = useMemo(() => {
    if (data?.data.body.manager_name) return true;
    return false;
  }, [data]);

  const isViewWriteBtn = useMemo(() => {
    return location.pathname === PATH.SEARCH || location.pathname === PATH.HOME;
  }, [location]);

  const handleOnClickModifyFontSize = useCallback(() => {
    if (isBig) setFontSize('small');
    else setFontSize('big');
  }, [isBig, setFontSize]);

  const handleOnLinkNotification = useCallback(() => {
    navigate(PATH.NOTIFICATION);
  }, [navigate]);

  const handleOnCloseQRModal = useCallback(() => {
    setIsOpenQR(false);
  }, []);

  const handleOnShowQRModal = useCallback(() => {
    Modal.confirm({
      content: '도움이 필요한 분만 눌러주세요!',
      okText: '도움이 필요합니다',
      cancelText: '취소',
      onOk: () => {
        if (data?.data.body.id) setIsOpenQR(true);
      },
    });
  }, [data]);

  const items: MenuProps['items'] = useMemo(() => {
    const items = [
      {
        key: PATH.Register_HR,
        label: <Link to={PATH.Register_HR}>도움요청</Link>,
      },
      {
        key: PATH.Register_HS,
        label: <Link to={PATH.Register_HS}>같이하기</Link>,
      },
    ];
    if (isAgency)
      items.push({
        key: PATH.DONATION_BOARD_WRITE,
        label: <Link to={PATH.DONATION_BOARD_WRITE}>기부하기</Link>,
      });
    else
      items.push({
        key: '바로도움요청',
        label: (
          <Button type="link" onClick={handleOnShowQRModal}>
            바로도움요청
          </Button>
        ),
      });
    return items;
  }, [isAgency, handleOnShowQRModal]);

  return (
    <>
      <div className="float" css={cssFloating}>
        {isViewWriteBtn && (
          <Dropdown
            menu={{ items }}
            placement="topRight"
            arrow
            trigger={['click']}
            overlayClassName={`${
              isBig ? 'big-post-dropdown' : 'small-post-dropdown'
            }`}
          >
            <Button css={cssPlusPostBtnStyle} shape="circle" size="large">
              <WriteBoard width={30} height={30} />
            </Button>
          </Dropdown>
        )}
      </div>
      <Layout.Footer css={cssMainFooterStyle}>
        <Button onClick={handleOnClickModifyFontSize}>
          <ModifyFontSizeSmall style={{ display: isBig ? 'none' : 'block' }} />
          <ModifyFontSizeBig style={{ display: isBig ? 'block' : 'none' }} />
        </Button>

        <Button className="cssHomeHeaderNotificationStyle">
          <BellOutlined onClick={handleOnLinkNotification} />
        </Button>
        <NavLink
          to={PATH.HOME}
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          <Button css={cssHomeBtnStyle}>
            <Home width={30} height={30} />
          </Button>
        </NavLink>

        <NavLink
          to={PATH.MY_ACTIVITY_RECORD}
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          <Button>
            <ActivityRecord width={30} height={30} />
          </Button>
        </NavLink>

        <NavLink
          to={PATH.MY}
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          <Button>
            <UserOutlined />
          </Button>
        </NavLink>
      </Layout.Footer>
      <InstantActivityQRModal
        isOpen={isOpenQR}
        onCancel={handleOnCloseQRModal}
        helpPk={data?.data.body.id}
      />
    </>
  );
};

export default MainFooter;
