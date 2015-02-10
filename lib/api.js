var _       = require('lodash');
var stampit = require('stampit');
var util    = require('util');

module.exports = stampit().enclose(function() {
  var keys      = [];
  var values    = [];
  var resolved  = [];
  var values    = [];
  var resolved  = [];

  this.register = function(factory, deps) {
    if (!_.isFunction(factory)) {
      throw new TypeError('diez.register requires a factory function');
    }

    if (arguments.length === 1) {
      deps = [];
    }

    if (!_.isArray(deps)) {
      deps = [deps];
    }

    keys.push(factory);
    values.push(deps);

    return factory;
  };

  this.get = function(key) {
    // Strings must exist
    if (!this.has(key)) {
      if (_.isString(key)) {
        throw new ReferenceError(util.format('diez has no reference for %j', ref));
      }

      return key;
    }

    return this.getResolved(key) || this.resolve(key);
  };

  this.getKey = function(key) {
    var i = this.getKeyIndex(key);

    return i > -1 ? keys[i] : this.parent.getKey(key);
  };

  this.getKeyIndex = function(key) {
    return keys.indexOf(key);
  };

  this.getValue = function(key) {
    var i = this.getKeyIndex(key);

    return i > -1 ? values[i] : this.parent.getValue(key);
  };

  this.getResolved = function(key) {
    var i = this.getKeyIndex(key);

    return resolved[i];
  };

  this.has = function(key) {
    return (this.getKeyIndex(key) > -1) || (this.parent && this.parent.has(key));
  };

  this.resolve = function(key) {
    var i       = this.getKeyIndex(key);
    var object  = this.getKey(key);
    var value   = this.getValue(key);

    var resolvedRef;

    if (_.isFunction(object)) {
      resolvedRef = object.apply(null, value.map(function(dep) {
        return this.get(dep);
      }.bind(this)));
    } else {
      resolvedRef = value;
    }

    resolved[i] = resolvedRef;

    return this.getResolved(key);
  };

  this.set = function(key, value) {
    if (!_.isString(key)) {
      throw new TypeError('diez.set requires a string');
    }

    keys.push(key);
    values.push(value);

    return value;
  };
});
