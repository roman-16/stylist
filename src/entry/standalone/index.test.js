import { attachDiv } from '@@jest/helpers';
// import { act } from '@testing-library/react';
import '.';

attachDiv.onEach('app');

it('sets a window object', () => {
  expect(window.bt).toMatchSnapshot();
});

// FIXME: THIS TEST DOESN'T WORK AND I DON'T KNOW WHY
// eslint-disable-next-line jest/no-commented-out-tests
// it('renders a widget', async () => {
//   let id = '';

//   await act(async () => {
//     id = await window.bt.widgets.renderBlueWorldStories({
//       selector: '#app',
//       position: 'after',
//     });
//   });

//   expect(document.getElementById(id)).toBeInTheDocument();
// });
