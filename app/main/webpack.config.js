const webpack = require("webpack");
const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const dotenv = require("dotenv-safe");

const { required } = dotenv.config();

/**
 * @type {webpack.Configuration}
 */
const config = {
  entry: path.join(__dirname, "index.ts"),
  output: {
    path: path.join(__dirname, "..", "..", "build", "main"),
    filename: "index.js",
    publicPath: "/",
  },
  target: "electron-main",
  node: {
    __dirname: false,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  performance: false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: ["@babel/preset-typescript"],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: { configFile: path.join(__dirname, "tsconfig.json") },
    }),
    new webpack.EnvironmentPlugin(required),
  ],
};

module.exports = config;
