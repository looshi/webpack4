const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",

  entry: [
    "@babel/polyfill",
    "./web/static/css/main.css", // d:   "./web/static/css/app.css",
    "./web/static/js/index.js" // d:   "./web/static/js/app.jsx"
  ],

  output: {
    path: path.resolve("./priv/static"),
    filename: "js/app.js"
  },

  resolve: {
    // modules: [
    //   path.resolve(__dirname),
    //   path.resolve("./web/static/js"),
    //   path.resolve("./web/static/css"),
    //   "node_modules"
    // ],
    extensions: [".js", ".jsx"]
  },

  module: {
    rules: [
      // Third-party Styles
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        include: /node_modules/
      },

      // Vanilla Styles
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              // publicPath: '../',
              hmr: false
            }
          },
          "css-loader"
        ],
        include: /web\/static\/css/
      },

      // CSS-Module Styles
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              localsConvention: "camelCase",
              modules: {
                mode: "local",
                localIdentName: "[folder]_[name]_[local]__[hash:base64:2]"
              }
            }
          },
          "postcss-loader"
        ],
        include: /web\/static\/js/
      },

      // Scripts
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-export-default-from",
            "@babel/plugin-proposal-export-namespace-from",
            [
              "@lingui/babel-plugin-transform-react",
              { importedNames: [["Trans", "T"]] }
            ]
          ]
        }
      },

      // Fonts
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "[folder]_[name].[ext]",
          outputPath: "fonts/",
          publicPath: "/"
        }
      },

      // Images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "[folder]_[name].[ext]",
          outputPath: "images/",
          publicPath: "/"
        }
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin([{ from: "./web/static/assets" }]),
    new webpack.ProvidePlugin(require("./web/static/js/lib/shims"))
  ],

  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
};
