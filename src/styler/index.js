import { createElement, forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { createClassName, deepMerge } from './utils';
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
      const firstMount = useFirstMount();
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

      const staticClassName = useMemo(() => {
        if (stylesheet.hasStyles(stylist.staticClassName)) return stylist.staticClassName;

        const newStyles = stylist.styles.reduce(
          (previous, _styles) =>
            deepMerge(previous, typeof _styles === 'function' ? _styles({ props: mergedProps }) : _styles),
          {},
        );

        stylesheet.addStyles(newStyles, stylist.staticClassName);

        return stylist.staticClassName;
      }, []);

      const className = useMemo(() => css && stylesheet.addStyles(css), []);

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
        className: `${mergedProps.className ?? ''} ${staticClassName} ${className || ''}`.trim(),
      });
    });

    StyledComponent.__stylist = {
      staticClassName: createClassName('sts'),
      rootElement: element.__stylist?.rootElement ?? element,
      styles: element.__stylist ? [...element.__stylist.styles, styles] : [styles],
      props: element.__stylist?.props ?? [],
    };

    StyledComponent.attrs = (props) => {
      StyledComponent.__stylist.props = [...StyledComponent.__stylist.props, props];

      return StyledComponent;
    };

    StyledComponent.toString = () => `.${StyledComponent.__stylist.staticClassName}`;

    return StyledComponent;
  };
};

export { createStyled };
