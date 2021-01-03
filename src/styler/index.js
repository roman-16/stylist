import { createElement, forwardRef, useEffect, useRef, useState } from 'react';
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
    const StyledComponent = forwardRef((props, ref) => {
      const stylist = StyledComponent.__stylist;
      const { css, ...mergedProps } = {
        ...stylist.props.reduce(
          (previous, _props) => ({
            ...previous,
            ..._props,
          }),
          {},
        ),
        ...props,
      };
      const firstMount = useFirstMount();
      const [className, setClassName] = useState(() => {
        const newStyles = stylist.styles.reduce(
          (previous, _styles) =>
            deepMerge(previous, typeof _styles === 'function' ? _styles({ props: mergedProps }) : _styles, css),
          {},
        );

        return stylesheet.addStyles(newStyles);
      });

      useEffect(() => {
        if (firstMount) return;

        console.log(css, mergedProps);

        throw new Error('css or props updated');
        // TODO: Add update mechanism
        // }, [JSON.stringify(css), mergedProps]);
      }, []);

      return createElement(stylist.rootElement, {
        ...mergedProps,
        ref,
        // eslint-disable-next-line react/destructuring-assignment
        className: `${mergedProps.className ?? ''} ${className ?? ''}`.trim(),
      });
    });

    StyledComponent.__stylist = {
      rootElement: element.__stylist ? element.__stylist.rootElement : element,
      props: element.__stylist ? element.__stylist.props : [],
      styles: element.__stylist ? [...element.__stylist.styles, styles] : [styles],
    };

    StyledComponent.attrs = (props) => {
      StyledComponent.__stylist.props = [...StyledComponent.__stylist.props, props];

      return StyledComponent;
    };

    return StyledComponent;
  };
};

export { createStyled };
