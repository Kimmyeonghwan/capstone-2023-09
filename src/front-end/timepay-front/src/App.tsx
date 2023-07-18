import BaseLayout from './components/BaseLayout';
import { Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { customTheme } from './styles/constants/customTheme';
import PageRoutes from './pages';
import { PATH } from './utils/paths';
import { RecoilRoot } from 'recoil';
import CategorySelectPage from './pages/CategorySelectPage/CategorySelectPage';
import AgencyEditPage from './pages/AgencyEditPage';
function App() {
  return (
    <RecoilRoot>
      <ConfigProvider theme={customTheme}>
        <Routes>
          <Route path={PATH.LOGIN} element={<PageRoutes.LoginPage />} />
          <Route
            path={PATH.REDIRECT}
            element={<PageRoutes.kakaoRedirectHandler />}
          />

          <Route path={PATH.JOIN} element={<PageRoutes.JoinPage />} />
          <Route
            path={PATH.FINISHJOIN}
            element={<PageRoutes.FinishJoinPage />}
          />
          <Route
            path={PATH.AGENCY_SIGN_IN}
            element={<PageRoutes.AgencySignInPage />}
          />
          <Route
            path={PATH.AGENCY_SIGN_UP}
            element={<PageRoutes.AgencySignUpPage />}
          />
          <Route element={<BaseLayout />}>
            <Route path={PATH.HOME} element={<PageRoutes.HomePage />} />
            <Route path={PATH.SEARCH} element={<PageRoutes.SearchPage />} />
            <Route path={PATH.MY_PAGE} element={<PageRoutes.MyPage />} />
            <Route
              path={PATH.Register_HR}
              element={<PageRoutes.RegisterRequestPage />}
            />
            <Route
              path={PATH.Register_HS}
              element={<PageRoutes.RegisterServePage />}
            />
            <Route
              path={PATH.Register_F}
              element={<PageRoutes.RegisterFreePage />}
            />
            <Route
              path={PATH.NOTIFICATION}
              element={<PageRoutes.PushNotificationPage />}
            />
            <Route path={PATH.Qna_List} element={<PageRoutes.QnaListPage />} />
            <Route
              path={PATH.Qna_Register}
              element={<PageRoutes.QnaRegisterPage />}
            />
            <Route
              path={PATH.Qna_Detail}
              element={<PageRoutes.QnaDetailPage />}
            />
            <Route path={PATH.Posts} element={<PageRoutes.PostPage />} />
            <Route
              path={PATH.Posts_Edit}
              element={<PageRoutes.PostEditPage />}
            />
            <Route
              path={PATH.MY_ACTIVITY_RECORD}
              element={<PageRoutes.ActivityRecordPage />}
            />
            <Route path={PATH.MY} element={<PageRoutes.MyPage />} />
            <Route path={PATH.MY_EDIT} element={<PageRoutes.MyEditPage />} />

            <Route
              path={PATH.MY_VOLUNTEER}
              element={<PageRoutes.MyVolunteerPage />}
            />
            <Route
              path={`${PATH.PAYMENT_CERTIFICATION}/:boardId`}
              element={<PageRoutes.VolunteerCertificationPaymentPage />}
            />
            <Route
              path={PATH.CATEGORY_SELECT}
              element={<CategorySelectPage />}
            />
            <Route path={PATH.AGENCY_EDIT} element={<AgencyEditPage />} />
            <Route
              path={`${PATH.INSTANT_ACTIVITY}/:helpPk`}
              element={<PageRoutes.InstantActivityPage />}
            />
            <Route
              path={PATH.DONATION_BOARD_WRITE}
              element={<PageRoutes.DonationBoardWritePage />}
            />
            <Route
              path={`${PATH.DONATION_BOARD_WRITE}/:boardId`}
              element={<PageRoutes.DonationBoardEditPage />}
            />
            <Route
              path={`${PATH.DONATION_BOARD}/:boardId`}
              element={<PageRoutes.DonationBoardPage />}
            />
            <Route path={PATH.AGENT} element={<PageRoutes.AgentPage />} />
            <Route
              path={PATH.APPLICANT}
              element={<PageRoutes.ApplicantPage />}
            />
          </Route>
        </Routes>
      </ConfigProvider>
    </RecoilRoot>
  );
}

export default App;
