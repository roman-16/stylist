const hyphenateRegex = /[A-Z]|^ms/g;
const processKey = (styleName) => styleName.replace(hyphenateRegex, '-$&').toLowerCase();

export default ({ breakpoints, theme } = {}) => {
  const getStylisString = (styles) =>
    Object.entries(styles).reduce((previous, [key, value]) => {
      const breakpoint = breakpoints[key];

      if (breakpoint) {
        const processedValue = getStylisString(value);

        return `${previous}${breakpoint(processedValue)}`;
      }

      const processedKey = processKey(key);

      if (typeof value === 'object') {
        const processedValue = getStylisString(value);

        return `${previous}${processedKey}{${processedValue}}`;
      }

      return `${previous}${processedKey}:${value};`;
    }, '');

  return getStylisString;
};
