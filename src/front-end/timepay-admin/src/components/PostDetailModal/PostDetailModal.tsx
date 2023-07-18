import { Button, Modal } from 'antd';
import { useMemo } from 'react';
import { IDealBoard } from '../../api/interfaces/IBoard';
import { cssPostDetailModalStyle } from './PostDetailModal.styles';

interface PostDetailModalProps {
  post?: IDealBoard;
  isOpen: boolean;
  onCancel: () => void;
}
const PostDetailModal = ({ post, isOpen, onCancel }: PostDetailModalProps) => {
  const footer = useMemo(() => {
    return (
      <Button type="primary" onClick={onCancel}>
        확인
      </Button>
    );
  }, [onCancel]);

  return (
    <Modal
      title="게시글 상세정보 조회"
      open={isOpen}
      onOk={onCancel}
      onCancel={onCancel}
      footer={footer}
      width={900}
      css={cssPostDetailModalStyle}
    >
      <div className="post-detail-container">
        <span className="title">제목</span>
        <div className="post-detail-inner-container">{post?.title}</div>
      </div>
      <div className="post-detail-container">
        <span className="title">본문</span>
        <div className="post-detail-inner-container">{post?.content}</div>
      </div>
      <div className="post-detail-container">
        <span className="title">첨부사진</span>
        {post?.dealAttatchments.length === 0
          ? '-'
          : post?.dealAttatchments.map((imgUrl) => (
              <img key={imgUrl} src={imgUrl} alt="첨부" />
            ))}
      </div>
    </Modal>
  );
};
export default PostDetailModal;
