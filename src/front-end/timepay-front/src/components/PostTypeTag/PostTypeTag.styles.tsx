import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';
import { PostTypeTagColorProps } from './PostTypeTag';

export const cssPostTypeTagStyle = (
  props: PostTypeTagColorProps,
  scaleValue: number,
) => css`
  background-color: ${props.backgroundColor};
  color: ${COMMON_COLOR.WHITE};
  border-radius: calc(30px * ${scaleValue});
  width: calc(60px * ${scaleValue});
  padding: 0 calc(5px * ${scaleValue});
  font-style: normal;
  font-weight: 700;
  font-size: calc(13px * ${scaleValue});
  line-height: calc(20px * ${scaleValue});
  text-align: center;
  height: max-content;
`;
