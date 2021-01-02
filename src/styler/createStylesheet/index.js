import createGetStylisString from './createGetStylisString';
import createParseStylisString from './createParseStylisString';

let randomIndex = 0;
let styleElement;

const checkStyleElement = () => {
  if (styleElement) return;

  styleElement = document.createElement('style');
  styleElement.id = 'styler-styles';

  document.head.appendChild(styleElement);
};

export default ({ breakpoints, theme, stylis } = {}) => {
  const getStylisString = createGetStylisString({ breakpoints, theme });
  const parseStylisString = createParseStylisString(stylis);

  return {
    addStyles: (styles) => {
      const className = `s-${Math.round(Math.random() * 10000)}-${randomIndex++}`;

      if (Object.keys(styles).length === 0) return className;

      const stylisString = `.${className}{${getStylisString(styles)}}`;
      const stylesStrings = parseStylisString(stylisString).split('\n').slice(1);

      checkStyleElement();

      stylesStrings.forEach((stylesString) => {
        styleElement.sheet.insertRule(stylesString, styleElement.sheet.cssRules.length);
      });

      return className;
    },
  };
};
