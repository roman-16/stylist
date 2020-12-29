import React from 'react';
import styled, { css } from 'styled-components';
import { useDeepCompareEffect } from 'react-use';
import { Box, Flex } from '@shared/components';
import styledSystem from '../shared/styledSystem';
import NavigationButton from './NavigationButton';

const Swiper = styled(Flex).attrs((props) => ({ scrollbar: props.scrollbar ?? 'hidden' }))`
  scroll-snap-type: ${(props) => props.scrollType ?? 'x mandatory'};
  scroll-behavior: smooth;
  overflow-x: auto;
  /* Enable snap-scroll on safari https://stackoverflow.com/q/33334501 */
  -webkit-overflow-scrolling: touch;

  & > * {
    scroll-snap-align: start;
  }

  ${({ offsetAfter }) =>
    offsetAfter &&
    css`
      &::after {
        content: '';
        width: ${offsetAfter};
        min-width: ${offsetAfter};
        max-width: ${offsetAfter};
        scroll-snap-align: end;
      }
    `}

  ${({ offsetBefore }) =>
    offsetBefore &&
    css`
      &::before {
        content: '';
        width: ${offsetBefore};
        min-width: ${offsetBefore};
        max-width: ${offsetBefore};
        scroll-snap-align: start;
      }
    `}

  ${(props) =>
    props.spaceBetween &&
    css`
      & > * {
        margin-right: ${props.spaceBetween};

        &:last-child {
          margin-right: 0;
        }
      }
    `}

  ${styledSystem}
`;

const NavigationButtonWrapper = styled(Box)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1000;
  height: 100%;
  pointer-events: none;
`;

export default React.forwardRef(
  ({ addNextArrow, addPreviousArrow, onNextClick, onPreviousClick, onChildrenChange, children, ...props }, ref) => {
    useDeepCompareEffect(() => {
      onChildrenChange && onChildrenChange(children);
    }, [onChildrenChange, React.Children.map(children, (child) => child.key)]);

    return (
      <Box position={addNextArrow || addPreviousArrow ? 'relative' : undefined} width="100%">
        {addNextArrow && (
          <NavigationButtonWrapper right="0">
            <NavigationButton pointerEvents="all" onClick={onNextClick} alt="Right" />
          </NavigationButtonWrapper>
        )}
        {addPreviousArrow && (
          <NavigationButtonWrapper left="0">
            <NavigationButton transform="rotate(180deg)" pointerEvents="all" onClick={onPreviousClick} alt="Left" />
          </NavigationButtonWrapper>
        )}

        <Swiper {...props} ref={ref}>
          {children}
        </Swiper>
      </Box>
    );
  },
);

export { default as useSwiper } from './useSwiper';
