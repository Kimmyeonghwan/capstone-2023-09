import { DoubleLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Typography } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { usePostAgencyLogin } from '../../api/hooks/agency';
import agencyLogo from '../../assets/images/icons/agency-logo.png';
import { agencyState, userState } from '../../states/user';
import { PATH } from '../../utils/paths';
import { passwordRegex } from '../../utils/regex';
import { setTokenToCookie } from '../../utils/token';
import {
  cssAgencySignInPaeStyle,
  cssLinkNormalBtnStyle,
} from './AgencySignInPage.styles';

const AgencySignInPage = () => {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);
  const setAgencyState = useSetRecoilState(agencyState);

  const [messageApi, contextHolder] = message.useMessage();

  const postAgencyLoginMutation = usePostAgencyLogin();

  const handleOnLinkAgencySignUp = useCallback(() => {
    navigate(PATH.AGENCY_SIGN_UP);
  }, [navigate]);

  const passwordRegexRule = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('비밀번호를 입력해 주세요.'));
    }
    if (!passwordRegex.test(value)) {
      return Promise.reject(new Error('비밀번호 형식에 맞게 입력해주세요.'));
    }
    return Promise.resolve();
  };

  const handleOnFinishLogin = useCallback(
    async (values: any) => {
      await postAgencyLoginMutation.mutateAsync(values, {
        onSuccess: (result) => {
          setTokenToCookie(result.data.jwt, 10);
          setAgencyState(result.data.organization);
          setUserState(null);
          messageApi.open({
            type: 'success',
            content: '로그인 성공했습니다.',
            duration: 1,
            onClose: () => navigate(PATH.HOME),
          });
        },
        onError: (err) => {
          console.log(err);
          messageApi.open({
            type: 'error',
            content: (
              <>
                오류 발생: <br />
                {err}
              </>
            ),
          });
        },
      });
    },
    [
      postAgencyLoginMutation,
      messageApi,
      navigate,
      setAgencyState,
      setUserState,
    ],
  );

  return (
    <div css={cssAgencySignInPaeStyle}>
      <Button
        type="link"
        css={cssLinkNormalBtnStyle}
        onClick={() => navigate(PATH.LOGIN)}
      >
        <DoubleLeftOutlined />
        개인 회원 로그인하기
      </Button>
      {contextHolder}
      <div className="title">
        <Typography.Text>모두에게 동일한 시간</Typography.Text>
        <Typography.Text>시간을 거래하는 타임페이</Typography.Text>
      </div>
      <img src={agencyLogo} alt="기관용 로그인" />
      <Typography.Text>기관 사용자 로그인</Typography.Text>
      <Form layout="horizontal" onFinish={handleOnFinishLogin}>
        <Form.Item
          name="id"
          rules={[
            { required: true, message: '아이디를 입력해주세요' },
            { type: 'email', message: '아이디를 이메일 형식으로 입력해주세요' },
          ]}
        >
          <Input style={{ width: 216 }} placeholder="아이디" />
        </Form.Item>
        <Form.Item
          name="pw"
          rules={[
            { required: true, message: '' },
            { validator: passwordRegexRule },
          ]}
        >
          <Input
            style={{ width: 216 }}
            placeholder="비밀번호"
            type="password"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          로그인
        </Button>
      </Form>
      <Button type="link" onClick={handleOnLinkAgencySignUp}>
        회원가입 바로가기
      </Button>
    </div>
  );
};

export default AgencySignInPage;
