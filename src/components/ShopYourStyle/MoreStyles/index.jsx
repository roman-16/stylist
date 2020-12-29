import React from 'react';
import styled from 'styled-components';
import { useContext, useMediaQuery } from '@shared/hooks';
import { Swiper, useSwiper } from '@shared/components';
import { Background } from '../shared';
import Style from './Style';

const StyledStyle = styled(Style)`
  min-width: 155px;
  margin-left: 10px;

  &:first-child {
    margin-left: unset;
  }

  ${(props) => props.theme.mediaQueries.medium} {
    margin-left: 30px;
    min-width: 270px;
  }
`;

export default ({ styleId, styles, ...props }) => {
  const { api } = useContext();
  const isMedium = useMediaQuery('medium');
  const { swiperProps } = useSwiper({
    navigation: {
      enabled: isMedium,
      step: 2,
    },
    justifyContent: 'center',
  });

  return (
    <Background {...props}>
      <Swiper {...swiperProps} offsetBefore="10px" offsetAfter="10px">
        {styles
          .filter((style) => style.id !== styleId)
          .slice(0, 6)
          .map((style, i) => {
            const analyticsProps = {
              'data-label': `sys-${api.dataLayer.sysdp.id}`,
              'data-position': i + 1,
            };

            return <StyledStyle style={style} key={style.id} analyticsProps={analyticsProps} />;
          })}
      </Swiper>
    </Background>
  );
};
