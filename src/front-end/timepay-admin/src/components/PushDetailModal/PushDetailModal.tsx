import { Button, Modal } from 'antd';
import { useMemo } from 'react';
import { INotification } from '../../api/interfaces/INotification';
import { cssPushDetailModalStyle } from './PushDetailModal.styles';

interface PushDetailModalProps {
  push?: INotification;
  isOpen: boolean;
  onCancel: () => void;
}
const PushDetailModal = ({ push, isOpen, onCancel }: PushDetailModalProps) => {
  const footer = useMemo(() => {
    return (
      <Button type="primary" onClick={onCancel}>
        확인
      </Button>
    );
  }, [onCancel]);

  return (
    <Modal
      title="공지 조회"
      open={isOpen}
      onOk={onCancel}
      onCancel={onCancel}
      footer={footer}
      width={900}
      css={cssPushDetailModalStyle}
    >
      <div className="post-detail-container">
        <span className="title">제목</span>
        <div className="post-detail-inner-container">{push?.title}</div>
      </div>
      <div className="post-detail-container">
        <span className="title">본문</span>
        <div className="post-detail-inner-container">{push?.content}</div>
      </div>
    </Modal>
  );
};
export default PushDetailModal;
