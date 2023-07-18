import { Button, Checkbox, Form, Input, message, Row, Select } from 'antd';
import { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IGetAgencyRequest } from '../../api/interfaces/IAgency';
import { agencySearchState } from '../../states/agencySearchState';
import { cssAgencySearchFormStyle } from './AgencySearchForm.styles';

const AgencySearchForm = () => {
  const queryClient = useQueryClient();

  const agencySearchValue = useRecoilValue(agencySearchState);
  const setAgencySearch = useSetRecoilState(agencySearchState);

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [volunteerAvailable, setVolunteerAvailable] = useState(true);
  const [valueAvailable, setValueAvailable] = useState(true);

  const handleOnChangeAgency = useCallback(
    (changedValues: any, values: IGetAgencyRequest) => {
      console.log(values);
      if (
        values.queryValue === 'user' &&
        values.value &&
        values.value.length > 0
      ) {
        form.setFieldValue('volunteerCheck', false);
        setVolunteerAvailable(false);
      } else if (values.volunteerCheck && values.queryValue === 'user') {
        form.setFieldValue('value', undefined);
        setValueAvailable(false);
      } else {
        setValueAvailable(true);
        setVolunteerAvailable(true);
      }
    },
    [form],
  );

  const handleOnSearchAgency = useCallback(
    async (values: IGetAgencyRequest) => {
      if (
        values.queryValue === 'user' &&
        values.value &&
        isNaN(Number(values.value))
      )
        messageApi.open({
          type: 'error',
          content: '회원 번호 검색 시에는 숫자만 넣어주세요',
        });
      else {
        const searchValue = {
          ...values,
          query:
            values.value && values.value.length > 0
              ? values.queryValue
              : undefined,
          value:
            !values.value || values.value.length === 0
              ? undefined
              : values.value,
          volunteer:
            values.queryValue === 'user'
              ? null
              : values.volunteerCheck === true
              ? 'y'
              : 'n',
        };
        console.log(searchValue);
        setAgencySearch(searchValue);
        await queryClient.invalidateQueries({
          queryKey: ['useGetAgencies', searchValue],
        });
      }
    },

    [messageApi, setAgencySearch, queryClient],
  );

  return (
    <div css={cssAgencySearchFormStyle}>
      {contextHolder}
      <Form
        form={form}
        layout="horizontal"
        onFinish={handleOnSearchAgency}
        onValuesChange={handleOnChangeAgency}
      >
        <Row>
          <Form.Item
            name="queryValue"
            initialValue={agencySearchValue.queryValue}
          >
            <Select>
              <Select.Option key="business" value="business">
                사업자 등록번호
              </Select.Option>
              <Select.Option key="user" value="user">
                회원 번호
              </Select.Option>
              <Select.Option key="name" value="name">
                담당자 이름
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="value" initialValue={agencySearchValue.value}>
            <Input disabled={!valueAvailable} />
          </Form.Item>
          <Form.Item
            name="volunteerCheck"
            valuePropName="checked"
            initialValue={agencySearchValue.volunteerCheck}
          >
            <Checkbox disabled={!volunteerAvailable}>
              봉사활동 기관만 보기
            </Checkbox>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: 'auto' }}
          >
            검색
          </Button>
        </Row>
        <Row>봉사활동 기관 여부는 회원 번호와 함께 검색할 수 없습니다.</Row>
      </Form>
    </div>
  );
};

export default AgencySearchForm;
