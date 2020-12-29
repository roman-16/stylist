import React, { useMemo } from 'react';
import styled from 'styled-components';
import { addBaseAnalyticsProps } from '@helpers';
import { A, Image, Text } from '@shared/components';
import StyleLike from '../../StyleLike';

const StyleHeadline = styled(Text).attrs({ textOverflow: true, color: 'anthrazit' })`
  font-size: 12px;
  font-weight: bold;
  text-align: center;

  ${(props) => props.theme.mediaQueries.medium} {
    font-size: 15px;
    text-align: left;
  }
`;

const StyledStyleLike = styled(StyleLike)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export default ({ style, className, src, ...props }) => {
  const analyticsProps = useMemo(
    () =>
      addBaseAnalyticsProps({
        className: 'track-click',
        action: 'click-sys',
        label: `sys-${style.id}`,
      }),
    [style.id],
  );

  return (
    <A
      type="nav"
      // position relative to position StyleLike
      position="relative"
      href={style.url}
      {...analyticsProps}
      {...props}
      className={`${analyticsProps.className} ${className ?? ''}`}
    >
      <Image display="block" src={src} alt="Style" />
      {style.likes && <StyledStyleLike style={style} />}
      {style.headline && <StyleHeadline mt="3">{style.headline}</StyleHeadline>}
    </A>
  );
};
