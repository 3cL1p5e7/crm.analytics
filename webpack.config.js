var path = require('path');
var join = path.join;

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ["acorn"], // test!
    app: './app/app.js'
  },
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'app')],
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        include: [path.resolve(__dirname, 'app')],
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader',
                use: 'css-loader!less-loader' })
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new ExtractTextPlugin("app.bundle.css")
  ]
};

if (process.env.NODE_ENV === 'prod') {
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
}
