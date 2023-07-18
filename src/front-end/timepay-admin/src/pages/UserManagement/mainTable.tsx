import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IGetUserInfoRequest, IUserInfo } from '../../api/interfaces/IUser';
import { useGetUserInfos } from '../../api/hooks/userManagement';
import { mainSearchState } from './mainSearchState';
import { useCallback, useMemo, useState } from 'react';
import Table, { ColumnsType } from 'antd/es/table';
import { customPaginationProps } from '../../utils/pagination';
import { Button, Modal } from 'antd';
import ProfileImageModal from './profileImageModal';
import { cssPushTableRowCountStyle } from '../../components/PushTable/PushTable.styles';

interface MainTableProps {
  selectedUserInfoIds?: React.Key[];
  setSelectedUserInfoIds: (args?: React.Key[]) => void;
  setSelectedUserInfos: (args?: IUserInfo[]) => void;
}

const MainTable = ({
  selectedUserInfoIds,
  setSelectedUserInfoIds,
  setSelectedUserInfos,
}: MainTableProps) => {
  const mainSearchValues = useRecoilValue(mainSearchState);
  const setMainSearch = useSetRecoilState(mainSearchState);

  const { data, isLoading } = useGetUserInfos(mainSearchValues);

  const [isOpen, setIsOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<IUserInfo>();

  const handleOnShowProfile = useCallback((push: IUserInfo) => {
    setCurrentProfile(push);
    setIsOpen(true);
  }, []);

  const handleOnCloseProfile = useCallback(() => {
    setCurrentProfile(undefined);
    setIsOpen(false);
  }, []);

  const dataSource = useMemo(() => {
    if (mainSearchValues) {
      return data?.data.content || [];
    }
    return [];
  }, [mainSearchValues, data]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IUserInfo[]) => {
      setSelectedUserInfoIds(selectedRowKeys);
      setSelectedUserInfos(selectedRows);
    },
  };

  const columns: ColumnsType<IUserInfo> = [
    {
      title: 'UID',
      dataIndex: 'userId',
      align: 'center',
    },
    {
      title: '닉네임',
      dataIndex: 'nickName',
      align: 'center',
    },
    {
      title: '프로필 사진',
      dataIndex: 'profileUrl',

      render: (_: string, record: IUserInfo) => (
        <Button type="link" onClick={() => handleOnShowProfile(record)}>
          프로필 사진 보기
        </Button>
      ),
      align: 'center',
    },

    {
      title: '이름',
      dataIndex: 'userName',
      align: 'center',
    },

    {
      title: '생년월일',
      dataIndex: 'birth',
      align: 'center',
      render: (birth: string) =>
        (birth || '').split('.')[0].replaceAll('T00:00:00', ' '),
    },

    {
      title: '지역',
      dataIndex: 'region',
      align: 'center',
    },
    {
      title: '성별',
      dataIndex: 'sex',
      align: 'center',
    },

    {
      title: '타임페이 보유량',
      dataIndex: 'timepay',
      align: 'center',
    },
    {
      title: '봉사 시간',
      dataIndex: 'totalVolunteerTime',
      align: 'center',
    },

    {
      title: '정보 수정',
      dataIndex: 'edit',
      align: 'center',
    },
  ];

  return (
    <>
      <div css={cssPushTableRowCountStyle}>
        {selectedUserInfoIds && selectedUserInfoIds.length > 0}총{' '}
        {data?.data.totalElements || 0} 개
      </div>
      <Table
        //rowSelection={rowSelection}
        columns={columns}
        scroll={{ x: 1200 }}
        dataSource={dataSource}
        rowKey="UserId"
        loading={isLoading}
        pagination={customPaginationProps<IGetUserInfoRequest>({
          totalElements: data?.data.totalElements,
          currentSearchValues: mainSearchValues,
          setSearchValues: setMainSearch,
        })}
      />
      <ProfileImageModal
        isOpen={isOpen}
        onCancel={handleOnCloseProfile}
        profile={currentProfile}
      />
    </>
  );
};

export default MainTable;
