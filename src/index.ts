import { createElement, forwardRef, useEffect, useMemo } from 'react';
import { Config, Styles, StylistComponent, StylisProps, StylesMaybeFunction } from './types';
import { createClassName, deepMerge, useFirstMount } from './utils';
import createStylesheet from './createStylesheet';

const createStyled = (config: Config = {}) => {
  const stylesheet = createStylesheet(config);

  return (element: keyof React.ReactHTML | StylistComponent, styles: StylesMaybeFunction): StylistComponent => {
    const staticClassName = createClassName('sts');
    const StyledComponent: StylistComponent = Object.assign(
      forwardRef<Element, StylisProps>((props, ref) => {
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

        useMemo(() => {
          if (stylesheet.hasStyles(stylist.staticClassName)) return;

          const newStyles = stylist.styles.reduce(
            (previous: Styles, _styles) =>
              deepMerge(previous, typeof _styles === 'function' ? _styles({ props: mergedProps }) : _styles),
            {},
          );

          console.log(newStyles);

          stylesheet.addStyles(newStyles, stylist.staticClassName);
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
          className: `${mergedProps.className ?? ''} ${stylist.staticClassName} ${className || ''}`.trim(),
        });
      }),
      {
        displayName: staticClassName,
        __stylist: {
          staticClassName,
          rootElement: typeof element === 'string' ? element : element.__stylist.rootElement,
          styles: typeof element === 'string' ? [styles] : [...element.__stylist.styles, styles],
          props: typeof element === 'string' ? [] : element.__stylist.props,
        },
        attrs: (props: StylisProps) => {
          StyledComponent.__stylist.props = [...StyledComponent.__stylist.props, props];

          return StyledComponent;
        },
        toString: () => `.${StyledComponent.__stylist.staticClassName}`,
      },
    );

    return StyledComponent;
  };
};

export { createStyled, Config };
