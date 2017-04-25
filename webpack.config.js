var path = require('path');
var join = path.join;

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var prod = process.env.NODE_ENV === 'production';

module.exports = {
  context: join(__dirname, 'app'),
  entry: {
    vendor: ["react", "react-dom", "react-hot-loader"
      // "babel", "babel-core"
    ],
    app: [
      './app.js'
    ]
  },
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [/dist/],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'app')],
        exclude: [/node_modules/, /dist/],
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        include: [path.resolve(__dirname, 'app')],
        exclude: [/node_modules/, /dist/],
        loader: 'babel-loader!react-vue-style-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, 'app'),
      path.join(__dirname, 'uikit'),
      "node_modules"
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new ExtractTextPlugin("app.bundle.css")
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = module.exports.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true)
  ]);
} else {
  module.exports.devtool = '#source-map';
  module.exports.watchOptions = { poll: true };
}