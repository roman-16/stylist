const dotenv = require('dotenv');
const { EnvironmentPlugin } = require('webpack');
const { baseConfig: webpackConfig } = require('../webpack.config');

dotenv.config();

module.exports = {
  stories: ['./../src/**/*.stories.jsx'],
  addons: ['@storybook/addon-knobs/register', '@storybook/addon-viewport/register'],

  webpackFinal: (config) => ({
    ...webpackConfig,
    ...config,

    devtool: 'eval-source-map',
    module: webpackConfig.module,
    plugins: [...config.plugins, new EnvironmentPlugin({ ...process.env })],
    resolve: webpackConfig.resolve,
    optimization: {
      ...webpackConfig.optimization,
      ...config.optimization,

      sideEffects: false, // Ignore sideEffects flag of package.json
    },
    externals: undefined,
  }),
};
