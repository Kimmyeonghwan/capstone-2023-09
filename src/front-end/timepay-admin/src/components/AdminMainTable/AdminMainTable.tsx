import React, { useMemo, useRef, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Button,
  Space,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { cssAdminMainTable } from './AdminMainTable.style';
import { IAdmin } from '../../api/interfaces/IAdmin';
import { useDeleteAdmins, useGetAdmins } from '../../api/hooks/admin';
import { useQueryClient } from 'react-query';
import { COMMON_COLOR } from '../../styles/constants/colors';

type DataIndex = keyof IAdmin;

const AdminMainTable = () => {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const { data, isLoading } = useGetAdmins();
  const deleteAdminsMutation = useDeleteAdmins();
  const queryClient = useQueryClient();

  const dataSource = data?.data.content || [];

  const handleDelete = async (adminId: number) => {
    await deleteAdminsMutation.mutateAsync(adminId, {
      onSuccess: (result) => {
        queryClient.invalidateQueries({
          queryKey: ['useGetAdmins'],
        });
      },
      onError: (err) => {
        console.log(err.response?.status);
      },
    });
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{ color: filtered ? COMMON_COLOR.BLUE : undefined }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: COMMON_COLOR.MAIN1, padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: '관리자 번호',
      dataIndex: 'adminId',
      width: '10%',
      editable: false,
    },
    {
      title: '아이디',
      dataIndex: 'adminName',
      width: '10%',
      editable: true,
      ...getColumnSearchProps('adminName'),
    },
    {
      title: '이메일',
      dataIndex: 'email',
      width: '10%',
    },
    {
      title: '이름',
      dataIndex: 'name',
      width: '10%',
    },

    {
      title: '전화번호',
      dataIndex: 'phone',
      width: '10%',
    },
    {
      title: '삭제',
      dataIndex: 'operation',
      width: '10%',
      render: (_: any, record: { adminId: number }) =>
        dataSource ? (
          <Popconfirm
            title="삭제하시겠습니까?"
            onConfirm={() => handleDelete(record.adminId)}
          >
            <a>삭제</a>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <div css={cssAdminMainTable}>
      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
        />
      </Form>
    </div>
  );
};

export default AdminMainTable;
