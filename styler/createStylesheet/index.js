import { createClassName } from '../utils';
import createGetStylisString from './createGetStylisString';
import createParseStylisString from './createParseStylisString';
import resolveUtils from './resolveUtils';

export default ({ breakpoints, theme, stylis, utils } = {}) => {
  let styleElement;
  const stylesMap = new Map();
  const resolvedUtils = resolveUtils(utils, theme);
  const getStylisString = createGetStylisString({ breakpoints, theme, utils: resolvedUtils });
  const parseStylisString = createParseStylisString(stylis);

  const checkStyleElement = () => {
    if (styleElement) return;

    styleElement = document.createElement('style');
    styleElement.id = 'styler-styles';

    document.head.appendChild(styleElement);
  };

  return {
    addStyles: (styles, className = createClassName()) => {
      if (Object.keys(styles).length === 0) return className;

      const stylisString = `.${className}{${getStylisString(styles)}}`;
      const stylesStrings = parseStylisString(stylisString).split('\n').slice(1);

      checkStyleElement();

      stylesStrings.forEach((stylesString) => {
        const index = styleElement.sheet.insertRule(stylesString, styleElement.sheet.cssRules.length);

        const value = stylesMap.get(className);

        stylesMap.set(className, value ? [...value, index] : [index]);
      });

      return className;
    },

    hasStyles: (className) => stylesMap.has(className),
  };
};
