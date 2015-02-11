var _         = require('lodash');
var stampit   = require('stampit');
var api       = require('./api');
var version   = require('../package.json').version;

var diez = stampit.compose(api).state({
  id:       null,
  parent:   null,
  version:  version,
}).enclose(function() {
  this.id = _.uniqueId('diez_'),

  this.container = function() {
    return diez({ parent: this });
  };

  this.register('container', this);
});

module.exports = diez;
