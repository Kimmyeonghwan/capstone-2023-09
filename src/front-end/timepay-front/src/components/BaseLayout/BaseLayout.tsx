import { Layout, message } from 'antd';
import { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { headerTitleState, pathToAfterLogin } from '../../states/uiState';
import { PATH } from '../../utils/paths';
import { getTokenFromCookie } from '../../utils/token';
import MainFooter from '../MainFooter';
import MainHeader from '../MainHeader';
import SearchHeader from '../SearchHeader';
import { cssBaseLayoutStyle } from './BaseLayout.styles';

const BaseLayout = () => {
  const token = getTokenFromCookie();
  const navigate = useNavigate();
  const setPathToAfterLogin = useSetRecoilState(pathToAfterLogin);

  const [messageApi, contextHolder] = message.useMessage();

  const headerTitle = useRecoilValue(headerTitleState);
  const location = useLocation();

  const isnoFooter =
    location.pathname === PATH.Register_F ||
    location.pathname === PATH.Register_HR ||
    location.pathname === PATH.Register_HS ||
    location.pathname === PATH.Qna_List ||
    location.pathname === PATH.Qna_Register ||
    location.pathname.includes('/post/') ||
    location.pathname.includes('/edit/') ||
    location.pathname === PATH.AGENCY_SIGN_UP;

  const isNoHeader = useMemo(() => {
    return location.pathname === PATH.HOME;
  }, [location]);

  const isSearch = useMemo(() => {
    return location.pathname === PATH.SEARCH;
  }, [location]);

  const Header = useMemo(() => {
    if (isNoHeader) return;
    if (isSearch) return <SearchHeader />;
    if (headerTitle) return <MainHeader />;
  }, [isNoHeader, isSearch, headerTitle]);

  useEffect(() => {
    if (!token || token === '') {
      setPathToAfterLogin(location.pathname);
      messageApi.open({
        type: 'error',
        content: '로그인후 이용해주세요',
        duration: 1,
        onClose: () => navigate('/'),
      });
    }
  }, [navigate, location, token, messageApi, setPathToAfterLogin]);

  return (
    <Layout css={cssBaseLayoutStyle}>
      {Header}
      {contextHolder}
      <Layout.Content
        className={`main-section-container ${
          isSearch
            ? 'show-search-header'
            : !isNoHeader && !!headerTitle
            ? 'show-header'
            : 'no-header'
        }`}
      >
        <Outlet />
      </Layout.Content>

      {isnoFooter ? null : <MainFooter />}
    </Layout>
  );
};
export default BaseLayout;
