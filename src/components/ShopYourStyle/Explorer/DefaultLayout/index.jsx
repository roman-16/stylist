import React, { useState } from 'react';
import { useWindowSize } from 'react-use';
import { useContext } from '@shared/hooks';
import { Container, Navigation, ShopYourStyleTitle } from '../shared';
import DesktopBody from './DesktopBody';
import MobileBody from './MobileBody';

export default ({ styles, ...props }) => {
  const { theme } = useContext();
  const { width } = useWindowSize();
  const [selectedStyle, setSelectedStyle] = useState(0);
  const style = styles[selectedStyle];

  return (
    <Container py={{ _: '10px', medium: '35px' }} {...props}>
      <ShopYourStyleTitle mb="18px" />
      <Navigation
        maxWidth="100%"
        styles={styles.map(({ images, alt }) => ({ src: images[0].image, alt }))}
        onChange={(i) => setSelectedStyle(i)}
      />
      {width >= theme.breakpointsPx.medium ? (
        <DesktopBody mt="35px" style={style} />
      ) : (
        <MobileBody mt="15px" style={style} />
      )}
    </Container>
  );
};
