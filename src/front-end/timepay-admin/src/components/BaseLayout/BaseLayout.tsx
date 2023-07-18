import {
  ContainerOutlined,
  FrownOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  NotificationOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  OrderedListOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, MenuProps, message } from 'antd';
import { useMemo, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/paths';
import { cssBaseLayoutStyle } from './BaseLayout.styles';
import { ReactComponent as Logo } from '../../assets/images/timepay-logo.svg';
import { COMMON_COLOR } from '../../styles/constants/colors';
import { useLogout } from '../../api/hooks/login';
import { getTokenFromCookie, setTokenToCookie } from '../../utils/token';

const BaseLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const logoutMutation = useLogout();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const token = getTokenFromCookie();
  if (!token || token === 'undefined') {
    messageApi
      .open({
        type: 'error',
        content: '로그인후 이용해주세요',
        duration: 1,
      })
      .then(function () {
        navigate('/');
      });
  }

  const onClickLogout = async (values: any) => {
    await logoutMutation.mutateAsync(
      {},
      {
        onSuccess: (result) => {
          setTokenToCookie(result.data.jwt, 0);
          messageApi
            .open({
              type: 'success',
              content: '로그아웃 완료!',
              duration: 1,
            })
            .then(function () {
              navigate('/');
            });
        },
        onError: (err) => {
          console.log(err.response?.status);
        },
      },
    );
  };

  const items: Required<MenuProps>['items'] = useMemo(() => {
    return [
      {
        key: PATH.POST_MANAGEMENT,
        label: '게시글 관리',
        icon: (
          <Link to={PATH.POST_MANAGEMENT}>
            <ContainerOutlined />
          </Link>
        ),
      },
      {
        key: PATH.COMMENT_MANAGEMENT,
        label: '댓글 관리',
        icon: (
          <Link to={PATH.COMMENT_MANAGEMENT}>
            <MessageOutlined />
          </Link>
        ),
      },
      {
        key: PATH.INQUIRY_MANAGEMENT,
        label: '문의 관리',
        icon: (
          <Link to={PATH.INQUIRY_MANAGEMENT}>
            <MailOutlined />
          </Link>
        ),
      },
      {
        key: PATH.USER_MANAGEMENT,
        label: '회원 관리',
        icon: (
          <Link to={PATH.USER_MANAGEMENT}>
            <TeamOutlined />
          </Link>
        ),
      },
      {
        key: PATH.AGENCY_MANAGEMENT,
        label: '기관 관리',
        icon: (
          <Link to={PATH.AGENCY_MANAGEMENT}>
            <BankOutlined />
          </Link>
        ),
      },
      {
        key: PATH.REPORT_MANAGEMENT,
        label: '신고 관리',
        icon: (
          <Link to={PATH.REPORT_MANAGEMENT}>
            <FrownOutlined />
          </Link>
        ),
      },
      {
        key: PATH.PUSH_MANAGEMENT,
        label: 'PUSH 관리',
        icon: (
          <Link to={PATH.PUSH_MANAGEMENT}>
            <NotificationOutlined />
          </Link>
        ),
      },
      {
        key: PATH.ADMIN_MANAGEMENT,
        label: '관리자 관리',
        icon: (
          <Link to={PATH.ADMIN_MANAGEMENT}>
            <UserSwitchOutlined />
          </Link>
        ),
      },
      {
        key: PATH.CATEGORY_MANAGEMENT,
        label: '카테고리 관리',
        icon: (
          <Link to={PATH.CATEGORY_MANAGEMENT}>
            <OrderedListOutlined />
          </Link>
        ),
      },
    ];
  }, []);

  return (
    <Layout css={cssBaseLayoutStyle}>
      <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo
          fill={COMMON_COLOR.WHITE}
          width="101"
          height="34"
          className={`logo ${collapsed ? 'collapsed' : 'no-collapsed'}`}
        />
        {contextHolder}
        <Menu
          defaultSelectedKeys={[window.location.pathname]}
          mode="inline"
          items={items}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header>
          <Menu theme="dark" mode="horizontal">
            <div
              className="menu-collapse-trigger-btn"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <div className="logoutBtn">
              <Button ghost onClick={onClickLogout}>
                로그아웃
              </Button>
            </div>
          </Menu>
        </Layout.Header>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
export default BaseLayout;
