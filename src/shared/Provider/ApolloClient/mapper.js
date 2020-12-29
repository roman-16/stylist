import { ApolloLink } from '@apollo/client';
import { mapValues } from 'lodash-es';

const getType = (value) => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';

  return typeof value;
};

export default (callback) =>
  new ApolloLink((operation, forward) =>
    forward(operation).map((response) => {
      const mapper = (value) => {
        const type = getType(value);

        if (['object', 'array'].includes(type)) {
          const newValue = callback(value, type);

          return type === 'array' ? newValue.map(mapper) : mapValues(newValue, mapper);
        }

        return callback(value, type);
      };

      return {
        ...response,
        data: response.data ? mapValues(response.data, mapper) : response.data,
      };
    }),
  );
