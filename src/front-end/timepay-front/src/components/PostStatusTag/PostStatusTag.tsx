import { Tag } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import useFontSize from '../../hooks/useFontSize';
import { COMMON_COLOR } from '../../styles/constants/colors';
import { getStatus } from '../../utils/board';
import { cssPostStatusTagStyle } from './PostStatusTag.styles';

export interface PostStatusTagColorProps {
  pointColor: string;
  backgroundColor?: string;
}

const PostStatusTag = ({ status }: { status?: string | null | undefined }) => {
  const { scaleValue } = useFontSize();
  const [currentStatus, setCurrentStatus] = useState<string | null | undefined>(
    null,
  );

  const statusColor: PostStatusTagColorProps = useMemo(() => {
    switch (getStatus(currentStatus)) {
      case '모집중':
        return {
          pointColor: COMMON_COLOR.MAIN1,
        };
      case '모집완료':
        return {
          pointColor: COMMON_COLOR.FONT2,
        };
      case '활동중':
        return {
          pointColor: COMMON_COLOR.FONT2,
        };
      case '활동완료':
        return {
          pointColor: COMMON_COLOR.BLUE_GRAY,
        };
      case '활동취소':
        return {
          pointColor: COMMON_COLOR.FONT2,
          backgroundColor: COMMON_COLOR.FONT1,
        };
      default:
        return {
          pointColor: COMMON_COLOR.FONT2,
        };
    }
  }, [currentStatus]);

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  return (
    <Tag css={cssPostStatusTagStyle(statusColor, scaleValue)}>
      {getStatus(currentStatus) || '로딩 중'}
    </Tag>
  );
};

export default PostStatusTag;
