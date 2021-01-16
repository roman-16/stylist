import React from 'react';
import styled from '@/astyle';
import { useDeepCompareEffect } from 'react-use';
import { Box, Flex } from '@shared/components';
import NavigationButton from './NavigationButton';

const Swiper = styled(Flex, ({ props }) => ({
  scrollSnapType: props.scrollType ?? 'x mandatory', // TODO: testing
  scrollBehavior: 'smooth',
  overflowX: 'auto',
  scrollbar: '$hidden',
  // Enable snap-scroll on safari https://stackoverflow.com/q/33334501
  WebkitOverflowScrolling: 'touch',

  '& > *': {
    scrollSnapAlign: 'start',
  },

  ...(props.offsetBefore && {
    '&::before': {
      content: "''",
      width: props.offsetBefore,
      minWidth: props.offsetBefore,
      maxWidth: props.offsetBefore,
      scrollSnapAlign: 'start',
    },
  }),

  ...(props.offsetAfter && {
    '&::after': {
      content: "''",
      width: props.offsetAfter,
      minWidth: props.offsetAfter,
      maxWidth: props.offsetAfter,
      scrollSnapAlign: 'end',
    },
  }),

  ...(props.spaceBetween && {
    '& > *': {
      marginRight: props.spaceBetween,

      '&:last-child': {
        marginRight: '0',
      },
    },
  }),
}));

const NavigationButtonWrapper = styled(Box, {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  zIndex: '1000',
  height: '100%',
  pointerEvents: 'none',
});

export default React.forwardRef(
  ({ addNextArrow, addPreviousArrow, onNextClick, onPreviousClick, onChildrenChange, children, ...props }, ref) => {
    useDeepCompareEffect(() => {
      onChildrenChange && onChildrenChange(children);
    }, [onChildrenChange, React.Children.map(children, (child) => child.key)]);

    return (
      // TODO: testing
      <Box css={{ position: addNextArrow || addPreviousArrow ? 'relative' : undefined, width: '100%' }}>
        {addNextArrow && (
          <NavigationButtonWrapper css={{ right: '0' }}>
            <NavigationButton css={{ pointerEvents: 'all' }} onClick={onNextClick} alt="Right" />
          </NavigationButtonWrapper>
        )}
        {addPreviousArrow && (
          <NavigationButtonWrapper css={{ left: '0' }}>
            <NavigationButton
              css={{ pointerEvents: 'all', transform: 'rotate(180deg)' }}
              onClick={onPreviousClick}
              alt="Left"
            />
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
