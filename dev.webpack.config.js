var path = require("path");
var WebpackIsomorphicToolsPlugin = require("webpack-isomorphic-tools/plugin");
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require("./webpack.isomorphictools.config.js")
);

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  // Add resolve.extensions.
  // '' is needed to allow imports without an extension.
  // Note the .'s before extensions as it will fail to match without!!!
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      components: path.join(__dirname, "src", "components"),
      config: path.join(__dirname, "src", "config"),
      utils: path.join(__dirname, "src", "utils"),
    }
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "index.js",
  },
  progress: true,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react"],
        }
      },
      {
        test: /\.less$/,
        loader: "style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap",
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression("images"),
        loader: "url-loader?limit=153600",
      },
      // FONTS
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
    ],
  },
};
