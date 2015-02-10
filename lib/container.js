var stampit   = require('stampit');
var api       = require('./api');
var state     = require('./state');

var diez = stampit.compose(state, api).enclose(function() {
  this.container = function() {
    return diez({ parent: this });
  };

  this.set('container', this);
});

module.exports = diez;
