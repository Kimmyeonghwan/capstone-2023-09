import { useCallback } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/paths';
import { css } from '@emotion/react';

const FinishJoinPage = () => {
  const navigate = useNavigate(); //history

  const goToHome = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  /*수직 수평 중앙 정렬*/
  const topWrapperCSS = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  `;

  return (
    <Result
      status="success"
      title="회원가입 완료! 타임페이 커뮤니티 가입을 환영합니다 :)"
      //subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button
          type="primary"
          onClick={() => {
            goToHome(PATH.LOGIN);
          }}
        >
          로그인 하기
        </Button>,
      ]}
    />
  );
};

export default FinishJoinPage;
