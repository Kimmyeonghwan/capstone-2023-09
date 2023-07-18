import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useCallback, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import {
  cssPostTableRowCountStyle,
  cssPostTableStyle,
} from './PostTable.styles';
import PostDetailModal from '../PostDetailModal';
import { useGetBoards } from '../../api/hooks/boards';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { boardSearchState } from '../../states/boardSearchState';
import { IDealBoard, IGetBoardRequest } from '../../api/interfaces/IBoard';
import { getStatus, getType } from '../../utils/board';
import { customPaginationProps } from '../../utils/pagination';

interface PostTableProps {
  selectedPostIds?: React.Key[];
  setSelectedPostIds: (args?: React.Key[]) => void;
  setSelectedPosts: (args?: IDealBoard[]) => void;
}

const PostTable = ({
  selectedPostIds,
  setSelectedPostIds,
  setSelectedPosts,
}: PostTableProps) => {
  const boardSearchValue = useRecoilValue(boardSearchState);
  const setBoardSearch = useSetRecoilState(boardSearchState);

  const { data, isLoading } = useGetBoards(boardSearchValue);

  const [isOpen, setIsOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<IDealBoard>();

  const handleOnShowDetailPost = useCallback((post: IDealBoard) => {
    setCurrentPost(post);
    setIsOpen(true);
  }, []);

  const handleOnCloseDetailPost = useCallback(() => {
    setCurrentPost(undefined);
    setIsOpen(false);
  }, []);

  const dataSource = useMemo(() => {
    if (boardSearchValue) {
      return data?.data.content || [];
    }
    return [];
  }, [boardSearchValue, data]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IDealBoard[]) => {
      setSelectedPostIds(selectedRowKeys);
      setSelectedPosts(selectedRows);
    },
  };

  // @ts-ignore
  const columns: ColumnsType<IDealBoard> = useMemo(() => {
    return [
      {
        title: '게시글 번호',
        key: 'd_boardId',
        dataIndex: 'd_boardId',
        width: 90,
        sorter: (a: IDealBoard, b: IDealBoard) => a.d_boardId - b.d_boardId,
      },
      {
        title: '유형',
        key: 'type',
        dataIndex: 'type',
        width: 100,
        align: 'center',
        filters: [
          { text: '도움요청', value: 'help' },
          { text: '도움주기', value: 'helper' },
          { text: '기부하기', value: 'event' },
        ],
        onFilter: (value: string, record: IDealBoard) =>
          record.type.indexOf(value) === 0,
        render: (type: string) => getType(type),
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
        title: '카테고리',
        key: 'category',
        dataIndex: 'category',
        align: 'center',
        width: 120,
      },
      {
        title: '작성자 회원번호',
        key: 'userId',
        dataIndex: 'userId',
        width: 110,
        sorter: (a: IDealBoard, b: IDealBoard) => a.userId - b.userId,
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
        width: 150,
        align: 'center',
        sorter: (a: IDealBoard, b: IDealBoard) =>
          dayjs(a.createdAt).isAfter(dayjs(b.createdAt)),
        render: (createdAt: string) =>
          createdAt ? createdAt.split('.')[0].replace('T', ' ') : ' - ',
      },
      {
        title: '수정일시',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        width: 140,
        align: 'center',
        sorter: (a: IDealBoard, b: IDealBoard) =>
          dayjs(a.updatedAt).isAfter(dayjs(b.updatedAt)),
        render: (updatedAt: string) =>
          updatedAt ? updatedAt.split('.')[0].replace('T', ' ') : '-',
      },
      {
        title: '활동시간',
        key: 'startTime',
        dataIndex: 'startTime',
        width: 150,
        align: 'center',
        render: (startTime: string, record: IDealBoard) => (
          <div>
            {startTime ? startTime.replace('T', ' ') : ' - '}
            <br />~<br />
            {record.endTime ? record.endTime.replace('T', ' ') : ' - '}
          </div>
        ),
      },
      {
        title: '활동장소',
        key: 'location',
        dataIndex: 'location',
        width: 150,
        align: 'center',
      },
      {
        title: '타임페이 거래량',
        key: 'pay',
        dataIndex: 'pay',
        width: 100,
        align: 'center',
        sorter: (a: IDealBoard, b: IDealBoard) => b.pay - a.pay,
      },
      {
        title: '제목',
        key: 'title',
        dataIndex: 'title',
        width: 150,
        align: 'center',

        render: (_: string, record: IDealBoard) => (
          <Button type="link" onClick={() => handleOnShowDetailPost(record)}>
            더보기
          </Button>
        ),
      },
      {
        title: '본문 내용',
        key: 'content',
        dataIndex: 'content',
        width: 150,
        align: 'center',
        render: (_: string, record: IDealBoard) => (
          <Button type="link" onClick={() => handleOnShowDetailPost(record)}>
            더보기
          </Button>
        ),
      },
      {
        title: '본문 첨부사진',
        key: 'dealAttatchments',
        dataIndex: 'dealAttatchments',
        width: 100,
        align: 'center',
        render: (_: string, record: IDealBoard) => (
          <Button type="link" onClick={() => handleOnShowDetailPost(record)}>
            더보기
          </Button>
        ),
      },
      {
        title: '숨김여부',
        key: 'hidden',
        dataIndex: 'hidden',
        width: 100,
        align: 'center',
        render: (hidden: boolean) => (hidden ? 'Y' : 'N'),
        filters: [
          { text: 'Y', value: true },
          { text: 'N', value: false },
        ],
        onFilter: (value: boolean, record: IDealBoard) =>
          record.hidden === value,
      },
      {
        title: '봉사활동 게시글',
        key: 'volunteer',
        dataIndex: 'volunteer',
        width: 100,
        align: 'center',
        render: (volunteer: boolean) => (volunteer ? 'Y' : 'N'),
        filters: [
          { text: 'Y', value: true },
          { text: 'N', value: false },
        ],
        onFilter: (value: boolean, record: IDealBoard) =>
          record.volunteer === value,
      },
      {
        title: '봉사 인원',
        key: 'volunteerPeople',
        dataIndex: 'volunteerPeople',
        width: 100,
        align: 'center',
        render: (volunteerPeople: number, record: IDealBoard) =>
          record.volunteer ? volunteerPeople : '-',
      },
      {
        title: '봉사시간',
        key: 'volunteerTime',
        dataIndex: 'volunteerTime',
        width: 100,
        align: 'center',
        render: (volunteerTime: number, record: IDealBoard) =>
          record.volunteer ? volunteerTime : '-',
      },
    ];
  }, [handleOnShowDetailPost]);

  return (
    <>
      <div css={cssPostTableRowCountStyle}>
        {selectedPostIds && selectedPostIds.length > 0
          ? `${selectedPostIds.length} 개 선택 / `
          : ''}
        총 {data?.data.totalElements} 개
      </div>
      <Table
        css={cssPostTableStyle}
        rowSelection={rowSelection}
        columns={columns}
        scroll={{ x: 1500 }}
        dataSource={dataSource}
        rowKey="d_boardId"
        loading={isLoading}
        pagination={customPaginationProps<IGetBoardRequest>({
          totalElements: data?.data.totalElements,
          currentSearchValues: boardSearchValue,
          setSearchValues: setBoardSearch,
        })}
      />
      <PostDetailModal
        isOpen={isOpen}
        onCancel={handleOnCloseDetailPost}
        post={currentPost}
      />
    </>
  );
};

export default PostTable;
