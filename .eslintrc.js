const graphqlOptions = { env: 'literal', schemaJson: require('./schema.json') };

module.exports = {
  root: true,
  parser: 'babel-eslint', // TODO: Remove when optional chaining works in eslint
  env: {
    browser: true,
    es6: true,
  },
  extends: '@blue-tomato/react',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'graphql'],
  rules: {
    'graphql/template-strings': ['error', graphqlOptions],
    'graphql/named-operations': ['error', graphqlOptions],
    'graphql/capitalized-type-name': ['error', graphqlOptions],
    'graphql/no-deprecated-fields': ['error', graphqlOptions],
  },
  overrides: [
    {
      files: ['*.test.js', '.jest/**/*.js'],
      env: {
        'jest/globals': true,
      },
      extends: ['@blue-tomato/react', 'plugin:jest/recommended', 'plugin:jest/style'],
      plugins: ['react', 'jest'],
    },
  ],
};
