import { Button, message, Modal, Select, Table } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { useCallback, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { cssPostHandleModalStyle } from './PostHandleModal.styles';
import { IDealBoard } from '../../api/interfaces/IBoard';
import { getStatus } from '../../utils/board';
import { usePostBoardHidden, usePostBoardStatus } from '../../api/hooks/boards';
import { useQueryClient } from 'react-query';

export interface PostHandleModalProps {
  type: 'hide' | 'changeStatus';
  posts?: IDealBoard[];
  isOpen: boolean;
  onCancel: () => void;
}
const PostHandleModal = ({
  type,
  posts,
  isOpen,
  onCancel,
}: PostHandleModalProps) => {
  const queryClient = useQueryClient();

  const postBoardHiddenMutation = usePostBoardHidden();
  const postBoardStatusMutation = usePostBoardStatus();

  const [messageApi, contextHolder] = message.useMessage();
  const [status, setStatus] = useState<string>();

  // @ts-ignore
  const columns: ColumnType<IDealBoard> = useMemo(() => {
    return [
      {
        title: '게시글 번호',
        key: 'd_boardId',
        dataIndex: 'd_boardId',
        width: 70,
        sorter: (a: IDealBoard, b: IDealBoard) => b.d_boardId - a.d_boardId,
      },
      {
        title: '상태',
        key: 'boardStatus',
        dataIndex: 'boardStatus',
        width: 100,
        align: 'center',
        filters: [
          { text: '매칭중', value: 'MATCHING_IN_PROGRESS' },
          { text: '매칭완료', value: 'MATCHING_COMPLETE' },
          { text: '활동중', value: 'ACTIVITY_IN_PROGRESS' },
          { text: '활동완료', value: 'ACTIVITY_COMPLETE' },
          { text: '활동취소', value: 'ACTIVITY_CANCEL' },
          { text: '활동지연', value: 'ACTIVITY_DELAY' },
        ],
        onFilter: (value: string, record: IDealBoard) =>
          record.boardStatus.indexOf(value) === 0,
        render: (boardStatus: string) => getStatus(boardStatus),
      },
      {
        title: '작성자 이름',
        key: 'userName',
        dataIndex: 'userName',
        width: 100,
        align: 'center',
      },
      {
        title: '작성자 닉네임',
        key: 'userNickname',
        dataIndex: 'userNickname',
        width: 100,
        align: 'center',
      },
      {
        title: '작성일시',
        key: 'createdAt',
        dataIndex: 'createdAt',
        width: 140,
        align: 'center',
        sorter: (a: IDealBoard, b: IDealBoard) =>
          dayjs(a.createdAt).isAfter(dayjs(b.createdAt)),
      },
      {
        title: '제목',
        key: 'title',
        dataIndex: 'title',
        width: 300,
        align: 'left',
      },
    ];
  }, []);

  const handleOnSubmit = useCallback(() => {
    if (type === 'changeStatus') {
      if (!!status && posts)
        Modal.confirm({
          type: 'warning',
          content: '정말 상태를 변경하시겠습니까?',
          okText: '확인',
          cancelText: '취소',
          onOk: async () => {
            await postBoardStatusMutation.mutateAsync(
              {
                ids: posts?.map((item) => item.d_boardId),
                status: status,
              },
              {
                onSuccess: (data) => {
                  setStatus(undefined);
                  messageApi.open({
                    type: 'success',
                    content: '상태 변경이 완료되었습니다.',
                  });
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
                onSettled: async (data) => {
                  onCancel();
                  await queryClient.invalidateQueries({
                    queryKey: ['useGetBoards'],
                  });
                },
              },
            );
          },
        });
      else {
        Modal.error({
          content: '변경할 상태를 선택해주세요',
          okText: '확인',
        });
      }
    } else {
      if (posts)
        Modal.confirm({
          content: '정말 숨김 처리하시겠습니까?',
          okText: '확인',
          cancelText: '취소',
          onOk: async () =>
            await postBoardHiddenMutation.mutateAsync(
              posts?.map((item) => item.d_boardId),
              {
                onSuccess: (data) => {
                  messageApi.open({
                    type: 'success',
                    content: '숨김 처리 완료되었습니다.',
                  });
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
                onSettled: async (data) => {
                  onCancel();
                  await queryClient.invalidateQueries({
                    queryKey: ['useGetBoards'],
                  });
                },
              },
            ),
        });
    }
  }, [
    type,
    onCancel,
    postBoardHiddenMutation,
    postBoardStatusMutation,
    posts,
    queryClient,
    status,
    messageApi,
  ]);

  const footer = useMemo(() => {
    return (
      <>
        <Button onClick={onCancel}>취소</Button>
        <Button onClick={() => handleOnSubmit()} type="primary">
          {type === 'changeStatus' ? '상태 변경' : '숨김 처리'}
        </Button>
      </>
    );
  }, [type, onCancel, handleOnSubmit]);

  return (
    <Modal
      title={type === 'changeStatus' ? '게시글 상태 변경' : '게시글 숨김 처리'}
      onCancel={onCancel}
      open={isOpen}
      footer={footer}
      css={cssPostHandleModalStyle}
    >
      {contextHolder}
      <div className="posts-info">
        {type === 'changeStatus' ? (
          <Select
            value={status}
            onChange={(value: string) => setStatus(value)}
            placeholder="상태 선택"
          >
            <Select.Option value="MATCHING_IN_PROGRESS">매칭중</Select.Option>
            <Select.Option value="MATCHING_COMPLETE">매칭완료</Select.Option>
            <Select.Option value="ACTIVITY_IN_PROGRESS">활동중</Select.Option>
            <Select.Option value="ACTIVITY_COMPLETE">활동완료</Select.Option>
            <Select.Option value="ACTIVITY_CANCEL">활동취소</Select.Option>
            <Select.Option value="ACTIVITY_DELAY">활동지연</Select.Option>
          </Select>
        ) : (
          <span></span>
        )}
        <span>총 {posts?.length} 개</span>
      </div>
      <Table
        //@ts-ignore
        columns={columns}
        rowKey="d_boardId"
        dataSource={posts}
        scroll={{ x: 1000, y: 300 }}
        pagination={false}
      />
    </Modal>
  );
};
export default PostHandleModal;
