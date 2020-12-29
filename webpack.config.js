const path = require('path');
const rimraf = require('rimraf');
const { EnvironmentPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

rimraf.sync(path.join(__dirname, './dist/'));

if (process.env.NODE_ENV === 'staging') {
  // Set env to production to be as close as possible to production
  // React will optimize its build on production
  process.env.NODE_ENV = 'production';
}

const baseConfig = {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: [/@babel\/runtime/, /core-js/],
      },
      {
        test: /\.graphql$/,
        use: ['graphql-tag/loader'],
      },
      {
        test: /\.css$/,
        use: ['raw-loader'],
      },
      {
        test: /\.(svg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  plugins: [new EnvironmentPlugin({ ...process.env })],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@@': path.join(__dirname, './'),
      '@@jest': path.join(__dirname, './.jest/'),
      '@': path.join(__dirname, './src/'),
      '@components': path.join(__dirname, './src/components/'),
      '@context': path.join(__dirname, './src/context/'),
      '@helpers': path.join(__dirname, './src/helpers/'),
      '@shared': path.join(__dirname, './src/shared/'),
      '@env': path.join(__dirname, './src/env'),
    },
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'styled-components': 'styled',
  },
};

module.exports = [
  {
    ...baseConfig,
    entry: path.join(__dirname, './src/entry/splitted/index.js'),
    output: {
      filename: '[name].[contenthash].js',
      path: path.join(__dirname, 'dist/splitted/'),
      publicPath: '/widgets/splitted/',
    },
  },
  {
    ...baseConfig,
    entry: path.join(__dirname, './src/entry/standalone/index.jsx'),
    output: {
      filename: '[name].[contenthash].js',
      path: path.join(__dirname, 'dist/standalone/'),
      publicPath: '/widgets/standalone/',
    },
    performance: {
      // Performance/bundle splitting is not important for standalone
      maxEntrypointSize: 1000000, // ~ 1 mb
      maxAssetSize: 1000000, // ~ 1 mb
    },
  },
];
module.exports.baseConfig = baseConfig;
