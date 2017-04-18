var express = require('express');
var app = express();

var path = require('path');

app.use('/', express.static(path.join(__dirname, '/dist')));

var port = 8080;
var server = app.listen(port, function () {
  var host = server.address().address;
  console.log('Server is listening at http://%s:%s', host, port);
});