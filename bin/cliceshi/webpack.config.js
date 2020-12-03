/*
 * @Author: wangzhong
 * @Date: 2020-07-01 23:27:50
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-09-16 17:38:12
 * @FilePath: /ice/webpack.config.js
 */

const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");


module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        // 加快构建速度
        cache: false, // 开启缓存
        parallel: 4, // 多线程打包
        terserOptions: {
          compress: {
            unused: true, // 剔除无用代码
            drop_debugger: true, // 剔除debugger
            drop_console: true, // 剔除console
            dead_code: true,
          },
        },
      }),
    ],
  },
  entry: {
    system: path.resolve(__dirname, "libs/system.js"),
    app: path.resolve(__dirname, "src/App.js"),
    main: path.resolve(__dirname, "src/main.js"),
  },
  output: {
    filename: "[name]_[hash:16].js",
    publicPath: "/",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: [
              require.resolve("@babel/preset-react"),
              require.resolve("@babel/preset-env"),
            ],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
  node: {
    fs: "empty",
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/app1": {
        target: "http://localhost:9001",
        pathRewrite: { "^/app1": "" },
      },
      "/app2": {
        target: "http://localhost:9002",
        pathRewrite: { "^/app2": "" },
        logLevel: "debug",
      },
      "/app3": {
        target: "http://localhost:9003",
        pathRewrite: { "^/app3": "" },
      },
      "/app4": {
        target: "http://localhost:9004",
        pathRewrite: { "^/app4": "" },
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild",
    },
    host: "0.0.0.0",
  },
};
