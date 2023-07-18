import { useMemo } from 'react';
import useFontSize from '../../hooks/useFontSize';
import { COMMON_COLOR } from '../../styles/constants/colors';
import { getType } from '../../utils/board';
import { cssPostTypeTagStyle } from './PostTypeTag.styles';

export interface PostTypeTagColorProps {
  backgroundColor: string;
}
const PostTypeTag = ({ type }: { type?: string }) => {
  const { scaleValue } = useFontSize();
  const typeColor: PostTypeTagColorProps = useMemo(() => {
    switch (getType(type)) {
      case '도움요청':
        return {
          backgroundColor: COMMON_COLOR.MAIN1,
        };
      case '같이하기':
        return {
          backgroundColor: COMMON_COLOR.MAIN2,
        };

      case '기부하기':
        return {
          backgroundColor: COMMON_COLOR.NEON_GREEN,
        };
      default:
        return {
          backgroundColor: COMMON_COLOR.MAIN1,
        };
    }
  }, [type]);
  return (
    <div css={cssPostTypeTagStyle(typeColor, scaleValue)}>
      {getType(type) || '로딩 중'}
    </div>
  );
};

export default PostTypeTag;
