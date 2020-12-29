import React from 'react';
import ReactDOM from 'react-dom';
import { set } from 'lodash-es';
import { betterTry, deepMapValues, randomId } from '@helpers';
import prepareRootElement from '../shared/prepareRootElement';
import Widgets from '../shared/Widgets';

const render = (Widget) => async (
  selector = { selector: '', position: 'after' },
  config = { component: {}, rootComponent: {} },
) => {
  let RenderWidget;
  let rootElement;
  let error;

  if (Widget.customMount) {
    [[RenderWidget, rootElement], error] = await betterTry(async () => Widget.customMount(selector, config));
  } else {
    RenderWidget = () => <Widget {...config.component} />;

    // This can fail when no reference node is found
    [rootElement, error] = betterTry(() => prepareRootElement(selector, config.rootComponent));
  }

  if (error?.message === 'REFERENCE_NODE_NOT_FOUND') return false;

  ReactDOM.render(<RenderWidget />, rootElement);

  rootElement.id = `bt-${randomId()}`;

  return rootElement.id;
};

window.bt = {
  widgets: {},
};

deepMapValues(Widgets, (Widget, key, { scope }) =>
  set(window.bt.widgets, scope ? `${scope}.render${key}` : `render${key}`, render(Widget)),
);
