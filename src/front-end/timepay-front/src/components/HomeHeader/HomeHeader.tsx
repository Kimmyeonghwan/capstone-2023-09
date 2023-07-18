import { BellOutlined, MenuOutlined } from '@ant-design/icons';
import { Badge, Dropdown, MenuProps } from 'antd';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  cssHomeHeaderMenuItemStyle,
  cssHomeHeaderNotificationStyle,
  cssHomeHeaderStyle,
} from './HomeHeader.styles';
import queryString from 'query-string';
import { PATH } from '../../utils/paths';

const HomeHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPostType = useMemo(() => {
    const qs = queryString.parse(location.search);
    if (
      qs &&
      qs.type &&
      typeof qs.type === 'string' &&
      ['전체', '도움요청', '도움제공', '자유', '후기'].includes(qs.type)
    )
      return qs.type;
    else return '전체';
  }, [location]);

  const items: MenuProps['items'] = useMemo(() => {
    return [
      {
        label: (
          <div
            css={cssHomeHeaderMenuItemStyle}
            onClick={() =>
              navigate({ pathname: PATH.HOME, search: '?type=전체' })
            }
          >
            전체
          </div>
        ),
        key: '전체',
        disabled: currentPostType === '전체',
      },
      {
        label: (
          <div
            css={cssHomeHeaderMenuItemStyle}
            onClick={() =>
              navigate({ pathname: PATH.HOME, search: '?type=도움요청' })
            }
          >
            도움요청
          </div>
        ),
        key: '도움요청',
        disabled: currentPostType === '도움요청',
      },
      {
        label: (
          <div
            css={cssHomeHeaderMenuItemStyle}
            onClick={() =>
              navigate({ pathname: PATH.HOME, search: '?type=도움제공' })
            }
          >
            도움제공
          </div>
        ),
        key: '도움제공',
        disabled: currentPostType === '도움제공',
      },
      {
        label: (
          <div
            css={cssHomeHeaderMenuItemStyle}
            onClick={() =>
              navigate({ pathname: PATH.HOME, search: '?type=자유' })
            }
          >
            자유
          </div>
        ),
        key: '자유',
        disabled: currentPostType === '자유',
      },
      {
        label: (
          <div
            css={cssHomeHeaderMenuItemStyle}
            onClick={() =>
              navigate({ pathname: PATH.HOME, search: '?type=후기' })
            }
          >
            후기
          </div>
        ),
        key: '후기',
        disabled: currentPostType === '후기',
      },
    ];
  }, [currentPostType, navigate]);

  const handleOnLinkNotification = useCallback(() => {
    navigate(PATH.NOTIFICATION);
  }, [navigate]);

  return (
    <div css={cssHomeHeaderStyle}>
      <Dropdown
        css={cssHomeHeaderStyle}
        menu={{ items }}
        placement="bottomLeft"
        arrow
        trigger={['click']}
      >
        <div>
          <MenuOutlined />
          {currentPostType}
        </div>
      </Dropdown>
      <Badge dot css={cssHomeHeaderNotificationStyle}>
        <BellOutlined onClick={handleOnLinkNotification} />
      </Badge>
    </div>
  );
};

export default HomeHeader;
