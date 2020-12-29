// TODO: Use polyfills when we got a server
// import 'core-js';
// import 'regenerator-runtime/runtime';
// import 'js-polyfills/web'; // IE11
// import 'proxy-polyfill'; // IE11
import React from 'react';
import ReactDOM from 'react-dom';
import context from '@context';
import { betterTry, randomId } from '@helpers';
import prepareRootElement from '../shared/prepareRootElement';

const widgets = {
  BlueWorldSearch: () =>
    import(
      /* webpackChunkName: "BlueWorldSearch" */
      '../shared/Widgets/BlueWorldSearch/index.jsx'
    ),
  BlueWorldStories: () =>
    import(
      /* webpackChunkName: "BlueWorldStories" */
      '../shared/Widgets/BlueWorldStories/index.jsx'
    ),
  'BuyersGuide.Calculator': () =>
    import(
      /* webpackChunkName: "BuyersGuide.Calculator" */
      '../shared/Widgets/BuyersGuide/Calculator/index.jsx'
    ),
  'BuyersGuide.ProductRecommendation': () =>
    import(
      /* webpackChunkName: "BuyersGuide.ProductRecommendation" */
      '../shared/Widgets/BuyersGuide/ProductRecommendation/index.jsx'
    ),
  'BuyersGuide.ProductSwiper': () =>
    import(
      /* webpackChunkName: "BuyersGuide.ProductSwiper" */
      '../shared/Widgets/BuyersGuide/ProductSwiper/index.jsx'
    ),
  'BuyersGuide.SnowboardFinder': () =>
    import(
      /* webpackChunkName: "BuyersGuide.SnowboardFinder" */
      '../shared/Widgets/BuyersGuide/SnowboardFinder/index.jsx'
    ),
  CheckoutFeedbackForm: () =>
    import(
      /* webpackChunkName: "CheckoutFeedbackForm" */
      '../shared/Widgets/CheckoutFeedbackForm/index.jsx'
    ),
  PDPFeedbackForm: () =>
    import(
      /* webpackChunkName: "PDPFeedbackForm" */
      '../shared/Widgets/PDPFeedbackForm/index.jsx'
    ),
  'ShopYourStyle.Explorer.Standalone': () =>
    import(
      /* webpackChunkName: "ShopYourStyle.Explorer.Standalone" */
      '../shared/Widgets/ShopYourStyle/Explorer/Standalone/index.jsx'
    ),
  'ShopYourStyle.Explorer.WithData': () =>
    import(
      /* webpackChunkName: "ShopYourStyle.Explorer.WithData" */
      '../shared/Widgets/ShopYourStyle/Explorer/WithData/index.jsx'
    ),
  'ShopYourStyle.MoreStyles': () =>
    import(
      /* webpackChunkName: "ShopYourStyle.MoreStyles" */
      '../shared/Widgets/ShopYourStyle/MoreStyles/index.jsx'
    ),
  'ShopYourStyle.ProductsOverview': () =>
    import(
      /* webpackChunkName: "ShopYourStyle.ProductsOverview" */
      '../shared/Widgets/ShopYourStyle/ProductsOverview/index.jsx'
    ),
  'ShopYourStyle.StyleLike': () =>
    import(
      /* webpackChunkName: "ShopYourStyle.StyleLike" */
      '../shared/Widgets/ShopYourStyle/StyleLike/index.jsx'
    ),
  SnowboardSwap: () =>
    import(
      /* webpackChunkName: "SnowboardSwap" */
      '../shared/Widgets/SnowboardSwap/index.jsx'
    ),
};

export default async (
  widget,
  selector = { selector: '', position: 'after' },
  config = { component: {}, rootComponent: {} },
) => {
  const { default: Widget } = await widgets[widget]();
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

  if (error?.message === 'REFERENCE_NODE_NOT_FOUND') {
    context.api.bto.tracking.trackEvent && context.api.bto.tracking.trackEvent('widget', 'loading-error', widget);

    return false;
  }

  ReactDOM.render(<RenderWidget />, rootElement);

  rootElement.id = `bt-${widget.toLowerCase()}-${randomId()}`;

  return rootElement.id;
};
