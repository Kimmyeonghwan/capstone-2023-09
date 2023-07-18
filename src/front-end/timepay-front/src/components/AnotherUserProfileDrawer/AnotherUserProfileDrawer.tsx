import { Drawer, Pagination, Spin, Tabs, TabsProps } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import {
  useGetUserBoards,
  useGetUserComments,
  useGetUserInfo,
} from '../../api/hooks/user';
import {
  IGetUserBoardRequest,
  IGetUserCommentRequest,
} from '../../api/interfaces/IUser';
import useFontSize from '../../hooks/useFontSize';
import { cssTabStyle } from '../../styles/constants/tabStyle';
import ActivityCommentCard from '../ActivityCommentCard';
import ActivityPostCard from '../ActivityPostCard';
import {
  cssAnotherUserProfileDrawerStyle,
  cssNothingStyle,
  cssSpinStyle,
} from './AnotherUserProfileDrawer.styles';

interface AnotherUserProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  userId?: number;
}
const AnotherUserProfileDrawer = ({
  open,
  onClose,
  userId,
}: AnotherUserProfileDrawerProps) => {
  // api 합칠 때 user와 user의 활동기록을 api 로 받아오게 처리할 예정
  const { scaleValue } = useFontSize();

  const [boardSearchValue, setBoardSearchValue] =
    useState<IGetUserBoardRequest>({
      pageIndex: 0,
      pageSize: 5,
    });

  const [commentSearchValue, setCommentSearchValue] =
    useState<IGetUserCommentRequest>({
      pageIndex: 0,
      pageSize: 5,
    });

  const { data: userInfo, isLoading: isLoadingUserInfo } = useGetUserInfo(
    userId,
    open,
  );
  const { data: boards, isLoading: isLoadingBoards } = useGetUserBoards(
    boardSearchValue,
    userId,
    open,
  );
  const { data: comments, isLoading: isLoadingComments } = useGetUserComments(
    commentSearchValue,
    userId,
    open,
  );

  const ACTIVITY_TAB_KEYS = useMemo(() => {
    return { POST: '게시글', COMMENT: '댓글' } as const;
  }, []);

  const handleOnChangePageBoard = useCallback(
    (page: number, pageSize: number) => {
      // 옵션 검색 시 값이 바뀔 때마다 바로 api 호출
      setBoardSearchValue({
        ...boardSearchValue,
        pageIndex: page - 1,
      });
    },
    [boardSearchValue],
  );

  const handleOnChangePageComment = useCallback(
    (page: number, pageSize: number) => {
      // 옵션 검색 시 값이 바뀔 때마다 바로 api 호출
      setCommentSearchValue({
        ...commentSearchValue,
        pageIndex: page - 1,
      });
    },
    [commentSearchValue],
  );

  const isAgency = useMemo(() => {
    if (userInfo?.data.body.manager_name) return true;
    return false;
  }, [userInfo]);

  const items: TabsProps['items'] = useMemo(() => {
    return [
      {
        key: ACTIVITY_TAB_KEYS.POST,
        label: ACTIVITY_TAB_KEYS.POST,
        children:
          !isLoadingBoards && boards?.data ? (
            boards.data.body.deal_boards.totalElements > 0 ? (
              <div className="activity-list-container">
                <div className="activity-list">
                  {boards.data.body.deal_boards.content?.map((post) => (
                    <ActivityPostCard key={post.d_boardId} post={post} />
                  ))}
                </div>
                <Pagination
                  pageSize={5}
                  total={boards.data.body.deal_boards.totalElements}
                  current={(boardSearchValue.pageIndex || 0) + 1}
                  onChange={handleOnChangePageBoard}
                />
              </div>
            ) : (
              <div css={cssNothingStyle(scaleValue)}>
                <span className="emoji">😅</span>
                <span>아직 작성한 게시글이 없습니다.</span>
              </div>
            )
          ) : (
            <Spin size="large" css={cssSpinStyle} />
          ),
      },
      {
        key: ACTIVITY_TAB_KEYS.COMMENT,
        label: ACTIVITY_TAB_KEYS.COMMENT,
        children:
          !isLoadingComments && comments?.data ? (
            comments.data.body.totalElements > 0 ? (
              <div className="activity-list-container">
                <div className="activity-list">
                  {comments?.data.body.content?.map((comment) => (
                    <ActivityCommentCard
                      key={comment.commentId}
                      comment={comment}
                    />
                  ))}
                </div>
                <Pagination
                  current={(commentSearchValue.pageIndex || 0) + 1}
                  total={comments?.data.body.totalElements}
                  defaultCurrent={1}
                  onChange={handleOnChangePageComment}
                />
              </div>
            ) : (
              <div css={cssNothingStyle(scaleValue)}>
                <span className="emoji">😅</span>
                <span>아직 작성한 댓글이 없습니다.</span>
              </div>
            )
          ) : (
            <Spin size="large" css={cssSpinStyle} />
          ),
      },
    ];
  }, [
    ACTIVITY_TAB_KEYS,
    boards,
    comments,
    handleOnChangePageBoard,
    handleOnChangePageComment,
    boardSearchValue,
    commentSearchValue,
    isLoadingBoards,
    isLoadingComments,
    scaleValue,
  ]);

  return (
    <Drawer
      css={cssAnotherUserProfileDrawerStyle}
      closable
      placement="bottom"
      open={open}
      onClose={onClose}
      height={770}
      title={null}
      contentWrapperStyle={{ borderRadius: '20px 20px 0 0' }}
    >
      {!isLoadingUserInfo && userInfo && userInfo.data && userId ? (
        <div className="another-user-profile-container">
          <div className="profile-container">
            <img
              src={
                userInfo.data.body.image_url &&
                userInfo.data.body.image_url !== 'none'
                  ? userInfo.data.body.image_url
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
              }
              alt="프로필 이미지"
              width="70px"
              height="70px"
            />
            {isAgency ? (
              <div className="nickname-userPk-container">
                <span className="nickname">
                  {userInfo.data.body.organization_name}
                  <span className="agency">기관</span>
                </span>
                <span className="userPk">#{userInfo.data.body.uid}</span>
              </div>
            ) : (
              <div className="nickname-userPk-container">
                <span className="nickname">{userInfo.data.body.nick_name}</span>
                <span className="userPk">#{userInfo.data.body.id}</span>
              </div>
            )}
          </div>
          <div className="activity-container">
            <Tabs
              css={cssTabStyle(scaleValue)}
              defaultActiveKey={ACTIVITY_TAB_KEYS.POST}
              items={items}
            />
          </div>
        </div>
      ) : (
        <div className="spin-container">
          <Spin size="large" />
        </div>
      )}
    </Drawer>
  );
};
export default AnotherUserProfileDrawer;
