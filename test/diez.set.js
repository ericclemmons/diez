var assert  = require('assert');
var diez    = require('..');

describe('.set', function() {
  beforeEach(function() {
    this.container = diez.container();
  });

  describe('when given a string', function() {
    it('should not throw an error', function() {
      this.container.set('foo');
    });

    it('should return the value', function() {
      var f = function() {};

      assert.equal(f, this.container.set('foo', f));
    });
  });

  describe('when given undefined', function() {
    it('should throw a TypeError', function() {
      assert.throws(this.container.set.bind(undefined), TypeError);
    });
  });

  describe('when given null', function() {
    it('should throw a TypeError', function() {
      assert.throws(this.container.set.bind(null), TypeError);
    });
  });

  describe('when given a boolean', function() {
    it('should throw a TypeError', function() {
      assert.throws(this.container.set.bind(false), TypeError);
    });
  });

  describe('when given an integer', function() {
    it('should throw a TypeError', function() {
      assert.throws(this.container.set.bind(0), TypeError);
    });
  });

  describe('when given a function', function() {
    it('should throw a TypeError', function() {
      assert.throws(this.container.set.bind(function() {}), TypeError);
    });
  });

  describe('when given an array', function() {
    it('should throw a TypeError', function() {
      assert.throws(this.container.set.bind([]), TypeError);
    });
  });

  describe('when given an object', function() {
    it('should throw a TypeError', function() {
      assert.throws(this.container.set.bind({}), TypeError);
    });
  });
});
