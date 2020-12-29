import React from 'react';
import { useWindowSize } from 'react-use';
import { useContext } from '@shared/hooks';
import { Container } from '../shared';
import DesktopBody from './DesktopBody';
import MobileBody from './MobileBody';

export default ({ styles, ...props }) => {
  const { theme } = useContext();
  const { width } = useWindowSize();
  const style = styles[0];

  return (
    <Container py={{ _: '10px', medium: 'unset' }} {...props}>
      {width >= theme.breakpointsPx.medium ? <DesktopBody style={style} /> : <MobileBody style={style} />}
    </Container>
  );
};
