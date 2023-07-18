import { css } from '@emotion/react';
import { PostStatusTagColorProps } from './PostStatusTag';

export const cssPostStatusTagStyle = (
  props: PostStatusTagColorProps,
  scaleValue: number,
) => css`
  margin: 0;
  padding: 0 calc(5px * ${scaleValue});
  color: ${props.pointColor};
  border: 1px solid ${props.pointColor};
  background-color: ${props.backgroundColor};
  font-style: normal;
  font-weight: 700;
  font-size: calc(15px * ${scaleValue});
  line-height: calc(20px * ${scaleValue});
`;
