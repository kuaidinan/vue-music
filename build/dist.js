var config = require('../config/index.js');
var express = require('express'),
    app = express(),
    path = require('path')
    opn = require('opn');

var uri = 'http://localhost:' + config.dist.port;

app.use(express.static(path.join(__dirname,'../dist')))

app.listen(config.dist.port,() => {
  console.log('my server is start,port is %s',config.dist.port);
  opn(uri);
})
