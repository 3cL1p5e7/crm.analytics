var webpack = require('webpack'),
  webpackconfig = require('./webpack.config.js'),
  webpackcompiler = webpack(webpackconfig);

var port = 8080;
var express = require('express');
var app = express();
var path = require('path');
app.use('/', express.static(path.join(__dirname, '/dist')));

if (process.env.NODE_ENV !== 'production') {
  console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');
  app.use(require('webpack-dev-middleware')(webpackcompiler, {
    publicPath: webpackconfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(webpackcompiler));
} else {
  console.log('PRODUCTION ENVIRONMENT');
}
var server = app.listen(port, function() {
  var host = server.address().address;
  console.log('Server is listening at http://%s:%s', host, port);
});