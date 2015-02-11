var diez    = require('../../');
var fs      = require('fs');
var path    = require('path');
var React   = require('react');
var Router  = require('react-router');
var util    = require('util');

var app     = module.exports = require('express')();
var layout  = fs.readFileSync(path.join(__dirname, 'layout.html'), 'utf8');
var Routes  = require('./routes');

app
  .use(function(req, res, next) {
    req.container = diez.container();

    req.container.register('request', req);
    req.container.register('url', util.format('view-source:%s://%s:%s%s', req.protocol, req.hostname, app.get('port'), req.originalUrl))

    next();
  })
  .get('/', function(req, res, next) {
    Router.create({
      routes:   req.container.get(Routes),
      location: req.url
    }).run(function(Handler) {
      var element   = React.createElement(Handler);
      var content   = React.renderToString(element);
      var noscript  = /<noscript>[\S\s.]*<\/noscript>/m;

      res.send(layout.replace(noscript, content));

      next();
    });
  })
;
