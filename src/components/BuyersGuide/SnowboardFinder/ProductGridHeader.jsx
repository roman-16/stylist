import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { resolveTemplate } from '@helpers';
import { useBoundingClientRect, useTranslations, useMediaQuery } from '@shared/hooks';
import { Button, Flex, Heading, Spinner, Svg } from '@shared/components';

const DesktopHeader = styled(Heading.H3).attrs({ font: 'h-l' })`
  letter-spacing: normal;
  text-align: center;
`;

const StickyMobileHeader = styled(Button).attrs({ font: 'h-s' })`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 99;
  height: 50px;
  width: 100%;
  padding: 10px 16px;
  color: white;
  background-color: ${(props) => props.theme.colors.buyersguideGreen};
  letter-spacing: normal;
`;

const StyledSvg = styled(Svg)`
  height: 25px;
  width: 25px;
  padding: 4px;
  background-color: white;
  fill: ${(props) => props.theme.colors.buyersguideGreen};
  border-radius: 100%;
  transform: ${(props) => (props.isAtBottom ? 'rotate(-90deg)' : 'rotate(90deg)')};
  transition: transform 0.5s ease-in-out;
`;

export default ({ isLoading, products, scrollToRef, ...props }) => {
  const { translations } = useTranslations('snowboardFinder');
  const isMedium = useMediaQuery('medium');
  const [isAtBottom, setIsAtBottom] = useState(false);
  const headerRef = useRef();
  const clientRect = useBoundingClientRect(headerRef);
  const snowboardsFound = products?.totalCount
    ? resolveTemplate(translations.snowboardsFound, { count: products.totalCount })
    : '';

  useEffect(() => {
    setIsAtBottom(window.innerHeight / 2 > clientRect?.top);
  }, [clientRect]);

  return isLoading ? (
    isMedium ? (
      <Flex justifyContent="center" {...props}>
        <Spinner size="26px" mr="4" />
        <DesktopHeader {...props}>{snowboardsFound}</DesktopHeader>
      </Flex>
    ) : (
      <StickyMobileHeader {...props}>
        <Spinner mr="4" color="white" />
        {snowboardsFound}
      </StickyMobileHeader>
    )
  ) : isMedium ? (
    <DesktopHeader {...props}>{snowboardsFound}</DesktopHeader>
  ) : (
    <StickyMobileHeader
      justifyContent="space-between"
      ref={headerRef}
      onClick={() =>
        window.scrollTo({
          top: isAtBottom ? scrollToRef.current.offsetTop : headerRef.current.offsetTop,
          behavior: 'smooth',
        })
      }
      {...props}
    >
      {snowboardsFound}
      <StyledSvg isAtBottom={isAtBottom}>
        <use xlinkHref="/svg/symbol-defs.svg#icon-breadcrumb-arrow" />
      </StyledSvg>
    </StickyMobileHeader>
  );
};
