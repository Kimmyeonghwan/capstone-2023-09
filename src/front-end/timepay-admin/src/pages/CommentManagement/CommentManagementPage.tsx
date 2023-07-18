import { Button, Card } from 'antd';
import { useCallback, useState } from 'react';
import { IComment } from '../../api/interfaces/IComment';
import CommentHandleModal from '../../components/CommentHideModal';
import CommentSearchForm from '../../components/CommentSearchForm';
import CommentTable from '../../components/CommentTable';
import { cssCommentManagementPageStyle } from './CommentManagementPage.styles';

const CommentManagementPage = () => {
  const [isOpenHideModal, setIsOpenHideModal] = useState(false);

  const [selectedCommentIds, setSelectedCommentIds] = useState<React.Key[]>();
  const [selectedComments, setSelectedComments] = useState<IComment[]>();

  const handleOnCancelModal = useCallback(() => {
    setIsOpenHideModal(false);
  }, []);

  return (
    <Card title="댓글 관리" css={cssCommentManagementPageStyle}>
      <CommentSearchForm />
      <div className="control-box">
        <Button
          type="primary"
          onClick={() => {
            setIsOpenHideModal(true);
          }}
          disabled={!selectedCommentIds || selectedCommentIds?.length === 0}
        >
          숨김
        </Button>
      </div>
      <CommentTable
        selectedCommentIds={selectedCommentIds}
        setSelectedCommentIds={setSelectedCommentIds}
        setSelectedComments={setSelectedComments}
      />
      <CommentHandleModal
        isOpen={isOpenHideModal}
        onCancel={handleOnCancelModal}
        comments={selectedComments}
      />
    </Card>
  );
};

export default CommentManagementPage;
