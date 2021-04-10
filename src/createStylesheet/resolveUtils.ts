import { Theme, Utils, UtilsObject } from '@/types';

const resolveUtils = (utils?: Utils, theme?: Theme): UtilsObject | undefined =>
  typeof utils === 'function'
    ? utils({
        theme,
        variants: (variants) => (value) => variants[value],
      })
    : utils;

export default resolveUtils;
