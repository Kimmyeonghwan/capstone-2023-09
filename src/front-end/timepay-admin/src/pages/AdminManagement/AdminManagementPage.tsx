import React, { useMemo, useState } from 'react';
import { Card, Form } from 'antd';
import AdminMainTable from '../../components/AdminMainTable/AdminMainTable';
import AdminAdd from '../../components/AdminAdd/AdminAdd';
import { cssAdminManagementTitle } from './AdminManagementPage.style';

const AdminManagementPage = () => {
  const [form] = Form.useForm();

  return (
    <Card title="관리자 관리" css={cssAdminManagementTitle}>
      <AdminAdd />
      <AdminMainTable />
    </Card>
  );
};

export default AdminManagementPage;
