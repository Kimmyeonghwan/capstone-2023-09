import React, { useCallback, useState, useMemo } from 'react';
import {
  cssComments,
  cssMyCommentItem,
  cssAppliedCommentItem,
  cssOtherCommentItem,
  cssPostDetailProfile,
  cssCommentUser,
  cssEditDelete,
  cssCommentText,
  cssCommentProfile,
} from './Item.style';
import { Form, Input, Modal, Button } from 'antd';
import { useDeleteComment } from '../../api/hooks/comment';
import { useQueryClient } from 'react-query';
import { useGetUserInfo } from '../../api/hooks/user';

const Item = ({ a, c, messageApi, onShowProfile }: any) => {
  const queryClient = useQueryClient();

  const url = window.location.pathname;
  const real_id = url.substring(6);
  const { data: userInfo } = useGetUserInfo();
  const userNickname = useMemo(() => {
    return userInfo?.data.body.nick_name;
  }, [userInfo]);

  const isAgency = useMemo(() => {
    if (userInfo?.data.body.manager_name) return true;
    return false;
  }, [userInfo]);
  const isCommentAuthor = useMemo(() => {
    // 댓글 작성자일 때 true
    return isAgency
      ? c.userId === userInfo?.data.body.uid
      : c.userNickname === userNickname;
  }, [isAgency, c, userInfo, userNickname]);

  // 수정 기능
  const { TextArea } = Input;
  const [isOpenReportModal, setIsOpenReportModal] = useState(false);

  // 수정 기능
  const showReportModal = () => {
    setIsOpenReportModal(true);
  };
  const onOk = () => {
    setIsOpenReportModal(false);
  };
  const onCancel = () => {
    setIsOpenReportModal(false);
  };

  const useDeleteCommentMutation = useDeleteComment();

  const handleDeleteComment = useCallback(
    async (id: number) => {
      await useDeleteCommentMutation.mutateAsync(
        { postPk: parseInt(real_id), id },
        {
          onSuccess: (data) => {
            messageApi.success('댓글이 성공적으로 삭제되었습니다.');
            queryClient.invalidateQueries({
              queryKey: ['useGetBoard'],
            });
            queryClient.invalidateQueries({
              queryKey: ['useGetComments'],
            });
          },
          onError: (error) => {
            console.log('ERROR');
            messageApi.error('댓글 삭제 중 오류가 발생했습니다.');
          },
        },
      );
    },
    [messageApi, real_id, queryClient, useDeleteCommentMutation],
  );

  return (
    <div css={cssComments}>
      <div css={cssEditDelete}>
        {isCommentAuthor ? (
          <Button className="edit">수정</Button>
        ) : (
          <Button className="edit" onClick={showReportModal}>
            신고
          </Button>
        )}
        <Modal
          title="댓글 신고하기"
          open={isOpenReportModal}
          onOk={onOk}
          onCancel={onCancel}
          footer={null}
        >
          <Form style={{ width: '100%' }}>
            <Form.Item
              name="content"
              label="신고사유"
              rules={[{ required: true, message: '신고 사유를 적어주세요.' }]}
            >
              <TextArea
                rows={10}
                maxLength={100}
                style={{ resize: 'none', fontSize: 20 }}
              />
            </Form.Item>
            <div className="control-box">
              <Button style={{ marginRight: 20 }} onClick={onCancel}>
                취소
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ resize: 'none' }}
              >
                신고하기
              </Button>
            </div>
          </Form>
        </Modal>

        {isCommentAuthor && (
          <>
            <div className="sidebar">|</div>
            <Button
              className="delete"
              onClick={() => handleDeleteComment(c.id)}
            >
              삭제
            </Button>
          </>
        )}
      </div>

      <div
        css={
          isCommentAuthor
            ? cssMyCommentItem
            : c.applied
            ? cssAppliedCommentItem
            : cssOtherCommentItem
        }
      >
        <div css={cssPostDetailProfile} onClick={() => onShowProfile(c.userId)}>
          <div css={cssCommentProfile}>
            <img
              src={
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
              }
              className="MyProfileImage"
              alt="내 프로필"
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </div>
          <div css={cssCommentUser}>{c.userNickname}</div>
        </div>

        <div css={cssCommentText}>
          <span id="commentsSpan">{c.content}</span>
        </div>
      </div>
    </div>
  );
};

export default Item;
