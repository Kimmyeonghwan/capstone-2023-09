import { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { cssCategoryAdd, cssBox, cssAddModal } from './CategoryAdd.style';
import { usePostCategories } from '../../api/hooks/category';
import { useQueryClient } from 'react-query';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const CategoryAdd = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = Form.useForm();
  const postCategories = usePostCategories();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const onFinish = async (values: any) => {
    await postCategories.mutateAsync(values, {
      onSuccess: () => {
        messageApi.open({
          type: 'success',
          content: '카테고리가 추가되었습니다.',
        });
        queryClient.invalidateQueries({
          queryKey: ['useGetCategories'],
        });
        form.resetFields();
      },
      onError: (err) => {
        console.log(err.response?.status);
      },
    });
  };

  const content = (
    <Form
      form={form}
      css={cssAddModal}
      {...layout}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name={['boardType']} label="카테고리 타입">
        <Input />
      </Form.Item>
      <Form.Item name={['categoryName']} label="카테고리 이름">
        <Input />
      </Form.Item>
      <div className="footer">
        <Button key="submit" type="primary" htmlType="submit">
          추가
        </Button>
      </div>
    </Form>
  );

  return (
    <div css={cssBox}>
      <Button
        css={cssCategoryAdd}
        type="primary"
        onClick={() => setIsOpenModal(true)}
      >
        카테고리 추가
      </Button>
      {contextHolder}
      <Modal
        title="카테고리 추가"
        centered
        open={isOpenModal}
        footer={null}
        onCancel={() => setIsOpenModal(false)}
        // onOk={() => setIsOpenModal(false)}
      >
        {content}
      </Modal>
    </div>
  );
};

export default CategoryAdd;
