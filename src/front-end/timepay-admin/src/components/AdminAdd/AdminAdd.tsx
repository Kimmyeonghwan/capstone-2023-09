import React, { useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, message } from 'antd';
import { cssAddModal, cssAdminAdd, cssBox } from './AdminAdd.style';
import { useAdminRegister } from '../../api/hooks/admin';
import { useQueryClient } from 'react-query';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  types: {
    email: '이메일 형식으로 입력해주세요',
  },
};

const AdminAdd = () => {
  const [form] = Form.useForm();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const adminRegister = useAdminRegister();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const onClickCancel = () => {
    setIsOpenModal(false);
  };
  const onFinish = async (values: any) => {
    await adminRegister.mutateAsync(
      {
        adminName: values.adminName,
        authority: values.authority,
        email: values.email,
        name: values.name,
        password: values.password,
        phone: values.phone,
      },
      {
        onSuccess: (result) => {
          messageApi.open({
            type: 'success',
            content: '새관리자가 추가되었습니다.',
          });
          queryClient.invalidateQueries({
            queryKey: ['useGetAdmins'],
          });
          form.resetFields();
        },
        onError: (err) => {
          console.log(err.response?.status);
        },
      },
    );
  };

  const content = (
    <Form
      form={form}
      {...layout}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      css={cssAddModal}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={['adminName']}
        label="아이디"
        rules={[{ required: true, message: '아이디를 입력해주세요' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['email']}
        label="이메일"
        rules={[
          { type: 'email', required: true, message: '이메일을 입력해주세요' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['name']}
        label="이름"
        rules={[{ required: true, message: '이름을 입력해주세요' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['password']}
        label="초기비밀번호"
        rules={[{ required: true, message: '초기비밀번호를 입력해주세요' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name={['phone']}
        label="전화번호"
        rules={[{ required: true, message: '전화번호를 입력해주세요' }]}
      >
        <Input />
      </Form.Item>
      <div className="footer">
        <Button key="취소" onClick={onClickCancel}>
          취소
        </Button>
        <Button key="submit" type="primary" htmlType="submit">
          추가
        </Button>
      </div>
    </Form>
  );

  return (
    <div css={cssBox}>
      <Button
        css={cssAdminAdd}
        type="primary"
        onClick={() => setIsOpenModal(true)}
      >
        관리자 추가
      </Button>
      {contextHolder}
      <Modal
        title="관리자 추가"
        centered
        open={isOpenModal}
        onCancel={onClickCancel}
        footer={null}
      >
        {content}
      </Modal>
    </div>
  );
};

export default AdminAdd;
