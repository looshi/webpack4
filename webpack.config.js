module.exports = {
  mode: "development",

  module: {
    rules: [
      // Babel Loader
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        // For pure CSS (without CSS modules)
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        include: /css/,
        exclude: /src/
      },
      {
        // For CSS modules
        test: /.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ],
        include: /src/
      },
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
