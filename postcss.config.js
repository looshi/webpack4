const cssnano_production_only =
  process.env.NODE_ENV === "production"
    ? require("cssnano")({
        preset: "default"
      })
    : false;

module.exports = {
  plugins: [
    require("postcss-modules-values"),
    require("autoprefixer"),
    cssnano_production_only
  ]
};
