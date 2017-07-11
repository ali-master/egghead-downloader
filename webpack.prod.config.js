const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const package = require("./package.json");

let nodeModules = {};
fs.readdirSync("node_modules").filter(function(x) {
    return [".bin"].indexOf(x) === -1;
}).forEach(function(mod) {
    nodeModules[mod] = "commonjs " + mod;
});

const config = {
    bail: true,
    target: "node",
    devtool: "source-map",
    context: path.resolve(__dirname, "source"),
    entry: "./index.js",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "build"),
    },
    externals: nodeModules,
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".json"]
    },
    module: {
        strictExportPresence: true,
        rules: [
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
            }
        ]
    },
    plugins: [
		new webpack.DefinePlugin({
            ROOT: path.resolve(__dirname),
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify(package.version),
        }),
        new webpack.IgnorePlugin(/\.(css|less)$/),
		new webpack.BannerPlugin({banner: '#!/usr/bin/env node', raw: true}),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    node: {
        __filename: true,
        __dirname: true
    },
}

module.exports = config;
