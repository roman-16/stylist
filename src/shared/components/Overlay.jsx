import React, { useEffect, useRef } from 'react';
import { useClickAway } from 'react-use';
import styled from 'styled-components';
import Box from './Box';
import Button from './Button';
import Svg from './Svg';

const zIndex = 10000000;

const Background = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: ${zIndex};

  opacity: 0.5;
  background-color: ${(props) => props.theme.colors.anthrazit};

  ${(props) => (props.isOpen ? '' : 'display: none;')}
`;

const Centerer = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: ${zIndex + 1};
`;

const Overlay = styled(Box)`
  position: relative;
  ${(props) => (props.isOpen ? '' : 'display: none;')}
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  z-index: ${zIndex + 2};

  ${(props) => props.theme.mediaQueries.small} {
    height: 75%;
    width: 500px;
  }
`;

const CloseButton = styled(Button)`
  position: absolute;
  right: 0;
  height: 14px;
  width: 14px;
  margin: 16px;
`;

export default ({ isOpen, setIsOpen, noBackground, blockBodyScroll = true, children, closeSvgProps, ...props }) => {
  const overlayRef = useRef();
  const bodyOverflow = useRef();
  const MaybeCenterer = noBackground ? Box : Centerer;

  useClickAway(overlayRef, () => setIsOpen(false));

  useEffect(() => {
    if (!blockBodyScroll) return;

    if (isOpen) {
      bodyOverflow.current = document.body.style.overflow;

      document.body.style.overflow = 'hidden';
    } else {
      if (bodyOverflow.current === undefined) return;

      document.body.style.overflow = bodyOverflow.current;
      bodyOverflow.current = undefined;
    }
  }, [isOpen, blockBodyScroll]);

  return (
    <>
      <MaybeCenterer isOpen={isOpen}>
        <Overlay {...props} ref={overlayRef} isOpen={isOpen}>
          <CloseButton
            onClick={(event) => {
              event.preventDefault();
              setIsOpen(false);
            }}
          >
            <Svg display="block" height="100%" width="100%" {...closeSvgProps}>
              <use xlinkHref="/svg/symbol-defs.svg#icon-x-thin" />
            </Svg>
          </CloseButton>

          {children}
        </Overlay>
      </MaybeCenterer>
      {!noBackground && <Background isOpen={isOpen} />}
    </>
  );
};
