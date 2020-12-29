import { baseURL } from '@helpers';

const dataLayer = window.dataLayer?.[0];
const { bto } = window;

const api = {
  // Shouldn't be used, use the correct interfaces instead
  _dataLayer: dataLayer,
  _bto: bto,

  dataLayer: {
    detail: {
      'brand-color-code':
        typeof dataLayer?.detail?.['brand-color-code'] === 'string' && dataLayer.detail['brand-color-code'],
      'product-id': typeof dataLayer?.detail?.['product-id'] === 'string' && dataLayer.detail['product-id'],
    },
    general: {
      country: typeof dataLayer?.general?.country === 'string' && dataLayer.general.country,
      currency: typeof dataLayer?.general?.currency === 'string' && dataLayer.general.currency,
      device: typeof dataLayer?.general?.device === 'string' && dataLayer.general.device,
      language: typeof dataLayer?.general?.language === 'string' && dataLayer.general.language,
      'page-type': typeof dataLayer?.general?.['page-type'] === 'string' && dataLayer.general['page-type'],
      uid: dataLayer?.general?.uid,
    },
    push: dataLayer?.push === 'function' && dataLayer.push,
    sysdp: {
      id: typeof dataLayer?.sysdp?.id === 'string' && dataLayer.sysdp.id,
    },
  },
  bto: {
    addToCartFlyout: {
      show: typeof bto?.addToCartFlyout?.show === 'function' && bto.addToCartFlyout.show,
    },
    addtocartoverlay: {
      open: typeof bto?.addtocartoverlay?.open === 'function' && bto.addtocartoverlay.open,
    },
    cart: {
      refreshCart: typeof bto?.cart?.refreshCart === 'function' && bto.cart.refreshCart,
    },
    cartoverlay: {
      update: typeof bto?.cartoverlay?.update === 'function' && bto.cartoverlay.update,
    },
    lazyload: {
      customImages: typeof bto?.lazyload?.customImages === 'function' && bto.lazyload.customImages,
    },
    tracking: {
      trackEvent:
        typeof bto?.tracking?.trackEvent === 'function' &&
        ((category, action, label) => bto.tracking.trackEvent(category, action, label)),
      richrelevance: {
        processRegularPageTracking:
          typeof bto?.tracking?.richrelevance?.processRegularPageTracking === 'function' &&
          bto.tracking.richrelevance.processRegularPageTracking,
      },
    },
  },
  ajax: {},
};

api.dataLayer.pushProductImpressions = (selector) => {
  const elements = {
    ecommerce: {
      impressions: Array.from(document.querySelectorAll(selector)).map((element) => ({
        id: element.getAttribute('data-articlenr'),
        name: element.getAttribute('data-productname'),
        list: element.getAttribute('data-category'),
        brand: element.getAttribute('data-brand'),
        category: element.getAttribute('data-categorie'),
        variant: element.getAttribute('data-brand-color'),
        position: element.getAttribute('data-position'),
      })),
    },
    event: 'eeProductImpressions',
  };

  if (elements.ecommerce.impressions.length > 0) {
    api.dataLayer.push?.(elements);
  }
};

api.ajax.addToCart = async ({ productCode, variantId }, quantity = 1) => {
  const url = new URL(baseURL.getPathname('/ajax/CartController/addToCart'));

  url.searchParams.append('productCode', variantId);
  url.searchParams.append('quantity', quantity);

  const success = await fetch(url, {
    method: 'POST',
  })
    .then((response) => response.json())
    .then((response) => response.success === 'true')
    .catch(() => false);

  // Update local cart and do some bto stuff
  if (success) {
    const { device } = api.dataLayer.general;

    // For rich relevance
    window.productID = productCode;
    window.rrPageType = 'addToCart';
    window.sku = productCode;

    if (device) {
      if (device.toLowerCase() === 'mobile') {
        api.bto.addToCartFlyout.show?.();
        api.bto.cart.refreshCart?.();
      } else {
        // For rich relevance
        window.addToCartPlacements = ['add_to_cart_page.a2cart_recs_1'];

        api.bto.addtocartoverlay.open?.(variantId);
        api.bto.cartoverlay.update?.();
      }
    }

    // When no rich relevance node exists
    if (!document.querySelector('.c-rr-placement.js-rrplacement.t-initially-hidden')) {
      // Add rich relevance HTML to the addToCartOverlay
      document.querySelector('#addToCartOverlay .is-overlay.s-pdp-new--revert')?.insertAdjacentHTML(
        'beforeend',
        `
          <div
            class="c-rr-placement js-rrplacement t-initially-hidden"
            data-rrplacementid="add_to_cart_page.a2cart_recs_1"
          >
            <div
              id="add_to_cart_page.a2cart_recs_1"
              class="o-container"
              data-category="${api.dataLayer.general['page-type']}"
            >
              <h3 class="c-rr-placement__title js-title" />
              <div class="c-rr-placement__slider js-slider-wrapper" />
            </div>
          </div>
        `,
      );
    }

    if (device.toLowerCase() === 'mobile') {
      // Remove is-no-placement class to enable rr on mobile
      document.querySelector('#addToCartOverlay .c-atc-overlay__content').classList.remove('is-no-placement');
    }

    api.bto.tracking.richrelevance.processRegularPageTracking?.();
  }

  return success;
};

export default api;
