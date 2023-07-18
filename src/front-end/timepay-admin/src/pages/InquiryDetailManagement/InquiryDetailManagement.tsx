import { Button, Card, Form, Input, List, Typography, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { cssInquiryDetailManagementPageStyle } from './InquiryDetailManagementPage.style';
import {
  useGetInquiryDetail,
  usePostInquiryAnswer,
} from '../../api/hooks/inquiry';
import { useCallback } from 'react';
import { COMMON_COLOR } from '../../styles/constants/colors';
import { useQueryClient } from 'react-query';

const { TextArea } = Input;

interface adminAnswerResponses {
  content: string;
  adminName: string;
  createdAt: string;
}

const InquiryDetailManagementPage = () => {
  const location = useLocation();
  const state = location.state;
  const { data } = useGetInquiryDetail(state);
  console.log(data?.data.inquiryResponse.content);
  const adminAnswerResponses: adminAnswerResponses[] =
    data?.data.adminAnswerResponses || [];
  const navigate = useNavigate();
  const usePostInquiryAnswerMutation = usePostInquiryAnswer();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const handleClickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleClickAnswerBtn = useCallback(
    (values: any) => {
      usePostInquiryAnswerMutation.mutateAsync(
        { values, state },
        {
          onSuccess: (result) => {
            messageApi.open({
              type: 'success',
              content: '답변이 등록되었습니다.',
            });
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
          onSettled: async (data) => {
            await queryClient.invalidateQueries({
              queryKey: ['useGetInquiryDetail'],
            });
            form.resetFields();
          },
        },
      );
    },
    [usePostInquiryAnswerMutation, state, messageApi, queryClient, form],
  );

  return (
    <Card
      title="문의 조회"
      css={cssInquiryDetailManagementPageStyle}
      extra={
        <Button
          block
          onClick={handleClickBack}
          style={{ color: COMMON_COLOR.FONT2 }}
        >
          이전화면
        </Button>
      }
    >
      <div className="InquiryTitle">
        <Card title={data?.data.inquiryResponse.title}>
          <div className="InquiryInnerContent">
            {data?.data.inquiryResponse.content}
          </div>
        </Card>
        <List
          itemLayout="horizontal"
          dataSource={adminAnswerResponses}
          locale={{ emptyText: `\n\n등록된 답변이 없습니다\n\n` }}
          renderItem={(item) => (
            <List.Item>
              <Card style={{ width: '100%' }} title={item.adminName}>
                {item.content}
              </Card>
            </List.Item>
          )}
        />
        {contextHolder}
        <Form
          className="answerInput"
          form={form}
          onFinish={handleClickAnswerBtn}
          style={{ width: '100%' }}
        >
          <Form.Item
            name="content"
            rules={[{ required: true, message: '답변을 입력해주세요' }]}
          >
            <TextArea
              className="textInput"
              placeholder="답변을 입력해주세요"
              autoSize={{ minRows: 5, maxRows: 5 }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              block
              className="answerBtn"
              type="primary"
              htmlType="submit"
              style={{ color: COMMON_COLOR.WHITE }}
            >
              답변등록
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default InquiryDetailManagementPage;
