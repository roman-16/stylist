const dataLayer = window.dataLayer[0];
const isMobile = dataLayer.general?.device === 'mobile';
const createRender = (widget) => (selector, config) =>
  // document.documentMode because we don't support IE yet
  !document.documentMode &&
  import(
    /* webpackChunkName: "mount" */
    './mount.jsx'
  ).then(({ default: mount }) => mount(widget, selector, config));
const assertCallback = (assertion, callback) =>
  // document.documentMode because we don't support IE yet
  !document.documentMode && assertion() && callback();

window.bt = {
  widgets: {
    renderBlueWorldSearch: createRender('BlueWorldSearch'),
    renderBlueWorldStories: createRender('BlueWorldStories'),
    BuyersGuide: {
      renderCalculator: createRender('BuyersGuide.Calculator'),
      renderProductRecommendation: createRender('BuyersGuide.ProductRecommendation'),
      renderProductSwiper: createRender('BuyersGuide.ProductSwiper'),
      renderSnowboardFinder: createRender('BuyersGuide.SnowboardFinder'),
    },
    renderCheckoutFeedbackForm: createRender('CheckoutFeedbackForm'),
    renderPDPFeedbackForm: createRender('PDPFeedbackForm'),
    renderSnowboardSwap: createRender('SnowboardSwap'),
    ShopYourStyle: {
      Explorer: {
        renderStandalone: createRender('ShopYourStyle.Explorer.Standalone'),
        renderWithData: createRender('ShopYourStyle.Explorer.WithData'),
      },
      renderMoreStyles: createRender('ShopYourStyle.MoreStyles'),
      renderProductsOverview: createRender('ShopYourStyle.ProductsOverview'),
      renderStyleLike: createRender('ShopYourStyle.StyleLike'),
    },
  },
};

assertCallback(
  () => ['/blue-world/', '/team/'].some((element) => window.location?.pathname?.includes?.(element)),
  () => window.bt.widgets.renderBlueWorldSearch({ selector: '#c-bw-search-button', position: 'after' }),
);
assertCallback(
  () => ['/home/', '/page/men/', '/page/women/', '/page/kids/'].includes?.(dataLayer.general?.['page-rewrite']),
  () => {
    const selector = isMobile
      ? { selector: '#bto-homepage .linkBox.container:last-of-type', position: 'before' }
      : { selector: '#main .text-component.container', position: 'before' };
    const props = {
      rootComponent: { style: 'margin-bottom: 5vw;' },
    };

    window.bt.widgets.ShopYourStyle.Explorer.renderStandalone(selector, {
      ...props,
      component: { layout: 'default' },
    });
    window.bt.widgets.renderBlueWorldStories(selector, props);
  },
);
assertCallback(
  () => dataLayer.general?.['page-type'] === 'DETAILPAGE',
  () =>
    window.bt.widgets.ShopYourStyle.Explorer.renderStandalone(
      isMobile
        ? { selector: '#bto-productdetail .accordion.accordion--pdp', position: 'before' }
        : { selector: '#main #customerFeedback', position: 'before' },
      {
        component: {
          layout: 'compact',
          productId: `${dataLayer.detail?.['product-id']}___${dataLayer.detail?.['brand-color-code']}`,
        },
      },
    ),
);
assertCallback(
  () =>
    window.location?.pathname?.includes?.('/thankyou/') &&
    ['de', 'en', 'nl', 'it', 'fr'].includes?.(dataLayer.general?.language),
  () => {
    window.bt.widgets.renderCheckoutFeedbackForm(
      isMobile
        ? { selector: '.c-cart-shipping', position: 'after' }
        : { selector: '.c-summary-page__cart', position: 'after' },
    );

    const element = document.querySelector('div.c-card__section:last-child');

    element && element instanceof HTMLElement && (element.style['border-top'] = 'unset');
  },
);
try {
  const url = new URL(document.referrer);

  assertCallback(
    // Regex: https://regex101.com/r/eVMxR0/1/
    () => url.host.match(/google..*/i) && dataLayer.general?.['page-type'] === 'DETAILPAGE',
    () => window.bt.widgets.renderPDPFeedbackForm({ selector: 'body', position: 'in' }),
  );
} catch (error) {
  // Do nothing
}
