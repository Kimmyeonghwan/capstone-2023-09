import { FloatButton } from 'antd';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ReactComponent as BackArrow } from '../../assets/images/icons/header-back-arrow.svg';
import { cssMainHeaderStyle } from '../../components/MainHeader/MainHeader.styles';
import { EditFilled } from '@ant-design/icons';
import { IQna } from '../../api/interfaces/IQna';
import { useGetInquiry } from '../../api/hooks/inquiry';

import QnaList from '../../components/qna/QnaList';

const QnaListPage = () => {
  const data = useGetInquiry();
  const inquiry = data.data;

  useEffect(() => {
    console.log(data);
    console.log(inquiry);
  });

  /*
  const inquiries = useMemo(() => {
    return data?.data.content.map((qna) => ({
      ...qna,
      type: 'qna',
    }));
  }, [qna]);
*/

  const dummyData: (IQna | undefined)[] = [
    {
      qnaId: 1,
      createdAt: '2023/03/23 15:00',
      title: '로그인 오류',
      status: '답변완료',
      category: '버그',
      content:
        '로그인 버튼이 안 눌려요. 뭐가 문젠지 모르겠어요. 저 잘못한 거 없어요. 왜 안돼!!',
      user: {
        userPk: 1,
        name: '세윤',
        sex: '여자',
        birthday: '2000/01/15 00:00',
        profileMessage: '언니 더미데이터 좀 복붙할게용,,',
        nickname: '세윤하이',
        region: '서울시 성북구',
        phoneNumber: '01012345678',
        accountEmail: 'yoony0193@gmail.com',
        isAdmin: false,
        createdAt: '2022/02/14: 14:00',
      },
    },
    {
      qnaId: 2,
      createdAt: '2023/03/23 15:00',
      title: '비밀번호 까먹었어요',
      status: '답변완료',
      category: '건의사항',
      content:
        '로그인 버튼이 안 눌려요. 뭐가 문젠지 모르겠어요. 저 잘못한 거 없어요. 왜 안돼!!',
      user: {
        userPk: 1,
        name: '세윤',
        sex: '여자',
        birthday: '2000/01/15 00:00',
        profileMessage: '언니 더미데이터 좀 복붙할게용,,',
        nickname: '세윤하이',
        region: '서울시 성북구',
        phoneNumber: '01012345678',
        accountEmail: 'yoony0193@gmail.com',
        isAdmin: false,
        createdAt: '2022/02/14: 14:00',
      },
    },
    {
      qnaId: 3,
      createdAt: '2023/03/23 15:00',
      title: '매칭 완료했는데 타임페이 지급이 안 됐어요',
      status: '답변완료',
      category: '버그',
      content:
        '로그인 버튼이 안 눌려요. 뭐가 문젠지 모르겠어요. 저 잘못한 거 없어요. 왜 안돼!!',
      user: {
        userPk: 1,
        name: '세윤',
        sex: '여자',
        birthday: '2000/01/15 00:00',
        profileMessage: '언니 더미데이터 좀 복붙할게용,,',
        nickname: '세윤하이',
        region: '서울시 성북구',
        phoneNumber: '01012345678',
        accountEmail: 'yoony0193@gmail.com',
        isAdmin: false,
        createdAt: '2022/02/14: 14:00',
      },
    },
    {
      qnaId: 4,
      createdAt: '2023/03/23 15:00',
      title: '로그인 오류',
      status: '답변대기',
      category: '버그',
      content:
        '로그인 버튼이 안 눌려요. 뭐가 문젠지 모르겠어요. 저 잘못한 거 없어요. 왜 안돼!!',
      user: {
        userPk: 1,
        name: '세윤',
        sex: '여자',
        birthday: '2000/01/15 00:00',
        profileMessage: '언니 더미데이터 좀 복붙할게용,,',
        nickname: '세윤하이',
        region: '서울시 성북구',
        phoneNumber: '01012345678',
        accountEmail: 'yoony0193@gmail.com',
        isAdmin: false,
        createdAt: '2022/02/14: 14:00',
      },
    },
  ];

  const navigate = useNavigate();
  const handleClickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div>
      <div css={cssMainHeaderStyle}>
        <BackArrow onClick={handleClickBack} />
        <span>문의하기</span>
      </div>
      <Link to="/inquire/register">
        <FloatButton
          shape="circle"
          type="primary"
          style={{ right: 24, width: 70, height: 70 }}
          icon={<EditFilled style={{ fontSize: 35, marginLeft: -8 }} />}
        />
      </Link>
      <div style={{ marginTop: 70 }}>
        {dummyData.map((qna, qnaId) => (
          <QnaList key={qnaId} qna={qna} />
        ))}
      </div>
    </div>
  );
};
export default QnaListPage;
