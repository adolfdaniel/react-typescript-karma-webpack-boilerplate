const { resolve } = require('path');
const { getIfUtils } = require('webpack-config-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    const { ifProd, ifNotProd } = getIfUtils(env);
    const config = {
        context: resolve("src"),
        entry: "./index.tsx",
        output: {
            filename: "bundle.js",
            path: resolve("dist"),
            pathinfo: ifNotProd(),
        },
        devtool: ifProd("source-map", "eval"),
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
            modules: [resolve("src"), 'node_modules'],

        },
        module: {
            rules: [
                {
                    test: /\.ts(x)?$/,
                    loaders: [
                        'awesome-typescript-loader'
                    ],
                    exclude: [/\.(spec|e2e)\.ts$/]
                },
                {
                    test: /\.js$/,
                    enforce: "pre",
                    loader: "source-map-loader"
                },
                {
                    test: /\.ts(x)?$/,
                    enforce: "pre",
                    loader: 'eslint-loader',
                    exclude: /node_modules/,
                }
            ],

        },
        plugins: [new HtmlWebpackPlugin({
            template: 'index.html'
        })]
    };
    if (env.debug) {
        console.log(config);
        debugger; // tslint disable line
    }

    return config;
}