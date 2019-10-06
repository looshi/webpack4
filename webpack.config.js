const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  watch: true,
  entry: ["./static/css/main.css", "./static/js/index.js"],
  output: { path: path.resolve(__dirname, "priv/static") },

  module: {
    rules: [
      /*
      CSS
        postcss-loader options are in postcss.config.js
        if css-loader is a String versus Object, then the error = Uncaught TypeError: Cannot read property 'myblue' of undefined
        https://webpack.js.org/loaders/css-loader/#importloaders
      */
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1 }
          },
          "postcss-loader"
        ],
        include: /static\/css/,
        exclude: /src/
      },
      /*
      CSS Modules
      */
      {
        test: /.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // localsConvention: "camelCase" is the same behavior as `camelCase: true`. from 2.0.
              // which makes available style["blue-dog"] OR style.blueDog.
              // https://webpack.js.org/loaders/css-loader/#localsconvention
              localsConvention: "camelCase",
              modules: {
                mode: "local",
                localIdentName: "[path][name]__[local]",
                context: path.resolve(__dirname, "src")
              }
            }
          },
          "postcss-loader"
        ],
        include: /static\/js/
      },

      /*
      JS, JSX
      */
      {
        test: /\.jsx?/, //.js or .jsx files
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            // @babel/preset-env options are in .browserslistrc
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-export-default-from",
              "@babel/plugin-proposal-export-namespace-from"
            ]
          }
        }
      },

      /*
      Fonts
      */
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "fonts/",
          // const publicPath = "http://localhost:4001/"; // via express server
          publicPath: "./priv/static/fonts" // file system path
        }
      },

      /*
      Images
      */
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images/",
          publicPath: "./priv/static/images"
        }
      }
    ]
  },

  /*
  Plugins
  LoaderOptionsPlugin: was a migration helper from webpack 1.0 to 2.0
  ProvidePlugin: automatically imports modules ( works as if they were global variables )
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new webpack.ProvidePlugin(require('./web/static/js/lib/shims')),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'web/static/assets'),
        to: path.join(__dirname, 'priv/static'),
      },
    ]),
  ],
  */
  plugins: [new webpack.ProvidePlugin(require("./static/js/lib/shims"))]
};
