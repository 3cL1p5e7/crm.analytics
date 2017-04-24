var webpack = require('webpack'),
  webpackconfig = require('./webpack.config.js'),
  webpackcompiler = webpack(webpackconfig);

var port = 8080;
var express = require('express');
var app = express();
var path = require('path');
// app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/dist', express.static(path.join(__dirname, '/dist')));

// app.all('*', express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public')));

var server = app.listen(port, function() {
  var host = server.address().address;
  console.log('Server is listening at http://%s:%s', host, port);
});