var assert  = require('assert');
var diez    = require('..');

describe('.register', function() {
  beforeEach(function() {
    this.container = diez.container();
  });

  describe('when given a Function', function() {
    it('should not throw an error', function() {
      this.container.register(function() {});
    });

    it('should return the function', function() {
      var f = function() {};

      assert.equal(f, this.container.register(f));
    });
  });

  describe('when given undefined', function() {
    it('should throw a TypeError', function() {
      assert.throws(this.container.register.bind(undefined), TypeError);
    });
  });

  describe('when given null', function() {
    it('should throw a TypeError', function() {
      assert.throws(this.container.register.bind(null), TypeError);
    });
  });

  describe('when given a boolean', function() {
    it('should throw a TypeError', function() {
      assert.throws(this.container.register.bind(false), TypeError);
    });
  });

  describe('when given an integer', function() {
    it('should throw a TypeError', function() {
      assert.throws(this.container.register.bind(0), TypeError);
    });
  });

  describe('when given a string', function() {
    it('should throw a TypeError', function() {
      assert.throws(this.container.register.bind('foo'), TypeError);
    });
  });

  describe('when given an array', function() {
    it('should throw a TypeError', function() {
      assert.throws(this.container.register.bind([]), TypeError);
    });
  });

  describe('when given an object', function() {
    it('should throw a TypeError', function() {
      assert.throws(this.container.register.bind({}), TypeError);
    });
  });
});
