module.exports = {
  setupFiles: ['./.jest/setup.js'],
  setupFilesAfterEnv: ['./.jest/setupAfterEnv/index.js'],
  transform: {
    '\\.css$': './.jest/rawTransformer.js',
    '\\.graphql$': './.jest/graphqlTransformer.js',
    '\\.*': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!lodash-es).+\\.js$'],
};
