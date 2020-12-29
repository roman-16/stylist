import {
  compose,
  space,
  color,
  typography,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
  shadow,
  system,
  variant,
} from 'styled-system';

const customProps = system({
  animationDelay: true,
  fill: {
    property: 'fill',
    scale: 'colors',
  },
  pointerEvents: true,
  textTransform: true,
  transform: true,
  transformOrigin: true,
  whiteSpace: true,
});

const font = variant({
  prop: 'font',
  scale: 'fonts',
});

const scrollbar = variant({
  prop: 'scrollbar',
  variants: {
    hidden: {
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
});

const styledSystem = compose(
  space,
  color,
  typography,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
  shadow,
  customProps,
  font,
  scrollbar,
);

export default (props) => {
  const styles = styledSystem(props);

  if (props.textOverflow) {
    styles.textOverflow = 'ellipsis';
    styles.whiteSpace = 'nowrap';
    styles.overflow = 'hidden';
  }

  return styles;
};
