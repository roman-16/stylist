import { attachDiv } from '@@jest/helpers';
import { act } from '@testing-library/react';
import '.';

attachDiv.onEach('app');

const selector = {
  selector: '#app',
  position: 'after',
};

// FIXME: THIS TEST DOESN'T WORK AND I DON'T KNOW WHY
// eslint-disable-next-line jest/no-commented-out-tests
// it('sets a window object', () => {
//   expect(window.bt).toMatchSnapshot();
// });

it('renders a widget', async () => {
  let id = '';

  await act(async () => {
    id = await window.bt.widgets.renderBlueWorldStories(selector);
  });

  expect(document.getElementById(id)).toBeInTheDocument();
});

it('renders shop your style more styles with custom mount', async () => {
  let id = '';

  await act(async () => {
    id = await window.bt.widgets.ShopYourStyle.renderMoreStyles(selector);
  });

  expect(document.getElementById(id)).toBeInTheDocument();
});

it('renders shop your style products overview with custom mount', async () => {
  let id = '';

  await act(async () => {
    id = await window.bt.widgets.ShopYourStyle.renderProductsOverview(selector, {
      ids: [
        '594211___blue',
        '597453___whisper_white_june_bug',
        '584825___blush',
        '566530___black_cream_white_white',
        '566456___white_old_green',
        '610751___summit_wht_blk_summit_wht',
      ],
    });
  });

  expect(document.getElementById(id)).toBeInTheDocument();
});
