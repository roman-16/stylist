import { createElement, useEffect, useRef, useState } from 'react';
import { deepMerge } from './utils';
import createStylesheet from './createStylesheet';

const useFirstMount = () => {
  const firstMount = useRef(true);

  useEffect(() => {
    firstMount.current = false;
  }, []);

  return firstMount.current;
};

const createStyled = (config) => {
  const stylesheet = createStylesheet(config);

  return (element, styles) => {
    const StyledComponent = ({ css, ...props }) => {
      const firstMount = useFirstMount();
      const [className, setClassName] = useState(() => {
        const { styles: elementStyles } = StyledComponent.__styler;

        return stylesheet.addStyles(deepMerge(elementStyles, css));
      });

      useEffect(() => {
        if (firstMount) return;

        throw new Error('css updated');
      }, [firstMount, css]);

      return createElement(element, {
        ...props,
        // eslint-disable-next-line react/destructuring-assignment
        className: `${props.className ?? ''} ${className ?? ''}`.trim(),
      });
    };

    StyledComponent.__styler = {
      styles: element.__styler ? deepMerge(element.__styler.styles, styles) : styles,
    };

    return StyledComponent;
  };
};

export { createStyled };
