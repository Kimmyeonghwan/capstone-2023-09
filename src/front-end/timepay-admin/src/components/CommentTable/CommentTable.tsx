import { Button, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import {
  cssCommentTableRowCountStyle,
  cssCommentTableStyle,
} from './CommentTable.styles';
import { IComment, IGetCommentRequest } from '../../api/interfaces/IComment';
import { commentSearchState } from '../../states/commentSearchState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useGetComments } from '../../api/hooks/comment';
import { customPaginationProps } from '../../utils/pagination';

interface CommentTableProps {
  selectedCommentIds?: React.Key[];
  setSelectedCommentIds: (args?: React.Key[]) => void;
  setSelectedComments: (args?: IComment[]) => void;
}

const CommentTable = ({
  selectedCommentIds,
  setSelectedCommentIds,
  setSelectedComments,
}: CommentTableProps) => {
  const commentSearchValues = useRecoilValue(commentSearchState);
  const setCommentSearch = useSetRecoilState(commentSearchState);

  const { data, isLoading } = useGetComments(commentSearchValues);

  const dataSource = useMemo(() => {
    if (commentSearchValues) {
      return data?.data.content || [];
    }
    return [];
  }, [commentSearchValues, data]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IComment[]) => {
      setSelectedCommentIds(selectedRowKeys);
      setSelectedComments(selectedRows);
    },
  };

  // @ts-ignore
  const columns: ColumnsType<IComment> = useMemo(() => {
    return [
      {
        title: '댓글 번호',
        key: 'commentId',
        dataIndex: 'commentId',
        width: 90,
        sorter: (a: IComment, b: IComment) => b.commentId - a.commentId,
      },
      {
        title: '게시글 번호',
        key: 'originBoardId',
        dataIndex: 'originBoardId',
        width: 90,
        sorter: (a: IComment, b: IComment) => b.originBoardId - a.originBoardId,
      },
      {
        title: '부모 댓글 번호',
        key: 'originCommentId',
        dataIndex: 'originCommentId',
        width: 90,
        sorter: (a: IComment, b: IComment) =>
          (b.originCommentId || 0) - (a.originCommentId || 0),
        render: (text: string) => text || '-',
      },
      {
        title: '작성자 회원번호',
        key: 'writerId',
        dataIndex: 'writerId',
        width: 110,
        sorter: (a: IComment, b: IComment) => b.writerId - a.writerId,
      },
      {
        title: '작성자 이름',
        key: 'writerName',
        dataIndex: 'writerName',
        width: 100,
        align: 'center',
      },
      {
        title: '작성자 닉네임',
        key: 'writerNickname',
        dataIndex: 'writerNickname',
        width: 100,
        align: 'center',
      },
      {
        title: '작성일시',
        key: 'writtenTime',
        dataIndex: 'writtenTime',
        width: 140,
        align: 'center',
        sorter: (a: IComment, b: IComment) =>
          dayjs(a.writtenTime).isAfter(dayjs(b.writtenTime)),
        render: (text: string) =>
          text ? text.split('.')[0].replaceAll('T', ' ') : '-',
      },
      {
        title: '수정일시',
        key: 'updatedTime',
        dataIndex: 'updatedTime',
        width: 140,
        align: 'center',
        sorter: (a: IComment, b: IComment) =>
          dayjs(a.updatedTime).isAfter(dayjs(b.updatedTime)),
        render: (text: string) =>
          text ? text.split('.')[0].replaceAll('T', ' ') : '-',
      },
      {
        title: '지원여부',
        key: 'applyYN',
        dataIndex: 'applyYN',
        width: 140,
        align: 'center',
        filters: [
          { text: 'Y', value: true },
          { text: 'N', value: false },
        ],
        onFilter: (value: boolean, record: IComment) =>
          record.applyYN === value,
        render: (applyYN: boolean) => (applyYN ? 'Y' : 'N'),
      },
      {
        title: '선정여부',
        key: 'selectYN',
        dataIndex: 'selectYN',
        width: 140,
        align: 'center',
        filters: [
          { text: 'Y', value: true },
          { text: 'N', value: false },
        ],
        onFilter: (value: boolean, record: IComment) =>
          record.selectYN === value,
        render: (selectYN: boolean) => (selectYN ? 'Y' : 'N'),
      },
      {
        title: '게시글 작성자 본인 여부',
        key: 'originWriterYN',
        dataIndex: 'originWriterYN',
        width: 120,
        align: 'center',
        filters: [
          { text: 'Y', value: true },
          { text: 'N', value: false },
        ],
        onFilter: (value: boolean, record: IComment) =>
          record.originWriterYN === value,
        render: (originWriterYN: boolean) => (originWriterYN ? 'Y' : 'N'),
      },
      {
        title: '숨김여부',
        key: 'hidden',
        dataIndex: 'hidden',
        width: 140,
        align: 'center',
        filters: [
          { text: 'Y', value: true },
          { text: 'N', value: false },
        ],
        onFilter: (value: boolean, record: IComment) => record.hidden === value,
        render: (hidden: boolean) => (hidden ? 'Y' : 'N'),
      },
      {
        title: '댓글 내용',
        key: 'content',
        dataIndex: 'content',
        width: 150,
        align: 'center',
        render: (_: string, record: IComment) => (
          <Button
            type="link"
            onClick={() =>
              Modal.info({
                title: `${record.commentId}번 내용`,
                content: record.content,
                okText: '확인',
              })
            }
          >
            내용 보기
          </Button>
        ),
      },
    ];
  }, []);

  return (
    <>
      <div css={cssCommentTableRowCountStyle}>
        {selectedCommentIds && selectedCommentIds.length > 0
          ? `${selectedCommentIds.length} 개 선택 / `
          : ''}
        총 {data?.data.totalElements} 개
      </div>
      <Table
        css={cssCommentTableStyle}
        rowSelection={rowSelection}
        columns={columns}
        scroll={{ x: 1500 }}
        dataSource={dataSource}
        rowKey="commentId"
        loading={isLoading}
        pagination={customPaginationProps<IGetCommentRequest>({
          totalElements: data?.data.totalElements,
          currentSearchValues: commentSearchValues,
          setSearchValues: setCommentSearch,
        })}
      />
    </>
  );
};

export default CommentTable;
