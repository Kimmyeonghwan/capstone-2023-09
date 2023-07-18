import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Row,
  Button,
  message,
} from 'antd';
import { cssQnASearchFormStyle } from './QnASearchForm.styles';
import { useQueryClient } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { inquirySearchState } from '../../states/inquirySearchState';
import { useCallback } from 'react';
import { IGetInquiryRequest } from '../../api/interfaces/IInquiry';

const QnASearchForm = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const queryClient = useQueryClient();
  const inquirySearchValue = useRecoilValue(inquirySearchState);
  const setInquirySearch = useSetRecoilState(inquirySearchState);

  const onFinish = useCallback(
    async (values: IGetInquiryRequest) => {
      if (values.title && values.writer) {
        messageApi.warning({
          content: '제목이나 작성자 정보 둘 중 하나만 입력해야합니다.',
        });
      } else {
        console.log('test');
        setInquirySearch({
          ...inquirySearchValue,
          pagingIndex: 0,
          state: values.state,
          category: values.category,
          title: values.title,
          writer: values.writer,
        });
        console.log(inquirySearchValue);
        await queryClient.invalidateQueries({
          queryKey: ['useGetInquiry', values],
        });
      }
    },
    [messageApi, setInquirySearch, inquirySearchValue, queryClient],
  );

  return (
    <div css={cssQnASearchFormStyle}>
      {contextHolder}
      <Form form={form} layout="horizontal" onFinish={onFinish}>
        <Row>
          <Form.Item name="state" initialValue={inquirySearchValue?.state}>
            <Select style={{ width: 150 }}>
              <Select.Option value="답변대기">답변대기</Select.Option>
              <Select.Option value="답변완료">답변완료</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            style={{ marginRight: 15 }}
            label="카테고리"
            rules={[
              { required: true, message: '카테고리는 필수 입력값입니다' },
            ]}
            initialValue={inquirySearchValue?.category}
          >
            <Input style={{ width: 200 }} placeholder="카테고리 입력" />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            name="title"
            style={{ marginRight: 15 }}
            label="문의 제목"
            initialValue={inquirySearchValue?.title}
          >
            <Input style={{ width: 200 }} placeholder="제목 입력" />
          </Form.Item>
          <Form.Item
            name="writer"
            style={{ marginRight: 15 }}
            label="문의 작성자"
            initialValue={inquirySearchValue?.writer}
          >
            <Input style={{ width: 200 }} placeholder="문의 작성자 입력" />
          </Form.Item>

          <Button
            style={{ marginLeft: 'auto' }}
            type="primary"
            htmlType="submit"
          >
            검색
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default QnASearchForm;
