import { Form, Pagination, Select, Spin, Tabs, TabsProps } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  useGetUserBoards,
  useGetUserComments,
  useGetUserInfo,
} from '../../api/hooks/user';
import {
  IGetUserBoardRequest,
  IGetUserCommentRequest,
} from '../../api/interfaces/IUser';
import ActivityCommentCard from '../../components/ActivityCommentCard';
import ActivityPostCard from '../../components/ActivityPostCard';
import { headerTitleState } from '../../states/uiState';
import { cssTabStyle } from '../../styles/constants/tabStyle';
import {
  cssActivityRecordPageStyle,
  cssHorizontalForm,
  cssNothingStyle,
  cssSpinStyle,
} from './ActivityRecordPage.styles';
import { ICommentActivity } from '../../api/interfaces/IComment';
import { IBoard } from '../../api/interfaces/IPost';
import TimeTable from '../../components/TimeTable';
import useFontSize from '../../hooks/useFontSize';
import { useGetMyDonateBoard } from '../../api/hooks/agency';
import { IDonationBoard } from '../../api/interfaces/IDonation';
import ActivityDonationCard from '../../components/ActivityDonationCard';
import { GetPageableData } from '../../api/interfaces/ICommon';

const ActivityRecordPage = () => {
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

  const [donateSearchValue, setDonateSearchValue] = useState<GetPageableData>({
    pagingIndex: 0,
    pagingSize: 5,
  });

  const { data: boardData, isLoading: boardDataLoading } =
    useGetUserBoards(boardSearchValue);
  const { data: commentData, isLoading: commentDataLoading } =
    useGetUserComments(commentSearchValue);
  const { data: donateData, isLoading: donateDataLoading } =
    useGetMyDonateBoard(donateSearchValue);
  const { data: userInfo } = useGetUserInfo();

  const [postForm] = Form.useForm();
  const [commentForm] = Form.useForm();

  const ACTIVITY_TAB_KEYS = useMemo(() => {
    if (userInfo?.data.body.organization_name)
      return { POST: '게시글', COMMENT: '댓글', DONATE: '모금 현황' };
    return { POST: '게시글', COMMENT: '댓글' };
  }, [userInfo]);

  const setHeaderTitle = useSetRecoilState(headerTitleState);

  const boards = useMemo(() => {
    return boardData?.data.body.deal_boards.content;
  }, [boardData]);

  const comments = useMemo(() => {
    return commentData?.data.body.content;
  }, [commentData]);

  const donations = useMemo(() => {
    return donateData?.data.content;
  }, [donateData]);

  const handleOnChangeBoardForm = useCallback(
    (changedValues: { [key: string]: any }) => {
      // 옵션 검색 시 값이 바뀔 때마다 바로 api 호출, 페이지 초기화
      setBoardSearchValue({
        ...boardSearchValue,
        ...changedValues,
        boardType:
          changedValues.boardType === 'ALL'
            ? undefined
            : changedValues.boardType,
        boardStatus:
          changedValues.boardStatus === 'ALL'
            ? undefined
            : changedValues.boardStatus,
        pageIndex: 0,
      });
    },
    [boardSearchValue],
  );

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

  const handleOnChangeCommentForm = useCallback(
    (changedValues: { [key: string]: any }) => {
      // 옵션 검색 시 값이 바뀔 때마다 바로 api 호출, 페이지 초기화
      setCommentSearchValue({
        ...commentSearchValue,
        isApplied: changedValues.commentType === 'APPLIED' ? true : undefined,
        isAdopted: changedValues.commentType === 'ADOPTED' ? true : undefined,
        pageIndex: 0,
      });
    },
    [commentSearchValue],
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

  const handleOnChangePageDonate = useCallback(
    (page: number) => {
      setDonateSearchValue({ ...donateSearchValue, pagingIndex: page - 1 });
    },
    [donateSearchValue],
  );

  const items: TabsProps['items'] = useMemo(() => {
    const items = [
      {
        key: ACTIVITY_TAB_KEYS.POST,
        label: ACTIVITY_TAB_KEYS.POST,
        children: (
          <div
            css={cssActivityRecordPageStyle(scaleValue)}
            style={{ width: '100%' }}
          >
            <Form
              form={postForm}
              css={cssHorizontalForm(scaleValue)}
              layout="horizontal"
              onValuesChange={handleOnChangeBoardForm}
            >
              <div>
                <Form.Item name="boardType" noStyle>
                  <Select
                    placeholder="유형 선택"
                    popupClassName={`select-${
                      scaleValue === 1 ? 'small' : 'big'
                    }`}
                  >
                    <Select.Option value="ALL">전체</Select.Option>
                    <Select.Option value="help">도움요청</Select.Option>
                    <Select.Option value="helper">같이하기</Select.Option>
                    <Select.Option value="event">이벤트</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="boardStatus" style={{ width: 120 }} noStyle>
                  <Select
                    placeholder="상태 선택"
                    popupClassName={`select-${
                      scaleValue === 1 ? 'small' : 'big'
                    }`}
                  >
                    <Select.Option value="ALL">전체</Select.Option>
                    <Select.Option value="MATCHING_IN_PROGRESS">
                      매칭중
                    </Select.Option>
                    <Select.Option value="MATCHING_COMPLETE">
                      매칭완료
                    </Select.Option>
                    <Select.Option value="ACTIVITY_IN_PROGRESS">
                      활동중
                    </Select.Option>
                    <Select.Option value="ACTIVITY_COMPLETE">
                      활동완료
                    </Select.Option>
                    <Select.Option value="ACTIVITY_CANCEL">
                      활동취소
                    </Select.Option>
                    <Select.Option value="ACTIVITY_DELAY">
                      활동지연
                    </Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div>
                총 {boardData?.data.body.deal_boards.totalElements || 0} 개
              </div>
            </Form>
            <div>
              {!boardDataLoading && boards ? (
                boards.length > 0 ? (
                  <>
                    {boards?.map((post: IBoard) => (
                      <ActivityPostCard key={post.d_boardId} post={post} />
                    ))}
                    {boardData &&
                      boardData.data.body.deal_boards.totalPages > 1 && (
                        <Pagination
                          current={(boardSearchValue.pageIndex || 0) + 1}
                          pageSize={5}
                          total={boardData?.data.body.deal_boards.totalElements}
                          onChange={handleOnChangePageBoard}
                        />
                      )}
                  </>
                ) : (
                  <div css={cssNothingStyle(scaleValue)}>
                    <span className="emoji">😅</span>
                    <span>해당하는 게시글이 없습니다.</span>
                  </div>
                )
              ) : (
                <Spin css={cssSpinStyle} size="large" />
              )}
            </div>
          </div>
        ),
      },
      {
        key: ACTIVITY_TAB_KEYS.COMMENT,
        label: ACTIVITY_TAB_KEYS.COMMENT,
        children: (
          <div
            css={cssActivityRecordPageStyle(scaleValue)}
            style={{ width: '100%' }}
          >
            <Form
              form={commentForm}
              css={cssHorizontalForm(scaleValue)}
              layout="horizontal"
              onValuesChange={handleOnChangeCommentForm}
            >
              <Form.Item name="commentType" style={{ width: 120 }} noStyle>
                <Select
                  placeholder="유형 선택"
                  popupClassName={`select-${
                    scaleValue === 1 ? 'small' : 'big'
                  }`}
                >
                  <Select.Option value="ALL">전체</Select.Option>
                  <Select.Option value="APPLIED">지원</Select.Option>
                  <Select.Option value="ADOPTED">선정</Select.Option>
                </Select>
              </Form.Item>
              <div> 총 {commentData?.data.body.totalElements || 0} 개</div>
            </Form>
            {!commentDataLoading && comments ? (
              comments.length > 0 ? (
                <>
                  {comments.map((comment: ICommentActivity) => (
                    <ActivityCommentCard
                      key={comment.commentId}
                      comment={comment}
                    />
                  ))}
                  {commentData && commentData.data.body.totalPages > 1 && (
                    <Pagination
                      current={(commentSearchValue.pageIndex || 0) + 1}
                      pageSize={5}
                      total={commentData?.data.body.totalElements}
                      onChange={handleOnChangePageComment}
                    />
                  )}
                </>
              ) : (
                <div css={cssNothingStyle(scaleValue)}>
                  <span className="emoji">😅</span>
                  <span>해당하는 댓글이 없습니다.</span>
                </div>
              )
            ) : (
              <Spin size="large" css={cssSpinStyle} />
            )}
          </div>
        ),
      },
    ];
    if (ACTIVITY_TAB_KEYS.DONATE) {
      items.push({
        key: ACTIVITY_TAB_KEYS.DONATE,
        label: ACTIVITY_TAB_KEYS.DONATE,
        children: (
          <div
            css={cssActivityRecordPageStyle(scaleValue)}
            style={{ width: '100%' }}
          >
            <Form css={cssHorizontalForm(scaleValue)}>
              <div />
              <div>총 {donateData?.data.totalElements || 0} 개</div>
            </Form>
            <div>
              {!donateDataLoading && donations ? (
                donations.length > 0 ? (
                  <>
                    {donations?.map((donateBoard: IDonationBoard) => (
                      <ActivityDonationCard
                        key={donateBoard.id}
                        board={donateBoard}
                      />
                    ))}
                    {donateData && donateData.data.totalPages > 1 && (
                      <Pagination
                        current={(donateSearchValue.pagingIndex || 0) + 1}
                        pageSize={5}
                        total={donateData?.data.totalElements}
                        onChange={handleOnChangePageDonate}
                      />
                    )}
                  </>
                ) : (
                  <div css={cssNothingStyle(scaleValue)}>
                    <span className="emoji">😅</span>
                    <span>해당하는 게시글이 없습니다.</span>
                  </div>
                )
              ) : (
                <Spin css={cssSpinStyle} size="large" />
              )}
            </div>
          </div>
        ),
      });
    }
    return items;
  }, [
    scaleValue,
    boardSearchValue,
    commentSearchValue,
    donateSearchValue,
    boardData,
    commentData,
    donateData,
    boards,
    comments,
    donations,
    boardDataLoading,
    commentDataLoading,
    donateDataLoading,
    postForm,
    commentForm,
    ACTIVITY_TAB_KEYS,
    handleOnChangeBoardForm,
    handleOnChangeCommentForm,
    handleOnChangePageBoard,
    handleOnChangePageComment,
    handleOnChangePageDonate,
  ]);

  useEffect(() => {
    setHeaderTitle('활동기록');
  });

  return (
    <>
      <TimeTable />
      <Tabs
        css={cssTabStyle(scaleValue)}
        defaultActiveKey={ACTIVITY_TAB_KEYS.POST}
        items={items}
      />
    </>
  );
};

export default ActivityRecordPage;
