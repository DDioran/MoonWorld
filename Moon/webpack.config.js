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
    entry: "./client/js/index.ts",
    stats: { modules: false },
    context: __dirname,
    resolve: { extensions: ['.js', '.ts'] },
    output: {
      filename: "js/[name].[chunkhash].js",
      path: path.join(__dirname, clientBundleOutputDir),
      publicPath: "/"
    },
    module: {
      rules: [
        //{ test: /\.ts$/, use: isDevBuild ? 'awesome-typescript-loader?silent=true' : 'ts-loader' },
        { test: /\.ts$/, use: 'ts-loader' },
        { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
        //{ test: /\.css$/, use: ['to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize'] },
      ]
    },
    plugins: [
      new CheckerPlugin(),
      new CleanWebpackPlugin(["wwwroot/js/*"]),
      new CleanWebpackPlugin(["wwwroot/css/*"]),
      new HtmlWebpackPlugin({
        template: "./client/index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].[chunkhash].css"
      }),
      /*isDevBuild ? new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
        //moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]')
      }) : new UglifyJsPlugin()*/
    ],
    devtool: "source-map"
    //devtool: false,
    //watch: true
  };
  return config;
};
