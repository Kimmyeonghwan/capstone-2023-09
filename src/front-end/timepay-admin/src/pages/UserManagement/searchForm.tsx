import { Input, Button, Form, Row, Select, message } from 'antd';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { mainSearchState } from './mainSearchState';
import { IGetUserInfoRequest } from '../../api/interfaces/IUser';
import { cssPushSearchFormStyle } from '../../components/PushSearchForm/PushSearchForm.styles';

const SearchForm = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const queryClient = useQueryClient();
  const Search = useRecoilValue(mainSearchState);
  const setSearch = useSetRecoilState(mainSearchState);

  /*필터 검색*/
  const handleSearchBtn = useCallback(
    async (values: IGetUserInfoRequest) => {
      if (values.userId && values.value) {
        messageApi.warning({
          content: 'UID나 이름/닉네임 둘 중 하나만 입력해야 합니다.',
        });
      } else {
        setSearch({
          ...Search,
          pagingIndex: 0,
          userId: values.userId,
          query: values.query,
          value: values.value,
        });
        await queryClient.invalidateQueries({
          queryKey: ['user-search', values],
        });
      }
    },
    [Search, setSearch, messageApi, queryClient],
  );

  return (
    <div css={cssPushSearchFormStyle}>
      <Form layout="horizontal" onFinish={handleSearchBtn}>
        <Row>
          <Form.Item label="UID" name="userId" initialValue={Search?.userId}>
            <Input placeholder="UID로 검색" />
          </Form.Item>
          <Form.Item
            name="query"
            initialValue={Search?.query}
            style={{ marginLeft: 50 }}
          >
            <Select style={{ width: 100 }}>
              <Select.Option value="name">이름</Select.Option>
              <Select.Option value="nickname">닉네임</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="value" initialValue={Search?.value}>
            <Input placeholder="이름 또는 닉네임으로 검색" />
          </Form.Item>

          <Button
            style={{ marginLeft: 'auto' }}
            htmlType="submit"
            type="primary"
          >
            검색
          </Button>
        </Row>
      </Form>
      {contextHolder}
    </div>
  );
};
export default SearchForm;
