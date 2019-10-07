const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const publicPath = "http://localhost:4001/"; // via express server

module.exports = {
  mode: "development",
  watch: true,
  entry: [
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
    "./web/static/css/main.css",
    "./web/static/js/index.js"
  ],

  output: {
    // path: path.resolve(__dirname, "/priv/static/js"),
    filename: "app.js",
    publicPath: "/"
  },

  resolve: {
    // index.jsx importing path/index.jsx as "import a from 'path'" does not work without this
    extensions: [".js", ".jsx"]
  },

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
        include: /web\/static\/css/,
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
        include: /web\/static\/js/
      },

      /*
      JS, JSX
      */
      {
        test: /\.jsx?$/, //.js or .jsx files
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            // @babel/preset-env options are in .browserslistrc
            presets: ["@babel/preset-env", "@babel/preset-react"],
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
          publicPath: `${publicPath}/fonts`
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
          publicPath: `${publicPath}/images`
        }
      }
    ]
  },

  /*
  Plugins
    LoaderOptionsPlugin: was a migration helper from webpack 1.0 to 2.0, no longer needed ?
    ProvidePlugin: automatically imports modules ( works as if they were global variables )
    CopyPlugin: no longer in webpack object, in 2.0 was: webpack.CopyWebpackPlugin
    HotModuleReplacementPlugin:
  */
  plugins: [
    new webpack.ProvidePlugin(require("./web/static/js/lib/shims")),
    new webpack.HotModuleReplacementPlugin(), // Adds app.js to express server in-memory filesystem.
    // new webpack.NoEmitOnErrorsPlugin()
    new CopyPlugin([
      {
        from: path.join(__dirname, "web/static/assets"),
        to: path.join(__dirname, "priv/static")
      }
    ])
  ]
};
