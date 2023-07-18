import { Card } from 'antd';
import AgencySearchForm from '../../components/AgencySearchForm';
import AgencyTable from '../../components/AgencyTable/AgencyTable';
import { cssAgencyManagementStyle } from './AgencyManagementPage.styles';

const AgencyManagement = () => {
  return (
    <Card title="기관 회원 관리" css={cssAgencyManagementStyle}>
      <AgencySearchForm />
      <AgencyTable />
    </Card>
  );
};

export default AgencyManagement;
