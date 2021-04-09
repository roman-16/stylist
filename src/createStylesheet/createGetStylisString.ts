import { Breakpoints, Styles, Theme, ThemeProperty, UtilsObject } from '@/types';

const hyphenateRegex = /[A-Z]|^ms/g;
const resolveKey = (styleName: string) => styleName.replace(hyphenateRegex, '-$&').toLowerCase();

interface Scales {
  keys: string[];
  scale: ThemeProperty;
}

const resolveScales = (key: string, value: string | number, scales: Scales[]): string => {
  const getStringValue = () => {
    if (typeof value === 'number') throw new Error(`Key '${key}' can't have value '${value}' of type number.`);

    return value;
  };

  for (let i = 0; i < scales.length; i++) {
    const { keys, scale } = scales[i];

    if (keys.includes(key)) {
      if (
        (Array.isArray(scale) && typeof value === 'number') ||
        (!Array.isArray(scale) && typeof scale === 'object' && scale !== null)
      ) {
        // FIXME: Here are weird errors with the value on array or object, I don't know how to fix this yet so this must do for now
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return scale[value] ?? getStringValue();
      }

      return getStringValue();
    }
  }

  return getStringValue();
};

const createGetStylisString = ({
  breakpoints,
  theme,
  utilsObject,
}: {
  breakpoints?: Breakpoints;
  theme?: Theme;
  utilsObject?: UtilsObject;
}) => {
  const scales: Scales[] = [];

  if (theme?.space) {
    scales.push({
      keys: [
        'margin',
        'marginTop',
        'marginRight',
        'marginBottom',
        'marginLeft',
        'padding',
        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',
        'gridGap',
        'gridColumnGap',
        'gridRowGap',
      ],
      scale: theme.space,
    });
  }

  if (theme?.fontSizes) {
    scales.push({ keys: ['fontSize'], scale: theme.fontSizes });
  }

  if (theme?.colors) {
    scales.push({ keys: ['color', 'backgroundColor', 'borderColor'], scale: theme.colors });
  }

  if (theme?.fonts) {
    scales.push({ keys: ['fontFamily'], scale: theme.fonts });
  }

  if (theme?.fontWeights) {
    scales.push({ keys: ['fontWeight'], scale: theme.fontWeights });
  }

  if (theme?.lineHeights) {
    scales.push({ keys: ['lineHeight'], scale: theme.lineHeights });
  }

  if (theme?.letterSpacings) {
    scales.push({ keys: ['letterSpacing'], scale: theme.letterSpacings });
  }

  if (theme?.sizes) {
    scales.push({ keys: ['width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight'], scale: theme.sizes });
  }

  if (theme?.borders) {
    scales.push({ keys: ['border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft'], scale: theme.borders });
  }

  if (theme?.borderWidths) {
    scales.push({ keys: ['borderWidth'], scale: theme.borderWidths });
  }

  if (theme?.borderStyles) {
    scales.push({ keys: ['borderStyle'], scale: theme.borderStyles });
  }

  if (theme?.radii) {
    scales.push({ keys: ['borderRadius'], scale: theme.radii });
  }

  if (theme?.shadows) {
    scales.push({ keys: ['boxShadow', 'textShadow'], scale: theme.shadows });
  }

  if (theme?.zIndices) {
    scales.push({ keys: ['zIndex'], scale: theme.zIndices });
  }

  if (theme?.transitions) {
    scales.push({ keys: ['transition'], scale: theme.transitions });
  }

  const resolveValue = (key: string, value: string) => resolveScales(key, value, scales);

  const getStylisString = (styles: Styles, disableUtil = false): string =>
    Object.entries(styles).reduce((previous, [key, value]) => {
      const breakpoint = breakpoints?.[key];
      const util = utilsObject?.[key];
      const resolvedKey = resolveKey(key);

      if (breakpoint) {
        const stylisString = getStylisString(value);

        return `${previous}${breakpoint(stylisString)}`;
      }

      if (!disableUtil && util) {
        const utilValue = util(value);

        if (typeof utilValue === 'object') {
          return `${previous}${getStylisString(utilValue, true)}`;
        }

        return `${previous}${resolvedKey}:${resolveValue(key, utilValue ?? value)};`;
      }

      if (typeof value === 'object') {
        const processedValue = getStylisString(value);

        return `${previous}${resolvedKey}{${processedValue}}`;
      }

      return `${previous}${resolvedKey}:${resolveValue(key, value)};`;
    }, '');

  return getStylisString;
};

export default createGetStylisString;
