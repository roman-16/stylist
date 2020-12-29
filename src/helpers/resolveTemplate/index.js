import { reduce } from 'lodash-es';

export default (template, variables) => {
  const variablesString = reduce(variables, (acc, value, key) => `${acc}const ${key} = '${value}';\n`, '');

  // eslint-disable-next-line no-eval
  return eval(`${variablesString}\n\`${template}\`;`);
};
