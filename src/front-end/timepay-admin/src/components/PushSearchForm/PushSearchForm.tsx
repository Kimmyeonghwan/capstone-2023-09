import { Form, Input, Row, Button } from 'antd';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IGetNotificationRequest } from '../../api/interfaces/INotification';
import { pushSearchState } from '../../states/pushSearchState';
import { cssPushSearchFormStyle } from './PushSearchForm.styles';

const PushSearchForm = () => {
  const queryClient = useQueryClient();

  const pushSearchValue = useRecoilValue(pushSearchState);
  const setPushSearch = useSetRecoilState(pushSearchState);
  const handleOnSearchPush = useCallback(
    async (values: IGetNotificationRequest) => {
      setPushSearch(values);
      await queryClient.invalidateQueries({
        queryKey: ['useGetNotifications', values],
      });
    },
    [setPushSearch, queryClient],
  );

  return (
    <div css={cssPushSearchFormStyle}>
      <Form layout="horizontal" onFinish={handleOnSearchPush}>
        <Row>
          <Form.Item
            label="공지 제목"
            name="title"
            initialValue={pushSearchValue?.title}
          >
            <Input placeholder="공지 제목 입력" />
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
    </div>
  );
};

export default PushSearchForm;
