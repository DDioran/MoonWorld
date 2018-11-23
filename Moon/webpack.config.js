const path = require("path");
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);
  const clientBundleOutputDir = './wwwroot';
  const config = {
    mode: !isDevBuild ? 'production':'development',
    entry: "./src/js/index.ts",
    stats: { modules: false },
    context: __dirname,
    resolve: { extensions: ['.js', '.ts'] },
    output: {
      filename: !isDevBuild ? "js/[name].[chunkhash].js" : "js/[name].js",
      path: path.join(__dirname, clientBundleOutputDir),
      publicPath: "/"
    },
    module: {
      rules: [
        { test: /\.ts$/, use: isDevBuild ? 'awesome-typescript-loader?silent=true' : 'ts-loader' },
        { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] }
      ]
    },
    plugins: [
      new CheckerPlugin(),
      new CleanWebpackPlugin(["wwwroot/*"]),
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      }),
      new MiniCssExtractPlugin({
        filename: !isDevBuild ? "css/[name].[chunkhash].css" : "css/[name].css"
      }),
      isDevBuild ? new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
        moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]')
      }) : new UglifyJsPlugin()
    ]
  };
  return config;
};
