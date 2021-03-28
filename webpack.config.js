/* eslint-disable import/no-extraneous-dependencies */
const { resolve } = require('path');
const { getIfUtils } = require('webpack-config-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env) => {
  const { ifProd, ifNotProd } = getIfUtils(env);
  const config = {
    context: resolve('src'),
    entry: './index.tsx',
    output: {
      filename: '[name].js',
      path: resolve('dist'),
      pathinfo: ifNotProd(),
    },
    devtool: ifProd('source-map', 'eval'),
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    resolve: {

      /*
            * An array of extensions that should be used to resolve modules.
            *
            * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
            */
      extensions: ['.ts', '.tsx', '.js', '.json'],

      // An array of directory names to be resolved to the current directory
      modules: [resolve('src'), 'node_modules'],

    },
    module: {
      rules: [
        {
          test: /\.ts(x)?$/,
          loader: 'awesome-typescript-loader',
          exclude: [/\.(spec|e2e)\.ts$/],
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          loader: 'source-map-loader',
        },
      ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new ESLintPlugin()
    ],
  };
  if (env.debug) {
    // eslint-disable-next-line no-console
    console.log(config);
    // eslint-disable-next-line no-debugger
    debugger; // tslint disable line
  }

  return config;
};
