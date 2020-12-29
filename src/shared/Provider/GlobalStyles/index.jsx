import React from 'react';
import styled, { StyleSheetManager } from 'styled-components';
import miniresetCSS from 'minireset.css/minireset.css';
import { randomId } from '@helpers';
import namespace from './stylisNamespacePlugin';
import revertStyles from './revertStyles';

const Reset = styled.div`
  /* TODO: Remove when chrome supports all: revert https://caniuse.com/#feat=mdn-css_properties_all_revert */
  *:focus {
    outline: none;
  }

  /* Reset master.css styles */
  [hidden] {
    display: unset;
  }

  button[disabled],
  input[disabled] {
    cursor: unset;
  }

  input[type='radio'] {
    display: unset;
  }

  input[type='radio'] + label {
    position: unset;
    padding-left: unset;
    margin-left: unset;
  }

  input[type='radio'] + label::before {
    background: unset;
    position: unset;
    z-index: unset;
    left: unset;
    top: unset;
    content: unset;
    overflow: unset;
    width: unset;
    height: unset;
  }

  &&&&&&&&&& * {
    ${revertStyles}
    ${miniresetCSS}

    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;

    [hidden] {
      display: none;
    }
  }
`;

const namespaceId = `bt-ns-${randomId()}`;
const stylisNamespacePlugin = namespace(`#${namespaceId}`);

// Needed for styled-components
Object.defineProperty(stylisNamespacePlugin, 'name', { value: 'stylis-namespace-plugin' });

export default ({ ...props }) => (
  <Reset>
    <StyleSheetManager stylisPlugins={[stylisNamespacePlugin]}>
      <div {...props} id={namespaceId} />
    </StyleSheetManager>
  </Reset>
);
