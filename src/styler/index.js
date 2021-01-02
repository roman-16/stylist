import { createElement, useMemo } from 'react';
import createStylesheet from './createStylesheet';

const createStyled = (config) => {
  const stylesheet = createStylesheet(config);

  return (element, styles) => {
    if (element.__styler) {
      element.__styler.styles = {
        ...element.__styler.styles,
        ...styles,
      };

      return element;
    }

    const StyledComponent = (props) => {
      const className = useMemo(() => {
        const { styles: elementStyles } = StyledComponent.__styler;

        return stylesheet.addStyles(elementStyles);
      }, []);

      return createElement(element, {
        ...props,
        // eslint-disable-next-line react/destructuring-assignment
        className: `${props.className ?? ''} ${className ?? ''}`.trim(),
      });
    };

    StyledComponent.__styler = {
      styles,
    };

    return StyledComponent;
  };
};

export { createStyled };
