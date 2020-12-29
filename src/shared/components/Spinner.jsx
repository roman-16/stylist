import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Box } from '@shared/components';

const spinnerTiles = 8;
const animationDuration = 1.2;

const opacityAnimation = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const SpinnerTileContainer = styled(Box)`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const SpinnerTile = styled(Box)`
  position: relative;
  height: 24%;
  width: 10%;
  border-radius: 40%;
  animation: ${opacityAnimation} ${animationDuration}s linear infinite;
  animation-delay: ${(props) => props.animationDelay};
`;

export default ({ color, size = '30px', ...props }) => (
  <Box position="relative" height={size} width={size} {...props}>
    {[...Array(spinnerTiles)].map((value, i) => (
      <SpinnerTileContainer
        // eslint-disable-next-line react/no-array-index-key
        key={i}
        transform={`rotate(-${(360 / spinnerTiles) * (i + 1)}deg)`}
      >
        <SpinnerTile
          backgroundColor={color ?? 'black'}
          animationDelay={`-${(animationDuration / spinnerTiles) * (i + 1)}s`}
        />
      </SpinnerTileContainer>
    ))}
  </Box>
);
