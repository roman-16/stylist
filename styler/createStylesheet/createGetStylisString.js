const hyphenateRegex = /[A-Z]|^ms/g;
const resolveKey = (styleName) => styleName.replace(hyphenateRegex, '-$&').toLowerCase();

const resolveScales = (key, value, scales) => {
  for (let i = 0; i < scales.length; i++) {
    const { keys, scale } = scales[i];

    if (keys.includes(key)) {
      if (
        (Array.isArray(scale) && typeof value === 'number') ||
        (typeof scale === 'object' && scale !== null && !Array.isArray(scale))
      ) {
        return scale[value] ?? value;
      }

      return value;
    }
  }

  return value;
};

export default ({ breakpoints = {}, theme = {}, utils = {} } = {}) => {
  const resolveValue = (key, value) =>
    resolveScales(key, value, [
      {
        keys: [
          'margin',
          'marginTop',
          'marginRight',
          'marginBottom',
          'marginLeft',
          'padding',
          'paddingTop',
          'paddingRight',
          'paddingBottom',
          'paddingLeft',
          'gridGap',
          'gridColumnGap',
          'gridRowGap',
        ],
        scale: theme.space,
      },
      { keys: ['fontSize'], scale: theme.fontSizes },
      { keys: ['color', 'backgroundColor', 'borderColor'], scale: theme.colors },
      { keys: ['fontFamily'], scale: theme.fonts },
      { keys: ['fontWeight'], scale: theme.fontWeights },
      { keys: ['lineHeight'], scale: theme.lineHeights },
      { keys: ['letterSpacing'], scale: theme.letterSpacings },
      { keys: ['width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight'], scale: theme.sizes },
      { keys: ['border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft'], scale: theme.borders },
      { keys: ['borderWidth'], scale: theme.borderWidths },
      { keys: ['borderStyle'], scale: theme.borderStyles },
      { keys: ['borderRadius'], scale: theme.radii },
      { keys: ['boxShadow', 'textShadow'], scale: theme.shadows },
      { keys: ['zIndex'], scale: theme.zIndices },
      { keys: ['transition'], scale: theme.transitions },
    ]);

  const getStylisString = (styles, disableUtil = false) =>
    Object.entries(styles).reduce((previous, [key, value]) => {
      const breakpoint = breakpoints[key];
      const util = utils[key];
      const resolvedKey = resolveKey(key);

      if (breakpoint) {
        const stylisString = getStylisString(value);

        return `${previous}${breakpoint(stylisString)}`;
      }

      if (!disableUtil && util) {
        const utilValue = util(value);

        if (typeof utilValue === 'object') {
          return `${previous}${getStylisString(utilValue, true)}`;
        }

        return `${previous}${resolvedKey}:${resolveValue(key, utilValue ?? value)};`;
      }

      if (typeof value === 'object') {
        const processedValue = getStylisString(value);

        return `${previous}${resolvedKey}{${processedValue}}`;
      }

      return `${previous}${resolvedKey}:${resolveValue(key, value)};`;
    }, '');

  return getStylisString;
};
