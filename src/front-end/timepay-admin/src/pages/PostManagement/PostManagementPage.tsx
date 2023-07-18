import { Button, Card } from 'antd';
import { useCallback, useState } from 'react';
import { IDealBoard } from '../../api/interfaces/IBoard';
import PostHandleModal from '../../components/PostHandleModal';
import PostSearchForm from '../../components/PostSearchForm';
import PostTable from '../../components/PostTable';
import { cssPostManagementPageStyle } from './PostManagementPage.styles';

const PostManagementPage = () => {
  const [isOpenHideModal, setIsOpenHideModal] = useState(false);
  const [isOpenChangeStatusModal, setIsOpenChangeStatusModal] = useState(false);

  const [selectedPostIds, setSelectedPostIds] = useState<React.Key[]>();
  const [selectedPosts, setSelectedPosts] = useState<IDealBoard[]>();

  const handleOnCancelModal = useCallback(() => {
    setIsOpenChangeStatusModal(false);
    setIsOpenHideModal(false);
  }, []);

  return (
    <Card title="게시글 관리" css={cssPostManagementPageStyle}>
      <PostSearchForm />
      <div className="control-box">
        <Button
          type="primary"
          onClick={() => {
            setIsOpenHideModal(true);
          }}
          disabled={!selectedPostIds || selectedPostIds?.length === 0}
        >
          숨김
        </Button>
        <Button
          onClick={() => {
            setIsOpenChangeStatusModal(true);
          }}
          disabled={!selectedPostIds || selectedPostIds?.length === 0}
        >
          상태변경
        </Button>
      </div>
      <PostTable
        selectedPostIds={selectedPostIds}
        setSelectedPostIds={setSelectedPostIds}
        setSelectedPosts={setSelectedPosts}
      />
      <PostHandleModal
        posts={selectedPosts}
        isOpen={isOpenHideModal}
        type="hide"
        onCancel={handleOnCancelModal}
      />
      <PostHandleModal
        posts={selectedPosts}
        isOpen={isOpenChangeStatusModal}
        type="changeStatus"
        onCancel={handleOnCancelModal}
      />
    </Card>
  );
};

export default PostManagementPage;
