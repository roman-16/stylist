import React, { useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { scene7 } from '@helpers';
import { useContext } from '@shared/hooks';
import styledSystem from './shared/styledSystem';
import Box from './Box';

const transparentImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const modifySrc = (src) => {
  if (typeof src !== 'object') {
    return src;
  }

  const { src: innerSrc, ...options } = src;

  return scene7.addParams(innerSrc, options);
};

const Image = styled.img`
  object-fit: cover;
  object-position: 50% 50%;

  ${styledSystem}
`;

export default ({ src, srcset, disableLazyLoading, aspectRatio, ...props }) => {
  const image = useRef();
  const { api } = useContext();
  const newSrc = useMemo(() => modifySrc(src), [src]);
  const newSrcSet = useMemo(() => modifySrc(srcset), [srcset]);

  useEffect(() => {
    // Enable lazy loading from hybris on staging and production
    if (!disableLazyLoading && api.bto.lazyload.customImages) {
      api.bto.lazyload.customImages(image.current);
    } else {
      image.current.src = image.current.dataset.src;
    }
  }, [api.bto.lazyload, disableLazyLoading, newSrc]);

  return aspectRatio ? (
    <Box position="relative" paddingBottom={`${(aspectRatio.height / aspectRatio.width) * 100}%`} width="100%">
      <Image ref={image} src={transparentImage} srcset={newSrcSet} data-src={newSrc} position="absolute" {...props} />
    </Box>
  ) : (
    <Image ref={image} src={transparentImage} srcset={newSrcSet} data-src={newSrc} {...props} />
  );
};
