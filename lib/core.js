var _       = require('lodash');
var assert  = require('assert');
var stampit = require('stampit');

module.exports = stampit().methods({
  matches: function() {
    throw new Error('Stamp is missing `.matches` function');
  },

  resolve: function() {
    throw new Error('Stamp is missing `.resolve` function');
  },
});
