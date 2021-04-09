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

export interface Styles extends CSS.Properties {
  m?: CSS.Properties['margin'];
  mt?: CSS.Properties['marginTop'];
  mr?: CSS.Properties['marginRight'];
  mb?: CSS.Properties['marginBottom'];
  ml?: CSS.Properties['marginLeft'];
  mx?: CSS.Properties['margin'];
  my?: CSS.Properties['margin'];

  p?: CSS.Properties['padding'];
  pt?: CSS.Properties['paddingTop'];
  pr?: CSS.Properties['paddingRight'];
  pb?: CSS.Properties['paddingBottom'];
  pl?: CSS.Properties['paddingLeft'];
  px?: CSS.Properties['padding'];
  py?: CSS.Properties['padding'];

  bg?: CSS.Properties['backgroundColor'];
}

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
}
