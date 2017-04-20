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
    loaders: [{
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'app')],
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.less$/,
        // loader: "style-loader!css-loader!less-loader"
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader'
        })
      }
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