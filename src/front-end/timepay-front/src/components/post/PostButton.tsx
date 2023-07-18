import { useState, useCallback, useMemo } from 'react';
import { Button, Modal, Table } from 'antd';
import {
  cssCommentTableStyle,
  cssPostButton,
  cssPostButtons,
} from './PostButton.style';

import {
  usePutBoardStateFinish,
  useGetBoard,
  usePutBoardAdopt,
} from '../../api/hooks/board';
import { useQueryClient } from 'react-query';
import { getStatus } from '../../utils/board';
import { useGetUserInfo } from '../../api/hooks/user';
import { MessageInstance } from 'antd/es/message/interface';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/paths';
import { useGetAppliedComment } from '../../api/hooks/comment';
import { IPostComment } from '../../api/interfaces/IComment';
import dayjs from 'dayjs';

const PostButton = ({ messageApi }: { messageApi: MessageInstance }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const url = window.location.pathname;
  const real_id = url.substring(6);

  const { data: userInfo } = useGetUserInfo();
  const { data } = useGetBoard(parseInt(real_id));
  const { data: appliedComments } = useGetAppliedComment(parseInt(real_id));

  const usePutBoardAdoptMutation = usePutBoardAdopt();
  const usePutBoardStateFinishMutation = usePutBoardStateFinish();

  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState<boolean>(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<IPostComment[]>([]);

  const isAgency = useMemo(() => {
    if (data?.data.organizationName) return true;
    return false;
  }, [data]);

  const isAuthor = useMemo(() => {
    // 게시글 작성자일 때 true
    return isAgency
      ? data?.data.userId === userInfo?.data.body.uid
      : data?.data.userNickname === userInfo?.data.body.nick_name;
  }, [isAgency, userInfo, data]);

  const columns = useMemo(() => {
    return [
      {
        title: '지원자 목록',
        dataIndex: 'content',
        render: (content: string, record: IPostComment) => {
          return (
            <div>
              <div className="comment-user">{record?.userNickname}</div>
              <div className="comment-content">{content}</div>
            </div>
          );
        },
      },
    ];
  }, []);

  const buttonText = useMemo(() => {
    if (data?.data) {
      switch (getStatus(data.data.state)) {
        case '모집중':
          return '선정하기';
        case '모집완료':
          return '활동 완료하기';
        case '활동완료':
          if (isAuthor && data.data.volunteer) return '인증서 지급하기';
          return '활동이 완료된 게시글입니다.';
        default:
          return '';
      }
    } else return '';
  }, [data, isAuthor]);

  const buttonClassName = useMemo(() => {
    if (data?.data) {
      switch (getStatus(data.data.state)) {
        case '모집중':
          return 'apply';
        case '모집완료':
          return 'completed';
        case '활동완료':
          if (isAuthor && data.data.volunteer) return 'link-volunteer';
          return 'theEnd';
        default:
          return 'theEnd';
      }
    } else return 'theEnd';
  }, [isAuthor, data]);

  const buttonDisabled = useMemo(() => {
    // 모집 완료 상태일 때 활동 끝 시간 이후가 아니면 활동 완료를 할 수 없음
    if (
      getStatus(data?.data.state) === '모집완료' &&
      dayjs().isBefore(dayjs(data?.data.endTime, 'YYYY-MM-DDTHH:mm:ss'))
    )
      return true;
    return false;
  }, [data]);

  const handleOnClickPostButton = useCallback(() => {
    if (data?.data) {
      switch (getStatus(data.data.state)) {
        case '모집중':
          setIsAdoptModalOpen(true);
          return;
        case '모집완료':
          if (buttonDisabled)
            Modal.info({
              content: '활동 끝 시간이 지나야지만 활동 완료를 할 수 있습니다.',
            });
          else setIsFinishModalOpen(true); // 모달 열기
          return;
        case '활동완료':
          if (isAuthor && data.data.volunteer)
            return navigate(`${PATH.PAYMENT_CERTIFICATION}/${real_id}`);
          return;
        default:
          return;
      }
    } else return;
  }, [navigate, buttonDisabled, data, real_id, isAuthor]);

  const handleConfirm = useCallback(async () => {
    try {
      if (getStatus(data?.data.state) === '모집중') {
        if (selectedComment && selectedComment.length > 0)
          usePutBoardAdoptMutation.mutateAsync(
            {
              postPk: parseInt(real_id),
              commentsId: selectedComment.map((item) => item.id!),
            },
            {
              onSuccess: () => {
                messageApi.success('선정이 완료되었습니다.');
                queryClient.invalidateQueries({ queryKey: ['useGetBoard'] });
              },
              onError: (error) => {
                console.error('상태 변경 중 오류가 발생했습니다.', error);
              },
            },
          );
      } else if (getStatus(data?.data.state) === '모집완료') {
        usePutBoardStateFinishMutation.mutateAsync(parseInt(real_id), {
          onSuccess: () => {
            messageApi.success('활동이 완료되었습니다.');
            queryClient.invalidateQueries({ queryKey: ['useGetBoard'] });
          },
          onError: (error) => {
            console.error('상태 변경 중 오류가 발생했습니다.', error);
          },
        });
      }
    } catch (error) {
      console.error('상태 변경 중 오류가 발생했습니다.', error);
    } finally {
      setIsAdoptModalOpen(false);
      setIsFinishModalOpen(false);
    }
  }, [
    data,
    messageApi,
    selectedComment,
    usePutBoardAdoptMutation,
    real_id,
    usePutBoardStateFinishMutation,
    queryClient,
  ]);

  const handleCancel = useCallback(() => {
    setIsAdoptModalOpen(false);
    setIsFinishModalOpen(false);
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IPostComment[]) => {
      setSelectedComment(selectedRows);
    },
  };

  return (
    <>
      <div css={cssPostButtons}>
        <Button
          css={cssPostButton}
          onClick={handleOnClickPostButton}
          className={`${buttonClassName} ${
            buttonDisabled ? 'disable' : 'enable'
          }`}
        >
          {buttonText}
        </Button>
      </div>
      <Modal
        title="선정하기"
        open={isAdoptModalOpen}
        onOk={handleConfirm}
        okText="선정 완료"
        cancelText="취소"
        onCancel={handleCancel}
        style={{ fontWeight: 400 }}
      >
        선정은 단 한번만 할 수 있으니 주의해주세요!
        <br />
        <Table
          css={cssCommentTableStyle}
          columns={columns}
          // 유저 아이디 중복 제거(같은 유저 아이디 중 가장 첫번째 댓글만 노출됨.)
          dataSource={appliedComments?.data.filter(
            (item: IPostComment, index: number, array: IPostComment[]) =>
              index === array.findIndex((t) => t.userId === item.userId),
          )}
          rowKey="id"
          bordered={false}
          rowSelection={rowSelection}
        />
        <br />
        현재 보유 타임페이: {userInfo?.data.body.time_pay || 0} TP <br />
        활동 완료 시 소모될 타임페이:{' '}
        {selectedComment.length * (data?.data.pay || 1) || 0} TP
      </Modal>
      <Modal
        title="활동을 완료하시겠습니까?"
        open={isFinishModalOpen}
        onOk={handleConfirm}
        okText="활동 완료"
        cancelText="취소"
        onCancel={handleCancel}
        style={{ fontWeight: 400 }}
      >
        <h3 style={{ fontWeight: 400 }}>
          활동이 종료되었다고 간주되며 <br />
          타임페이가 교환됩니다.
        </h3>
      </Modal>
    </>
  );
};

export default PostButton;
