import { Theme, Utils, UtilsObject } from '@/types';

const ownUtils: UtilsObject = {
  m: (value) => ({ margin: value }),
  mt: (value) => ({ marginTop: value }),
  mr: (value) => ({ marginRight: value }),
  mb: (value) => ({ marginBottom: value }),
  ml: (value) => ({ marginLeft: value }),
  mx: (value) => ({ marginRight: value, marginLeft: value }),
  my: (value) => ({ marginTop: value, marginBottom: value }),

  p: (value) => ({ padding: value }),
  pt: (value) => ({ paddingTop: value }),
  pr: (value) => ({ paddingRight: value }),
  pb: (value) => ({ paddingBottom: value }),
  pl: (value) => ({ paddingLeft: value }),
  px: (value) => ({ paddingRight: value, paddingLeft: value }),
  py: (value) => ({ paddingTop: value, paddingBottom: value }),

  bg: (value) => ({ backgroundColor: value }),
};

const resolveUtils = (utils?: Utils, theme?: Theme): UtilsObject | undefined => {
  if (!utils) return undefined;

  if (typeof utils === 'function') {
    return {
      ...ownUtils,
      ...utils({
        theme,
        variants: (variants) => (value) => variants[value],
      }),
    };
  }

  return {
    ...ownUtils,
    ...utils,
  };
};

export default resolveUtils;
