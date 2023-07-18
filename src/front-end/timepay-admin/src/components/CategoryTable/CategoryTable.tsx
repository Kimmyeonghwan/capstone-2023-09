import React, { useCallback, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Switch,
  Table,
  Typography,
  message,
} from 'antd';
import { cssCategoryTable } from './CategoryTable.style';
import { ICategory } from '../../api/interfaces/ICategory';
import { useGetCategories, usePatchCategories } from '../../api/hooks/category';
import { useQueryClient } from 'react-query';

const CategoryTable = () => {
  const [form] = Form.useForm();
  const { data, isLoading } = useGetCategories();
  const queryClient = useQueryClient();
  const patchCategories = usePatchCategories();
  const [messageApi, contextHolder] = message.useMessage();

  const dataSource = data?.data.content || [];

  const onChangeUseYn = useCallback((categoryId: number, useYn: 'Y' | 'N') => {
    console.log(`switch to ${useYn}`);
    console.log(categoryId);
    useYn === 'Y' ? (useYn = 'N') : (useYn = 'Y');

    patchCategories.mutateAsync(
      {
        categoryId,
        useYn,
      },
      {
        onSuccess: async (data) => {
          messageApi.open({
            type: 'success',
            content: '상태 변경 완료.',
          });
          await queryClient.invalidateQueries('useGetComments');
        },
        onError: (err) => {
          messageApi.open({
            type: 'error',
            content: (
              <>
                오류 발생: <br />
                {err}
              </>
            ),
          });
        },
      },
    );
  }, []);

  const columns = [
    {
      title: '카테고리 번호',
      dataIndex: 'categoryId',
      width: '10%',
    },
    {
      title: '카테고리 이름',
      dataIndex: 'categoryName',
      width: '10%',
    },
    {
      title: '카테고리 타입',
      dataIndex: 'boardType',
      width: '10%',
    },
    {
      title: '사용여부',
      dataIndex: 'useYn',
      width: '10%',
      render: (useYn: 'Y' | 'N', record: ICategory) =>
        useYn === 'Y' ? (
          <Switch
            checkedChildren="Y"
            unCheckedChildren="N"
            defaultChecked
            onChange={() => onChangeUseYn(record.categoryId, useYn)}
          />
        ) : (
          <Switch
            checkedChildren="Y"
            unCheckedChildren="N"
            onChange={() => onChangeUseYn(record.categoryId, useYn)}
          />
        ),
    },
  ];

  return (
    <div css={cssCategoryTable}>
      <Form form={form} component={false}>
        {contextHolder}
        <Table
          bordered
          dataSource={dataSource}
          loading={isLoading}
          // @ts-ignore
          columns={columns}
          rowClassName="categoryId"
        />
      </Form>
    </div>
  );
};

export default CategoryTable;
