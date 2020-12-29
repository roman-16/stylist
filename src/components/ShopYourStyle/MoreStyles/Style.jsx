import React, { useMemo } from 'react';
import styled from 'styled-components';
import { addBaseAnalyticsProps } from '@helpers';
import { useMediaQuery } from '@shared/hooks';
import { A, Box, Image, Text } from '@shared/components';
import StyleLike from '../StyleLike';

const StyledStyleLike = styled(StyleLike)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export default ({ style, className, ...props }) => {
  const isMedium = useMediaQuery('medium');
  const analyticsProps = useMemo(
    () =>
      addBaseAnalyticsProps({
        // TODO: add correct data to analyticsProps
        // label and position must be passed
        className: 'track-click track-load-producttile',
        action: 'click-sys',
        category: 'shop-your-style',
        // articlenr: style.meta.code,
        // productname: `${style.brand} ${style.meta.englishname}`,
        // categorie: style.meta.breadcrumb,
        // brand: style.brand,
        // 'brand-color': style.meta.colorId,
      }),
    [],
  );

  return (
    <A
      // position relative to position StyleLike
      position="relative"
      type="nav"
      href={style.url}
      {...analyticsProps}
      {...props}
      className={`${analyticsProps.className} ${className ?? ''}`}
    >
      <Box>
        <Image
          width="100%"
          src={{
            src: style.images[0].image,
            preset: 'pdtx2',
            width: isMedium ? 540 : 310,
            height: isMedium ? 720 : 412,
            align: '0,-1',
          }}
          alt={style.title}
          aspectRatio={{ width: 540, height: 720 }}
        />
        {style.likes && <StyledStyleLike style={style} />}
      </Box>
      {style.headline && (
        <Text fontSize={{ _: '12px', medium: '15px' }} mt="6px" textOverflow>
          {style.headline}
        </Text>
      )}
    </A>
  );
};
