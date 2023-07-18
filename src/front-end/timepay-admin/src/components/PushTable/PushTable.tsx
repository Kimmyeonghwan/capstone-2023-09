import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useCallback, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import {
  cssPushTableRowCountStyle,
  cssPushTableStyle,
} from './PushTable.styles';
import PushDetailModal from '../PushDetailModal';
import { useGetNotifications } from '../../api/hooks/notification';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { pushSearchState } from '../../states/pushSearchState';
import {
  IGetNotificationRequest,
  INotification,
} from '../../api/interfaces/INotification';
import { customPaginationProps } from '../../utils/pagination';

interface PushTableProps {
  selectedPushIds?: React.Key[];
  setSelectedPushIds: (args?: React.Key[]) => void;
  setSelectedPushes: (args?: INotification[]) => void;
}

const PushTable = ({
  selectedPushIds,
  setSelectedPushIds,
  setSelectedPushes,
}: PushTableProps) => {
  const pushSearchValues = useRecoilValue(pushSearchState);
  const setPushSearch = useSetRecoilState(pushSearchState);

  const { data, isLoading } = useGetNotifications(pushSearchValues);

  const [isOpen, setIsOpen] = useState(false);
  const [currentPush, setCurrentPush] = useState<INotification>();

  const handleOnShowDetailPush = useCallback((push: INotification) => {
    setCurrentPush(push);
    setIsOpen(true);
  }, []);

  const handleOnCloseDetailPush = useCallback(() => {
    setCurrentPush(undefined);
    setIsOpen(false);
  }, []);

  const dataSource = useMemo(() => {
    if (pushSearchValues) {
      return data?.data.content || [];
    }
    return [];
  }, [pushSearchValues, data]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: INotification[]) => {
      setSelectedPushIds(selectedRowKeys);
      setSelectedPushes(selectedRows);
    },
  };

  // @ts-ignore
  const columns: ColumnsType<INotification> = useMemo(() => {
    return [
      {
        title: '공지 번호',
        key: 'notificationId',
        dataIndex: 'notificationId',
        width: 80,
        sorter: (a: INotification, b: INotification) =>
          a.notificationId - b.notificationId,
      },
      {
        title: '작성자 번호',
        key: 'adminId',
        dataIndex: 'adminId',
        width: 60,
        align: 'center',
      },
      {
        title: '작성자 이름',
        key: 'adminName',
        dataIndex: 'adminName',
        width: 100,
        align: 'center',
      },
      {
        title: '작성일시',
        key: 'createdAt',
        dataIndex: 'createdAt',
        width: 140,
        align: 'center',
        render: (createAt: string) =>
          (createAt || '').split('.')[0].replaceAll('T', ' '),
        sorter: (a: INotification, b: INotification) =>
          dayjs(a.createdAt, 'YYYY-MM-DDTHH:mm:ss').unix() -
          dayjs(b.createdAt, 'YYYY-MM-DDTHH:mm:ss').unix(),
      },
      {
        title: '공지 제목',
        key: 'title',
        dataIndex: 'title',
        width: 150,
        align: 'center',
      },
      {
        title: '공지 내용',
        key: 'content',
        dataIndex: 'content',
        width: 150,
        align: 'center',
        render: (_: string, record: INotification) => (
          <Button type="link" onClick={() => handleOnShowDetailPush(record)}>
            더보기
          </Button>
        ),
      },
    ];
  }, [handleOnShowDetailPush]);

  return (
    <>
      <div css={cssPushTableRowCountStyle}>
        {selectedPushIds && selectedPushIds.length > 0
          ? `${selectedPushIds.length} 개 선택 / `
          : ''}
        총 {data?.data.totalElements || 0} 개
      </div>
      <Table
        css={cssPushTableStyle}
        rowSelection={rowSelection}
        columns={columns}
        scroll={{ x: 1200 }}
        dataSource={dataSource}
        rowKey="notificationId"
        loading={isLoading}
        pagination={customPaginationProps<IGetNotificationRequest>({
          totalElements: data?.data.totalElements,
          currentSearchValues: pushSearchValues,
          setSearchValues: setPushSearch,
        })}
      />
      <PushDetailModal
        isOpen={isOpen}
        onCancel={handleOnCloseDetailPush}
        push={currentPush}
      />
    </>
  );
};

export default PushTable;
