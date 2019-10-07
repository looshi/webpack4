const express = require("express");

const app = express();
const path = require("path");

// static assets
// usually served out by phoenix server?
const assetPath = path.resolve(__dirname, "./priv/static");
console.log("assetPath", assetPath);
app.use("/priv/static", express.static(assetPath));

// index.html
// This is usually served out by phoenix server.
app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "./index.production.html"))
);

app.listen(4001, "localhost", function(err) {
  if (err) return console.error(err);
  console.log("Webpack Dev Server running on localhost:4001");
});
