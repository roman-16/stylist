import React from 'react';
import styled from 'styled-components';
import { baseURL } from '@helpers';
import { Button, Image } from '@shared/components';
import { useStore } from '../shared/Store';
import addAnalyticsProps from '../shared/addAnalyticsProps';
import Background from './Background';

const transitionTime = 500;
const zIndex = 10000000;
const closeAnalyticsProps = (type) =>
  addAnalyticsProps({
    action: 'click-search-close',
    label: type,
  });

const Menu = styled.nav`
  position: fixed;
  z-index: ${zIndex + 1};
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  max-width: 400px;
  background: ${(props) => props.theme.colors.white};
  transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform ${transitionTime / 1000}s ease-in-out;
  overflow: auto;
`;

const Close = styled(Button)`
  position: fixed;
  top: 30px;
  right: 30px;
  height: 20px;
  width: 20px;
`;

const CloseIcon = styled(Image)`
  width: 100%;
`;

export default ({ children, ...props }) => {
  const { state, dispatch } = useStore();

  return (
    <>
      <Menu {...props} isOpen={state.isOpen}>
        <Close onClick={dispatch.searchTerm.remove} {...closeAnalyticsProps('icon')}>
          <CloseIcon src={baseURL.getPathname('/svg/icon-x-thin.svg')} alt="Close" />
        </Close>
        <div>{children}</div>
      </Menu>
      <Background transitionTime={transitionTime} zIndex={zIndex} {...closeAnalyticsProps('background')} />
    </>
  );
};
