var _       = require('lodash');
var assert  = require('assert');
var core    = require('./core');
var util    = require('util');
var stampit = require('stampit');

module.exports = stampit().compose(core).state({
  factory:      null,
  dependencies: null,
}).methods({
  matches: function(reference) {
    return this.factory === reference;
  },

  resolve: function(container) {
    var deps = this.dependencies.map(function(dep) {
      return container.contains(dep) ? container.get(dep) : dep;
    });

    var value = this.factory.apply(this.factory, deps);

    if (_.isUndefined(value)) {
      throw new TypeError('Factory did not return a value');
    }

    return value;
  },
}).enclose(function() {
  assert(_.isFunction(this.factory));
  assert(_.isArray(this.dependencies));

  var signature = this.factory.toString().match(/function\s([^\(]*\(.+\))/);

  assert.equal(
    this.factory.length,
    this.dependencies.length,

    util.format(
      'Factory signature %s requires %s arguments, but got %s',
      signature ? signature[1] : '',
      this.factory.length,
      this.dependencies.length
    )
  );
});
