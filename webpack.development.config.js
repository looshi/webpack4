const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const hmrEntry =
  "webpack-hot-middleware/client?path=http://localhost:4001/__webpack_hmr";
const publicPath = "http://localhost:4001/";

module.exports = {
  mode: "development",

  devtool: "cheap-eval-source-map",

  watch: true,

  entry: [
    hmrEntry,
    "@babel/polyfill",
    "react-hot-loader/patch",
    "./web/static/css/app.css",
    "./web/static/js/app.jsx"
  ],

  output: {
    publicPath,
    path: path.resolve("./priv/static"),
    filename: "js/app.js"
  },

  resolve: {
    alias: { "react-dom": "@hot-loader/react-dom" },
    modules: [
      path.resolve(__dirname),
      path.resolve("./web/static/js"),
      path.resolve("./web/static/css"),
      "node_modules"
    ],
    // index.jsx importing path/index.jsx as "import a from 'path'" does not work without this
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
        include: /web\/static\/css/
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
                localIdentName: "[path][name]_[local]"
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // @babel/preset-env options are in .browserslistrc
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "react-hot-loader/babel",
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-export-default-from",
              "@babel/plugin-proposal-export-namespace-from",
              [
                "@lingui/babel-plugin-transform-react",
                { importedNames: [["Trans", "T"]] }
              ]
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
          name: "[name].[ext]", // d: app "[path][name].[ext]", why ... WHY ?
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
    // this seems redundant to the file-loaders:
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "web/static/assets"),
        to: path.join(__dirname, "priv/static")
      }
    ])
  ]
};
