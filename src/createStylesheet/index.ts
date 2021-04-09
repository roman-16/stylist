import { Config, Styles } from '../types';
import { createClassName, uniqueId } from '../utils';
import createGetStylisString from './createGetStylisString';
import createParseStylisString from './createParseStylisString';
import resolveUtils from './resolveUtils';

const createStylesheet = ({ breakpoints, theme, stylis, utils }: Config) => {
  const styleElement = document.createElement('style');
  const stylesMap = new Map<string, number[]>();
  const utilsObject = resolveUtils(utils, theme);
  const getStylisString = createGetStylisString({ breakpoints, theme, utilsObject });
  const parseStylisString = createParseStylisString(stylis);

  styleElement.id = `stylist-styles-${uniqueId()}`;

  document.head.appendChild(styleElement);

  return {
    addStyles: (styles: Styles, className = createClassName()) => {
      if (Object.keys(styles).length === 0) return className;

      const stylisString = `.${className}{${getStylisString(styles)}}`;
      const stylesStrings = parseStylisString(stylisString);

      stylesStrings.forEach((stylesString) => {
        if (!styleElement.sheet) throw new Error('CSSStyleSheet is not defined.');

        const index = styleElement.sheet.insertRule(stylesString, styleElement.sheet.cssRules.length);
        const value = stylesMap.get(className);

        stylesMap.set(className, [...(value ?? []), index]);
      });

      return className;
    },

    hasStyles: (className: string) => stylesMap.has(className),
  };
};

export default createStylesheet;
