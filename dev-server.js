const express = require("express");
const webpack = require("webpack");
const config = require("./webpack.config");

const compiler = webpack(config);
const app = express();
const path = require("path");

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    headers: { "Access-Control-Allow-Origin": "http://localhost:4000" }
  })
);

app.use(
  require("webpack-hot-middleware")(compiler, {
    log: console.log
  })
);

// static assets
// usually served out by phoenix server?
const assetPath = path.resolve(__dirname, "./priv/static");
app.use(express.static(assetPath));

// index.html
// This is usually served out by phoenix server.
app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "./index.html"))
);

app.listen(4001, "localhost", function(err) {
  if (err) return console.error(err);
  console.log("Webpack Dev Server running on localhost:4001");
});

// Exit on end of STDIN
process.stdin.resume();
process.stdin.on("end", function() {
  process.exit(0);
});
