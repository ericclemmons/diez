var _       = require('lodash');
var stampit = require('stampit');
var util    = require('util');

var factory = require('./factory');
var scalar  = require('./scalar');

module.exports = stampit().enclose(function() {
  var references = [];

  this.contains = function(reference) {
    try {
      this.lookup(reference);

      return true;
    } catch(e) {
      return false;
    }
  };

  this.get = _.memoize(function(reference) {
    if (!reference) {
      throw new TypeError('diez.get requires a reference');
    }

    return this.resolve(reference);
  });

  this.has = function(reference) {
    return _.any(references, function(stamp) {
      return stamp.matches(reference);
    });
  };

  this.lookup = function(reference) {
    var stamp =  _.find(references, function(stamp) {
      return stamp.matches(reference);
    });

    if (stamp) {
      return stamp;
    }

    if (this.parent) {
      return this.parent.lookup(reference);
    }

    throw new Error('Diez could not find this reference');
  };

  this.register = function(reference, value) {
    if (_.isString(reference)) {
      references.push(scalar({
        name:   reference,
        value:  value,
      }));

      return this;
    };

    if (_.isFunction(reference)) {
      references.push(factory({
        factory:      reference,
        dependencies: value || [],
      }));

      return this;
    };

    throw new TypeError('diez.register requires a String or Function');
  };

  this.resolve = function(reference) {
    return this.lookup(reference).resolve(this);
  };
});
