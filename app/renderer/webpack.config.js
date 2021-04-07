const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

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
  devtool:
    process.env.NODE_ENV === "development" ? "eval-source-map" : "source-map",
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
          },
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: { configFile: path.join(__dirname, "tsconfig.json") },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      favicon: path.join(__dirname, "public", "favicon.ico"),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 8080,
  },
};

module.exports = config;
