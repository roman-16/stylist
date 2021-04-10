import { render } from '@testing-library/react';
import { createStyled } from '@';

const styled = createStyled();
const Input = styled('input', {
  display: 'flex',
  fontSize: '16px',
  '&:hover': {
    fontSize: '8px',
  },
});

it('creates a Input component', () => {
  const { container } = render(<Input />);
  const input = container.children[0] as HTMLInputElement;

  expect(container).toMatchSnapshot();
  expect(input).toHaveStyle({
    display: 'flex',
    fontSize: '16px',
  });
  expect(Array.from(document.styleSheets[0].cssRules).map(({ cssText }) => cssText)).toMatchSnapshot();
});

it('creates a component with custom csss', () => {
  const { container: inputContainer } = render(<Input />);
  const { container } = render(<Input css={{ margin: '16px' }} />);

  expect(inputContainer.children[0]).toHaveStyle({
    display: 'flex',
    fontSize: '16px',
    margin: undefined,
  });
  expect(container.children[0]).toHaveStyle({
    display: 'flex',
    fontSize: '16px',
    margin: '16px',
  });
});

it('lets you add attributes', () => {
  const InputWithId = Input.attrs({
    id: 'test-id',
  });
  const { container } = render(<InputWithId />);

  expect(container).toMatchSnapshot();
});

it('lets you use an empty styles object', () => {
  const Box = styled('div', {});
  const { container } = render(<Box />);

  expect(container).toMatchSnapshot();
});

it('creates an extended component', () => {
  const InputMargin = styled(Input, {
    fontSize: undefined,
    margin: '16px',
  });

  const { container: inputContainer } = render(<Input />);
  const { container } = render(<InputMargin />);

  expect(inputContainer.children[0]).toHaveStyle({
    display: 'flex',
    fontSize: '16px',
    margin: undefined,
  });
  expect(container.children[0]).toHaveStyle({
    display: 'flex',
    fontSize: undefined,
    margin: '16px',
  });
});
