import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useCallback, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { cssInquiryTableStyle } from './InquiryTable.styles';
import { IGetInquiryRequest, IInquiry } from '../../api/interfaces/IInquiry';
import { useGetInquiry } from '../../api/hooks/inquiry';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { inquirySearchState } from '../../states/inquirySearchState';
import { customPaginationProps } from '../../utils/pagination';

const InquiryTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQnA, setCurrentQnA] = useState<IInquiry>();
  const inquirySearchValue = useRecoilValue(inquirySearchState);
  const setInquirySearch = useSetRecoilState(inquirySearchState);
  const { data, isLoading } = useGetInquiry(inquirySearchValue);
  const navigate = useNavigate();

  const dataSource = data?.data.content || [];

  const handleOnCloseDetailQnA = useCallback(() => {
    setCurrentQnA(undefined);
    setIsOpen(false);
  }, []);

  // @ts-ignore
  const columns: ColumnsType<IInquiry> = useMemo(() => {
    return [
      {
        title: '문의 번호',
        key: 'inquiryId',
        dataIndex: 'inquiryId',
        width: 10,
        sorter: (a: IInquiry, b: IInquiry) => a.inquiryId - b.inquiryId,
      },
      {
        title: '문의 상태',
        key: 'state',
        dataIndex: 'state',
        width: 30,
        align: 'center',
      },
      {
        title: '카테고리',
        key: 'category',
        dataIndex: 'category',
        width: 30,
        align: 'center',
      },
      {
        title: '작성일시',
        key: 'createdAt',
        dataIndex: 'createdAt',
        width: 30,
        align: 'center',
        sorter: (a: IInquiry, b: IInquiry) =>
          dayjs(a.createdAt).isAfter(dayjs(b.createdAt)),
      },
      {
        title: '문의 작성자 이름',
        key: 'writer',
        dataIndex: 'writer',
        width: 100,
        align: 'center',
      },
      {
        title: '문의 답변작성',
        key: 'title',
        dataIndex: 'title',
        width: 100,
        align: 'center',
        render: (_: string, record: IInquiry) => (
          <Button
            type="link"
            onClick={() =>
              navigate(`/inquiry-management/detail`, {
                state: { inquiryId: record.inquiryId },
              })
            }
          >
            문의 보기
          </Button>
        ),
      },
    ];
  }, [navigate]);

  return (
    <Table
      css={cssInquiryTableStyle}
      columns={columns}
      scroll={{ x: 1000 }}
      dataSource={dataSource}
      rowKey="inquiryId"
      loading={isLoading}
      pagination={customPaginationProps<IGetInquiryRequest>({
        totalElements: data?.data.totalElements,
        currentSearchValues: inquirySearchValue,
        setSearchValues: setInquirySearch,
      })}
    />
  );
};

export default InquiryTable;
