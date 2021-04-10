import * as CSS from 'csstype';
import { Middleware } from 'stylis';

export type Breakpoints = Record<string, (rules: string) => string>;

export type ThemeProperty = string[] | Record<string, string>;
export interface Theme {
  space?: ThemeProperty;
  fontSizes?: ThemeProperty;
  colors?: ThemeProperty;
  fonts?: ThemeProperty;
  fontWeights?: ThemeProperty;
  lineHeights?: ThemeProperty;
  letterSpacings?: ThemeProperty;
  sizes?: ThemeProperty;
  borders?: ThemeProperty;
  borderWidths?: ThemeProperty;
  borderStyles?: ThemeProperty;
  radii?: ThemeProperty;
  shadows?: ThemeProperty;
  zIndices?: ThemeProperty;
  transitions?: ThemeProperty;
}

export type UtilsObject = Record<string, (value: string) => CSS.Properties | string>;
type VariantsHelper = (variants: Record<string, CSS.Properties>) => (value: string) => CSS.Properties;
export type Utils = ((helpers: { theme?: Theme; variants: VariantsHelper }) => UtilsObject) | UtilsObject;

export interface StylisConfig {
  middlewares?: Middleware[];
}

export interface Config {
  breakpoints?: Breakpoints;
  theme?: Theme;
  utils?: Utils;
  stylis?: StylisConfig;
}

interface CSSProperties<TLength = (string & {}) | number> extends CSS.Properties<TLength> {
  m?: CSS.Properties<TLength>['margin'];
  mt?: CSS.Properties<TLength>['marginTop'];
  mr?: CSS.Properties<TLength>['marginRight'];
  mb?: CSS.Properties<TLength>['marginBottom'];
  ml?: CSS.Properties<TLength>['marginLeft'];
  mx?: CSS.Properties<TLength>['margin'];
  my?: CSS.Properties<TLength>['margin'];

  p?: CSS.Properties<TLength>['padding'];
  pt?: CSS.Properties<TLength>['paddingTop'];
  pr?: CSS.Properties<TLength>['paddingRight'];
  pb?: CSS.Properties<TLength>['paddingBottom'];
  pl?: CSS.Properties<TLength>['paddingLeft'];
  px?: CSS.Properties<TLength>['padding'];
  py?: CSS.Properties<TLength>['padding'];

  bg?: CSS.Properties<TLength>['backgroundColor'];
}
type RecursiveStyles<T> = Record<string, CSSProperties | T> | CSSProperties;
// A few recurssions to cover 99.99% of the nesting cases
export type Styles = RecursiveStyles<
  RecursiveStyles<
    RecursiveStyles<
      RecursiveStyles<
        RecursiveStyles<
          RecursiveStyles<
            RecursiveStyles<
              RecursiveStyles<
                RecursiveStyles<RecursiveStyles<RecursiveStyles<RecursiveStyles<RecursiveStyles<CSSProperties>>>>>
              >
            >
          >
        >
      >
    >
  >
>;

export interface StylisProps extends React.AllHTMLAttributes<Element> {
  css?: Styles;
}

export type StylesMaybeFunction = (<T>(props: T) => Styles) | Styles;

export interface StylistComponent extends React.ForwardRefExoticComponent<StylisProps & React.RefAttributes<Element>> {
  __stylist: {
    staticClassName: string;
    rootElement: keyof React.ReactHTML;
    styles: StylesMaybeFunction[];
    props: StylisProps[];
  };
  attrs: (props: StylisProps) => StylistComponent;
}
