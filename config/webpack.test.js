'use strict';

const helpers = require('./helpers');
const { resolve } = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

/**
 * Webpack Constants
 */
const ENV = (process.env.ENV = process.env.NODE_ENV = 'test');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = (options) => {
  return {
    /**
     * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
     *
     * Do not change, leave as is or it wont work.
     * See: https://github.com/webpack/karma-webpack#source-maps
     */
    devtool: 'inline-source-map',

    mode: 'development',

    /**
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
      /**
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.tsx', '.js', '.json'],

      /**
       * Make sure root is src
       */
      modules: [resolve(__dirname, 'src'), 'node_modules'],
    },

    plugins: [new ESLintPlugin()],

    /**
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {
      rules: [
        /**
         * Source map loader support for *.js files
         * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
         *
         * See: https://github.com/webpack/source-map-loader
         */
        {
          enforce: 'pre',
          test: /\.tsx$/,
          loader: 'source-map-loader',
          exclude: [
            // these packages have problems with their sourcemaps
            helpers.root('node_modules/rxjs'),
          ],
        },

        /**
         * Typescript loader support for .ts and Angular 2 async routes via .async.ts
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader
         */
        {
          test: /\.tsx$/,
          loader: 'awesome-typescript-loader',
          options: {
            // use inline sourcemaps for 'karma-remap-coverage' reporter
            sourceMap: false,
            inlineSourceMap: true,
            compilerOptions: {
              // Remove TypeScript helpers to be injected
              // below by DefinePlugin
              removeComments: true,
            },
          },
          exclude: [/\.e2e\.ts$/],
        },

        /**
         * Json loader support for *.json files.
         *
         * See: https://github.com/webpack/json-loader
         */
        {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: [helpers.root('src/index.html'), /node_modules/],
        },

        /**
         * Instruments JS files with Istanbul for subsequent code coverage reporting.
         * Instrument only testing sources.
         *
         * See: https://github.com/deepsweet/istanbul-instrumenter-loader
         */
        {
          enforce: 'post',
          test: /\.(js|tsx)$/,
          loader: 'istanbul-instrumenter-loader',
          include: helpers.root('src'),
          exclude: [/\.(e2e|spec)\.tsx?$/, /node_modules/],
        },
      ],
    },

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
    },

    externals: {
      jsdom: 'window',
      cheerio: 'window',
      'react/lib/ExecutionEnvironment': 'true',
      'react/addons': 'true',
      'react/lib/ReactContext': 'window',
    },
  };
};
