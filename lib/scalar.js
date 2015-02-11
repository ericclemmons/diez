var _       = require('lodash');
var assert  = require('assert');
var core    = require('./core');
var stampit = require('stampit');

module.exports = stampit().compose(core).state({
  name:   null,
  value:  null,
}).methods({
  matches: function(reference) {
    return this.name === reference;
  },

  resolve: function() {
    return this.value;
  },
}).enclose(function() {
  assert(_.isString(this.name));
  assert(!_.isNull(this.value) && !_.isUndefined(this.value));
});
