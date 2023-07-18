import {
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Button,
  InputNumber,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { useCallback, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IGetReportRequest } from '../../api/interfaces/IReport';
import { reportSearchState } from '../../states/reportSearchState';
import { cssReportSearchFormStyle } from './ReportSearchForm.styles';

const ReportSearchForm = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [inputValue, setInputValue] = useState();
  const queryClient = useQueryClient();
  const reportSearchValue = useRecoilValue(reportSearchState);
  const setReportSearch = useSetRecoilState(reportSearchState);

  const onFinish = useCallback(
    async (values: IGetReportRequest) => {
      console.log(values);
      setReportSearch({
        ...values,
      });
      await queryClient.invalidateQueries({
        queryKey: ['useGetReport', values],
      });
    },
    [queryClient, setReportSearch],
  );

  const searchInputValue = useMemo(() => {
    if (inputValue)
      switch (inputValue) {
        case 'reportId':
          return (
            <Form.Item
              name="reportId"
              initialValue={reportSearchValue?.reportId}
            >
              <InputNumber
                style={{ width: 250 }}
                placeholder="신고글 번호를 입력해주세요"
              />
            </Form.Item>
          );

        case 'name':
          return (
            <Form.Item
              name="reporterName"
              initialValue={reportSearchValue?.reporterName}
            >
              <Input placeholder="신고자 이름을 입력해주세요" />
            </Form.Item>
          );

        case 'reason':
          return (
            <Form.Item name="reason" initialValue={reportSearchValue?.reason}>
              <Input placeholder="신고 내용을 입력해주세요" />
            </Form.Item>
          );

        case 'time':
          return (
            <>
              <Form.Item
                name="startTime"
                initialValue={reportSearchValue?.startTime}
              >
                <DatePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="start time"
                />
              </Form.Item>
              <Form.Item
                name="endTime"
                initialValue={reportSearchValue?.endTime}
              >
                <DatePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="end time"
                />
              </Form.Item>
            </>
          );
      }
  }, [
    inputValue,
    reportSearchValue?.endTime,
    reportSearchValue?.reason,
    reportSearchValue?.reportId,
    reportSearchValue?.reporterName,
    reportSearchValue?.startTime,
  ]);

  const onValuesChange = useCallback((changedFields: any) => {
    console.log(changedFields);
    setInputValue(changedFields);
  }, []);

  return (
    <div css={cssReportSearchFormStyle}>
      <Form form={form} layout="horizontal" onFinish={onFinish}>
        <Row>
          <Form.Item
            name="searchLabel"
            rules={[{ required: true }]}
            initialValue={reportSearchValue?.searchLabel}
          >
            <Select
              placeholder="검색값을 골라주세요."
              allowClear
              onChange={onValuesChange}
            >
              <Option value="reportId">신고글 번호</Option>
              <Option value="name">신고자 이름</Option>
              <Option value="reason">신고내용</Option>
              <Option value="time">작성시간</Option>
            </Select>
          </Form.Item>
          <Form.Item noStyle>{searchInputValue}</Form.Item>

          <Button
            htmlType="submit"
            style={{ marginLeft: 'auto' }}
            type="primary"
          >
            검색
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default ReportSearchForm;
