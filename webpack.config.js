module.exports = {
  mode: "development",
  watch: true,
  entry: ["./css/main.css", "./src/index.js"],
  // output: "./dist/main.js",

  module: {
    rules: [
      // Babel Loader
      {
        test: /\.jsx?/, //.js or .jsx files
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            // options are in .browserslistrc
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        /*
        CSS
          postcss-loader options are in postcss.config.js
          if css-loader is a string error = Uncaught TypeError: Cannot read property 'myblue' of undefined
          https://webpack.js.org/loaders/css-loader/#importloaders
        */
        test: /\.css$/i,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader"
        ],
        include: /css/,
        exclude: /src/
      },
      {
        // CSS Modules
        test: /.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          "postcss-loader"
        ],
        include: /src/
      },
      // Images
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: "url-loader",
        options: {
          limit: 8192
        }
      }
    ]
  }
};
