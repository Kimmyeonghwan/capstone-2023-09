import { Card } from 'antd';
import QnASearchForm from '../../components/QnASearchForm';
import InquiryTable from '../../components/InquiryTable';
import { cssInquiryManagementPageStyle } from './InquiryManagementPage.styles';

const InquiryManagementPage = () => {
  return (
    <Card title="문의 관리" css={cssInquiryManagementPageStyle}>
      <QnASearchForm />
      <InquiryTable />
    </Card>
  );
};

export default InquiryManagementPage;
