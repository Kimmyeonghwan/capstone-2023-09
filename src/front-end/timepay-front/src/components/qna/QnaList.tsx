import { List } from 'antd';
import { IQna } from '../../api/interfaces/IQna';
import { COMMON_COLOR } from '../../styles/constants/colors';
import { cssLineStyle, cssQnaListStyle } from './QnaList.style';
import { useNavigate } from 'react-router-dom';

interface QnaListProps {
  qna?: IQna;
}

const QnaList = ({ qna }: QnaListProps) => {
  const navigate = useNavigate();

  const color =
    qna?.status === '답변완료'
      ? `${COMMON_COLOR.MAIN3}`
      : `${COMMON_COLOR.FONT3}`;

  const handlePageChange = () => {
    navigate(`/inquire/${qna?.qnaId}`, {
      state: {
        title: qna?.title,
        content: qna?.content,
        createdAt: qna?.createdAt,
        status: qna?.status,
        category: qna?.category,
      },
    });
  };

  return (
    <>
      <List.Item css={cssQnaListStyle} onClick={handlePageChange}>
        <div className="qnaStatus" style={{ color }}>
          {qna?.status}
        </div>
        <div className="qnaCategory">{qna?.category}</div>
        <div className="qnaTitle">{qna?.title}</div>
      </List.Item>
      <List.Item.Meta description={<hr css={cssLineStyle} />} />
    </>
  );
};

export default QnaList;
