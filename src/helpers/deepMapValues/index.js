import { mapValues, isPlainObject } from 'lodash-es';

const deepMapValues = (object, callback, { scope = '' } = {}) =>
  mapValues(object, (value, key) => {
    if (isPlainObject(value)) {
      return deepMapValues(value, callback, {
        scope: scope ? `${scope}.${key}` : key,
      });
    }

    return callback(value, key, { scope });
  });

export default deepMapValues;
