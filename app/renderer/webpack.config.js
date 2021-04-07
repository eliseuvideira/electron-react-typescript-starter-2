const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * @type {webpack.Configuration}
 */
const config = {
  entry: path.join(__dirname, "index.tsx"),
  output: {
    path: path.join(__dirname, "..", "..", "build", "renderer"),
    filename: "bundle.js",
  },
  target: "electron-renderer",
  devtool: isDevelopment ? "eval-source-map" : "source-map",
  performance: false,
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: ["@babel/preset-typescript", "@babel/preset-react"],
            plugins: [isDevelopment && "react-refresh/babel"].filter(Boolean),
          },
        },
      },
    ],
  },
  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: { configFile: path.join(__dirname, "tsconfig.json") },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      favicon: path.join(__dirname, "public", "favicon.ico"),
    }),
  ].filter(Boolean),
  devServer: {
    historyApiFallback: true,
    port: 8080,
  },
};

module.exports = config;
