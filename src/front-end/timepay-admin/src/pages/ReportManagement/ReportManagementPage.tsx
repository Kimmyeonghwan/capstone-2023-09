import { Card } from 'antd';
import { useCallback, useState } from 'react';
import ReportSearchForm from '../../components/ReportSearchForm/ReportSearchForm';
import ReportTable from '../../components/ReportTable';
import { IReport } from '../../api/interfaces/IReport';
import { cssReportManagementPageStyle } from './ReportManagementPage.styles';

const ReportManagementPage = () => {
  return (
    <Card title="신고 관리" css={cssReportManagementPageStyle}>
      <ReportSearchForm />
      <ReportTable />
    </Card>
  );
};

export default ReportManagementPage;
