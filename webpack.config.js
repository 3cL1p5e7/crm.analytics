var path = require('path');
var join = path.join;

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

module.exports = {
  context: join(__dirname, 'app'),
  entry: {
    vendor: ["react", "react-dom", "react-hot-loader"
      // "babel", "babel-core"
    ], // test!
    app: [
      './app.js',
      `webpack-hot-middleware/client`,
      'react-hot-loader/patch',
      'webpack/hot/dev-server'
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
        // query: {
        //   presets: ['es2015', 'react']
        // }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader'
        })
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new ExtractTextPlugin("app.bundle.css")
    // new WriteFilePlugin({
    //   test: /\.js$/
    // })
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