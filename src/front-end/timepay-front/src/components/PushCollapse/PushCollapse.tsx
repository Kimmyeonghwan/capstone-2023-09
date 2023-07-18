import {
  CommentOutlined,
  ExclamationOutlined,
  HeartOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { Collapse } from 'antd';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { usePutNotificationViewed } from '../../api/hooks/push';
import { INotification } from '../../api/interfaces/IPush';
import useFontSize from '../../hooks/useFontSize';
import { cssPushCollapseStyle, cssPushPanelStyle } from './PushCollapse.styles';

const PushCollapse = ({ pushes }: { pushes: INotification[] | undefined }) => {
  const queryClient = useQueryClient();
  const usePutNotificationViewedMutation = usePutNotificationViewed();

  const { scaleValue } = useFontSize();

  const navigate = useNavigate();
  const getIcon = useCallback((push: INotification) => {
    switch (push.type) {
      case 'bookmark':
        return <HeartOutlined />;
      case 'comment':
        return <CommentOutlined />;
      case 'notice':
        return <NotificationOutlined />;
      case 'activity':
        return <ExclamationOutlined />;
    }
  }, []);

  const getTitle = useCallback((push: INotification) => {
    if (push.type === 'comment')
      return (
        <>
          <span>{push.title}</span>
          <br />
          <span className="comment-preview">{push.content}</span>
        </>
      );
    else if (push.type === 'notice') {
      return (
        <div className="detail-push">
          <span>{push.title}</span>
          <span className="show-detail">자세히 보기</span>
        </div>
      );
    } else {
      return (
        <div>
          <span>{push.title}</span>
        </div>
      );
    }
  }, []);

  const handleOnClickHeader = useCallback(
    async (push: INotification) => {
      if (!push.viewed)
        await usePutNotificationViewedMutation.mutateAsync(
          push.notificationId,
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['useGetNotifications'],
              });
            },
            onSettled: () => {
              if (push.type !== 'notice' && push.link) {
                navigate(push.link);
              }
            },
          },
        );
    },
    [navigate, queryClient, usePutNotificationViewedMutation],
  );

  const getHeader = useCallback(
    (push: INotification) => {
      return (
        <div className="push-header" onClick={() => handleOnClickHeader(push)}>
          <span className="icon">{getIcon(push)}</span>
          <span className="title">{getTitle(push)}</span>
        </div>
      );
    },
    [getIcon, getTitle, handleOnClickHeader],
  );

  return (
    <Collapse
      css={cssPushCollapseStyle(scaleValue)}
      expandIconPosition="end"
      bordered={false}
    >
      {pushes?.map((push, index) => (
        <Collapse.Panel
          className={push.viewed ? 'is-already-read' : 'not-read'}
          css={cssPushPanelStyle(scaleValue)}
          key={index}
          header={getHeader(push)}
          showArrow={false}
          collapsible={push.type === 'notice' ? 'header' : 'disabled'}
        >
          <div>{push.content}</div>
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};
export default PushCollapse;
