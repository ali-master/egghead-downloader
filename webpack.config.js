const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const package = require("./package.json");

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


let nodeModules = {};
fs.readdirSync('node_modules').filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
}).forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
});

const config = {
    bail: true,
    watch: true,
    target: 'node',
    devtool: "cheap-module-source-map",
    context: path.resolve(__dirname, "source"),
    entry: ['webpack/hot/poll?1000', "./index.js"],
    output: {
        pathinfo: true,
        filename: "[name].js",
        sourceMapFilename: '[file].map',
        libraryTarget: 'commonjs2',
        publicPath: __dirname,
        path: path.resolve(__dirname, "dist"),
    },
    externals: nodeModules,
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json']
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: [
                    {
                        loader: "eslint-loader",
                    },
                ],
                include: path.resolve(__dirname, "src"),
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            babelrc: true,
                            cacheDirectory: true
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: ['You application is ready to developing'],
                notes: ['Some additionnal notes to be displayed unpon successful compilation']
            },
            clearConsole: true,
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            ROOT: path.resolve(__dirname),
            DEVELOPMENT: JSON.stringify(true),
            VERSION: JSON.stringify(package.version),
        }),
        // enable HMR globally
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/\.(css|less)$/),
        new webpack.BannerPlugin({banner: '#!/usr/bin/env node', raw: true}),
    ],
    node: {
        __filename: true,
        __dirname: true
    },
    performance: {
        hints: "warning",
    },
}

module.exports = config;
