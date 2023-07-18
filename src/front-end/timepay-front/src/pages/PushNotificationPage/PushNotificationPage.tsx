import { Spin, Tabs, TabsProps } from 'antd';
import { useEffect, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import { useGetNotifications } from '../../api/hooks/push';
import { INotification, PUSH_TYPE } from '../../api/interfaces/IPush';
import PushCollapse from '../../components/PushCollapse';
import useFontSize from '../../hooks/useFontSize';
import { headerTitleState } from '../../states/uiState';
import { cssTabStyle } from '../../styles/constants/tabStyle';

const PushNotificationPage = () => {
  const { scaleValue } = useFontSize();

  const { data, isLoading } = useGetNotifications({
    pagingIndex: 0,
    pagingSize: 999,
  });

  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setHeaderTitle('알림함');
  });

  const notifications = useMemo(() => {
    return data?.data.content.map((notice) => ({
      ...notice,
      isAlreadyRead: true,
      type: 'notice',
    }));
  }, [data]);

  const pushes: {
    [key in typeof PUSH_TYPE.ACTIVITY | typeof PUSH_TYPE.ALL]:
      | INotification[]
      | undefined;
  } = useMemo(() => {
    return {
      [PUSH_TYPE.ALL]: notifications,
      [PUSH_TYPE.ACTIVITY]: notifications?.filter(
        (item) => item.notice === false,
      ),
    };
  }, [notifications]);

  const items: TabsProps['items'] = useMemo(() => {
    return [
      {
        key: PUSH_TYPE.ALL,
        label: PUSH_TYPE.ALL,
        children: isLoading ? (
          <Spin size="large" />
        ) : (
          <PushCollapse pushes={pushes[PUSH_TYPE.ALL]} />
        ),
      },
      {
        key: PUSH_TYPE.ACTIVITY,
        label: PUSH_TYPE.ACTIVITY,
        children: <PushCollapse pushes={pushes[PUSH_TYPE.ACTIVITY]} />,
      },
    ];
  }, [isLoading, pushes]);

  return (
    <Tabs
      css={cssTabStyle(scaleValue)}
      defaultActiveKey={PUSH_TYPE.ALL}
      items={items}
    />
  );
};

export default PushNotificationPage;
