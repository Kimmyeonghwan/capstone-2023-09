import { Button, Form, Input, message } from 'antd';
import { ReactComponent as Logo } from '../../assets/images/timepay-logo.svg';
import { COMMON_COLOR } from '../../styles/constants/colors';
import { useNavigate } from 'react-router-dom';
import {
  cssLoginButtonStyle,
  cssLoginInnerBox,
  cssLoginOuterBox,
} from './Login.styles';
import { usePostLogin } from '../../api/hooks/login';
import { setTokenToCookie } from '../../utils/token';

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const loginMutation = usePostLogin();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinishFailed = (errorInfo: any) => {
    messageApi.open({
      type: 'error',
      content: '로그인 실패!',
    });
    console.log('Failed:', errorInfo);
  };

  const handleOnClickLoginBtn = async (values: any) => {
    await loginMutation.mutateAsync(
      {
        adminName: values.username,
        password: values.password,
      },
      {
        onSuccess: (result) => {
          if (result.data.admin) {
            setTokenToCookie(result.data.jwt, 10);
            messageApi
              .open({
                type: 'success',
                content: '로그인 성공!',
                duration: 1,
              })
              .then(function () {
                result.data.admin.first
                  ? navigate('/password-edit')
                  : navigate(`/post-management`);
              });
          } else {
            console.log(result.data);
            messageApi.open({
              type: 'error',
              content: '비밀번호 오류',
            });
          }
        },
        onError: (err) => {
          messageApi.open({
            type: 'error',
            content: '로그인 실패!',
          });
          console.log(err.response?.status);
        },
      },
    );
  };

  return (
    <div css={cssLoginOuterBox}>
      <div css={cssLoginInnerBox}>
        <Logo fill={COMMON_COLOR.LOGO1} width="378px" height="128.01px" />
        {contextHolder}
        <Form
          form={form}
          name="basic"
          style={{ width: 300 }}
          initialValues={{ remember: true }}
          onFinish={handleOnClickLoginBtn}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
          >
            <Input placeholder="아이디" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
          >
            <Input.Password placeholder="비밀번호" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            {/*로그인토큰 검증 아직 x */}
            <Button type="primary" htmlType="submit" css={cssLoginButtonStyle}>
              로그인
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
