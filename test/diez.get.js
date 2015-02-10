var assert  = require('assert');
var diez    = require('..');

describe('.get', function() {
  beforeEach(function() {
    this.container = diez.container();
  });

  describe('when given a non-registered argument', function() {
    it('should return an Object', function() {
      var o = { 'foo': 'bar' };

      assert.equal(o, this.container.get(o));
    });

    it('should return a Function', function() {
      var f = function() {};

      assert.equal(f, this.container.get(f));
    });

    it('should return a Numeric', function() {
      assert.equal(1, this.container.get(1));
    });

    it('should should throw a ReferenceError for unknown strings', function() {
      assert.throws(this.container.get.bind(this.container, 'foo'), ReferenceError);
    });
  });

  describe('when given a registered factory', function() {
    beforeEach(function() {
      this.http     = function() { return '200 OK'; };
      this.factory  = function(http) { return http; };

      this.container.register(this.factory, [this.http]);
    });

    it('should execute the factory', function() {
      assert(this.container.get(this.factory) !== this.factory);
    });

    it('should return the same instance each time', function() {
      var result = this.container.get(this.factory);

      assert.equal(this.container.get(this.factory), result);
    });

    describe('with unregistered dependencies', function() {
      it('should pass the dependencies through as-is', function() {
        assert.equal(this.container.get(this.factory), this.http);
      });
    });

    describe('with registered dependencies', function() {
      beforeEach(function() {
        this.container.register(this.http);
      });

      it('should execute the factory dependencies', function() {
        assert.equal(this.container.get(this.factory), '200 OK');
      });
    });
  });

  describe('when registering with unregistered dependencies', function() {
    beforeEach(function() {
      this.http     = function() {};
      this.factory  = function(http) { return http; };

      this.container.register(this.factory, [this.http]);
    });

    it('should pass the dependencies through as-is', function() {
      assert.equal(this.container.get(this.factory), this.http);
    });
  });
});
