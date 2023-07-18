import { Button, message, Modal, Table } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import { cssCommentHideModalStyle } from './CommentHideModal.styles';
import { IComment } from '../../api/interfaces/IComment';
import { useQueryClient } from 'react-query';
import { usePatchComment } from '../../api/hooks/comment';

export interface CommentHideModalProps {
  comments?: IComment[];
  isOpen: boolean;
  onCancel: () => void;
}
const CommentHideModal = ({
  comments,
  isOpen,
  onCancel,
}: CommentHideModalProps) => {
  const queryClient = useQueryClient();
  const patchCommentMutation = usePatchComment();

  const [messageApi, contextHolder] = message.useMessage();

  // @ts-ignore
  const columns: ColumnType<IComment> = useMemo(() => {
    return [
      {
        title: '댓글 번호',
        key: 'commentId',
        dataIndex: 'commentId',
        width: 60,
        sorter: (a: IComment, b: IComment) => b.commentId - a.commentId,
      },
      {
        title: '게시글 번호',
        key: 'originBoardId',
        dataIndex: 'originBoardId',
        width: 70,
        sorter: (a: IComment, b: IComment) => b.originBoardId - a.originBoardId,
      },
      {
        title: '작성자 이름',
        key: 'writerName',
        dataIndex: 'writerName',
        width: 100,
        align: 'center',
      },
      {
        title: '작성자 회원번호',
        key: 'writerId',
        dataIndex: 'writerId',
        width: 110,
        sorter: (a: IComment, b: IComment) => b.writerId - a.writerId,
      },
      {
        title: '작성일시',
        key: 'writtenTime',
        dataIndex: 'writtenTime',
        width: 140,
        align: 'center',
        sorter: (a: IComment, b: IComment) =>
          dayjs(a.writtenTime).isAfter(dayjs(b.writtenTime)),
      },
      {
        title: '제목',
        key: 'content',
        dataIndex: 'content',
        width: 300,
        align: 'left',
      },
    ];
  }, []);

  const handleOnSubmit = useCallback(() => {
    Modal.confirm({
      content: '정말 숨김 처리하시겠습니까?',
      okText: '확인',
      cancelText: '취소',
      onOk: async () => {
        if (comments && comments.length > 0)
          await patchCommentMutation.mutateAsync(
            { commentIds: comments?.map((comment) => comment.commentId) },
            {
              onSuccess: async (data) => {
                messageApi.open({
                  type: 'success',
                  content: '숨김 처리 완료되었습니다.',
                });
                await queryClient.invalidateQueries('useGetComments');
              },
              onError: (err) => {
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
              onSettled: () => {
                onCancel();
              },
            },
          );
      },
    });
  }, [onCancel, queryClient, messageApi, comments, patchCommentMutation]);

  const footer = useMemo(() => {
    return (
      <>
        <Button onClick={onCancel}>취소</Button>
        <Button onClick={() => handleOnSubmit()} type="primary">
          숨김 처리
        </Button>
      </>
    );
  }, [onCancel, handleOnSubmit]);

  return (
    <Modal
      title="댓글 숨김 처리"
      onCancel={onCancel}
      open={isOpen}
      footer={footer}
      css={cssCommentHideModalStyle}
    >
      {contextHolder}
      <div className="comments-info">
        <span>총 {comments?.length} 개</span>
      </div>
      <Table
        //@ts-ignore
        columns={columns}
        rowKey="commentId"
        dataSource={comments}
        scroll={{ x: 1000, y: 300 }}
        pagination={false}
      />
    </Modal>
  );
};
export default CommentHideModal;
