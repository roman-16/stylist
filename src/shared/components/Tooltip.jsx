import React from 'react';
import styled from 'styled-components';
import Tippy from '@tippyjs/react/headless';
import { baseURL } from '@helpers';
import Box from './Box';
import Button from './Button';
import Image from './Image';
import Text from './Text';

const Icon = styled(Image)`
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
`;

const Tooltip = styled(Box).attrs({ backgroundColor: 'lightYellow' })`
  padding: 8px;
`;

const Arrow = styled(Box)`
  width: 8px;
  height: 8px;

  &::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    background: ${(props) => props.theme.colors.lightYellow};
  }

  ${Tooltip}[data-placement^='top'] > & {
    bottom: -4px;
  }

  ${Tooltip}[data-placement^='bottom'] > & {
    top: -4px;
  }

  ${Tooltip}[data-placement^='left'] > & {
    right: -4px;
  }

  ${Tooltip}[data-placement^='right'] > & {
    left: -4px;
  }
`;

export default ({ text, tooltipProps, ...props }) => (
  <Tippy
    appendTo="parent"
    render={({ ...tippyProps }) => (
      <Tooltip {...tippyProps} {...tooltipProps}>
        <Text font="xs">{text}</Text>

        <Arrow data-popper-arrow />
      </Tooltip>
    )}
    popperOptions={{
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    }}
    {...props}
  >
    <Button onClick={(event) => event.preventDefault()}>
      <Icon display="block" src={baseURL.getPathname('/svg/checkout/help2.svg')} alt={text} />
    </Button>
  </Tippy>
);
