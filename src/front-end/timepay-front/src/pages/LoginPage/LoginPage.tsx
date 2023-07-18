import { Button, Space, Typography } from 'antd';
import KAKAO_AUTH_URL from './Authorization_kakao';
import kakao_login_logo from '../../assets/images/icons/kakao_login_medium_wide.png';
import timepayLogo from '../../assets/images/icons/timepayLogo.png';
import {
  cssBottomText,
  cssKakaoLoginBtn,
  cssLinkAgencyBtnStyle,
  cssLogo,
  cssMiddleText,
  cssTopText,
  topWrapperCSS,
} from './Login.styles';
import { DoubleRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/paths';

const LoginPage = () => {
  const navigate = useNavigate();

  const { Text } = Typography;

  return (
    <>
      <Button
        type="link"
        css={cssLinkAgencyBtnStyle}
        onClick={() => navigate(PATH.AGENCY_SIGN_IN)}
      >
        기관 회원 로그인하기
        <DoubleRightOutlined />
      </Button>
      <Space direction="vertical" size="middle" css={topWrapperCSS}>
        <Text css={cssTopText}>모두에게 동일한 시간</Text>
        <Text css={cssMiddleText}>시간을 거래하는 타임페이</Text>
        <img src={timepayLogo} className="logo" css={cssLogo} alt="타임페이" />
        <Text css={cssBottomText}>나의 시간을 가치있게 써보아요</Text>

        <Button
          type="link"
          ghost
          block
          className="kakaoBtn"
          href={KAKAO_AUTH_URL}
          icon={
            <img width={300} src={kakao_login_logo} alt="카카오로 로그인" />
          }
          css={cssKakaoLoginBtn}
        ></Button>
      </Space>
    </>
  );
};

export default LoginPage;
