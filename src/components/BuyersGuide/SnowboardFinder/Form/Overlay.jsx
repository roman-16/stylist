import React from 'react';
import { Box, Flex, Heading, Image, Overlay } from '@shared/components';
import { useMediaQuery } from '@shared/hooks';

export default ({ title, contentMarkup, ...props }) => {
  const isMedium = useMediaQuery('medium');

  return (
    <Overlay {...props} noBackground blockBodyScroll={!isMedium} overflowY="auto" minHeight="100%">
      <Box p={{ _: '32px 16px 16px', medium: '32px' }}>
        <Flex flexDirection="column" alignItems="center" width="100%">
          <Image src="/svg/checkout/help2.svg" height="20px" width="20px" borderRadius="100%" />
          <Heading.H3 font="h-l" color="anthrazit">
            {title}
          </Heading.H3>
        </Flex>

        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: contentMarkup }} />
      </Box>
    </Overlay>
  );
};
