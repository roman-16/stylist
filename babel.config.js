const { baseConfig: webpack } = require('./webpack.config');

const moduleResolver = ['babel-plugin-module-resolver', webpack.resolve];

module.exports = (api) => {
  const isTest = api.env('test');

  api.cache(true);

  return isTest
    ? {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current',
              },
            },
          ],
          '@babel/preset-react',
        ],
        plugins: [moduleResolver],
      }
    : {
        presets: [
          [
            '@babel/preset-env',
            // TODO: Use when we got a server
            // {
            //   useBuiltIns: 'entry',
            //   corejs: 3,
            // },
          ],
          '@babel/preset-react',
        ],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              useESModules: true,
            },
          ],
          moduleResolver,
        ],
        sourceType: 'unambiguous',
        compact: false,
      };
};
