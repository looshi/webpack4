const express = require("express");
const app = express();
const path = require("path");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const compiler = webpack(webpackConfig);

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);

app.use(require("webpack-hot-middleware")(compiler));

// static assets
app.use(express.static("priv/static"));

app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "./index.html"))
);

app.listen(4001, () => console.log("App listening on port 4001!"));
