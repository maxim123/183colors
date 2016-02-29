// minify if run with NODE_ENV=production webpack
var debug = process.env.NODE_ENV !== "production";

var webpack = require('webpack');

module.exports = {
  context: __dirname + "/src",
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/scripts.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        // exclude: /(node_modules|bower_components)/,
        // include: /(src\/js|src\/node_modules\/react-color\/src\/components)$/,
        exclude: /src\/(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      {
        test: /\.(scss|css)$/,
        // include: /src/,
        loaders: ["style", "css", "sass?outputStyle=expanded"]
      },
    ]
  },
  options: {
      // suppress 100KB limit warning
      transform: [['babelify', { compact: false }]]
  },
  output: {
    path: __dirname + "/src/js",
    filename: "scripts.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
