import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Box } from '@shared/components';
import { useStore } from '../shared/Store';

const Background = styled(Box)`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.isOpen ? '0.5' : '0')};
  background-color: ${(props) => props.theme.colors.anthrazit};
  transition: opacity ${(props) => props.transitionTime}ms ease-in-out;
  visibility: ${(props) => (props.hidden ? 'hidden' : 'unset')};
`;

export default ({ transitionTime, ...props }) => {
  const { state, dispatch } = useStore();
  // Use hidden state to set visibility hidden after the transition completed
  const [hidden, setHidden] = useState(!state.isOpen);
  const timeout = useRef();

  useEffect(() => {
    if (state.isOpen) {
      clearTimeout(timeout.current);
      setHidden(!state.isOpen);
    } else {
      timeout.current = setTimeout(() => setHidden(!state.isOpen), transitionTime);
    }

    return () => clearTimeout(timeout.current);
  }, [state.isOpen, transitionTime]);

  return (
    <Background
      {...props}
      hidden={hidden}
      isOpen={state.isOpen}
      transitionTime={transitionTime}
      onClick={dispatch.searchTerm.remove}
    />
  );
};
