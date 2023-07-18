import BaseLayout from './components/BaseLayout';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { ConfigProvider } from 'antd';
import { customTheme } from './styles/constants/customTheme';
import PageRoutes from './pages';
import { PATH } from './utils/paths';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <ConfigProvider theme={customTheme}>
        <Routes>
          <Route index element={<PageRoutes.LoginPage />} />
          <Route
            path={PATH.PASSWORD_EDIT}
            element={<PageRoutes.PasswordEditPage />}
          />
          <Route element={<BaseLayout />}>
            <Route
              path={PATH.INQUIRY_MANAGEMENT}
              element={<PageRoutes.InquiryManagementPage />}
            />
            <Route
              path={PATH.INQUIRY_DETAIL_MANAGEMENT}
              element={<PageRoutes.InquiryDetailManagementPage />}
            />
            <Route
              path={PATH.USER_MANAGEMENT}
              element={<PageRoutes.UserManagementPage />}
            />
            <Route
              path={PATH.POST_MANAGEMENT}
              element={<PageRoutes.PostManagementPage />}
            />
            <Route
              path={PATH.COMMENT_MANAGEMENT}
              element={<PageRoutes.CommentManagementPage />}
            />
            <Route
              path={PATH.CATEGORY_MANAGEMENT}
              element={<PageRoutes.CategoryManagementPage />}
            />
            <Route
              path={PATH.ADMIN_MANAGEMENT}
              element={<PageRoutes.AdminManagementPage />}
            />
            <Route
              path={PATH.PUSH_MANAGEMENT}
              element={<PageRoutes.PushManagementPage />}
            />
            <Route
              path={PATH.REPORT_MANAGEMENT}
              element={<PageRoutes.ReportManagementPage />}
            />
            <Route
              path={PATH.AGENCY_MANAGEMENT}
              element={<PageRoutes.AgencyManagementPage />}
            />
          </Route>
        </Routes>
      </ConfigProvider>
    </RecoilRoot>
  );
}

export default App;
