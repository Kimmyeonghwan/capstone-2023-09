import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';
import { ReactComponent as BackArrow } from '../../assets/images/icons/header-back-arrow.svg';
import { cssMainHeaderStyle } from '../../components/MainHeader/MainHeader.styles';
import {
  cssQnaDetailStyle,
  cssQnaDetail2Style,
  cssLine2Style,
  cssQnaDeleteStyle,
  cssDeleteBtnStyle,
} from './QnaDetailPage.style';
import { COMMON_COLOR } from '../../styles/constants/colors';
import { Button } from 'antd';

const QnaDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, content, createdAt, category, attachment, status } =
    location.state;

  const color =
    status === '답변완료' ? `${COMMON_COLOR.MAIN3}` : `${COMMON_COLOR.FONT3}`;

  const handleClickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <>
      <div css={cssMainHeaderStyle}>
        <BackArrow onClick={handleClickBack} />
        <span>문의하기</span>
      </div>
      <div css={cssQnaDetailStyle}>
        <div css={cssQnaDeleteStyle}>
          <Button css={cssDeleteBtnStyle}>삭제</Button>
        </div>
        <div css={cssQnaDetail2Style}>
          <h1 style={{ color }}>{status} </h1>
          <h5> - {category}</h5>
        </div>
        <p>문의 날짜 : {createdAt}</p>
        <div css={cssLine2Style} />
        <h2>{title}</h2>
        <div css={cssLine2Style} />
        <h6>{content}</h6>
        <div>{attachment}</div>
      </div>
    </>
  );
};

export default QnaDetailPage;
