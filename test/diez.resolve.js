var assert  = require('assert');
var diez    = require('..');

describe('.resolve', function() {
  describe('when given a reference', function() {
    beforeEach(function() {
      this.container  = diez.container();
      this.request    = function() { return { body: 'GET /hello' }; };
      this.response   = function() { return { body: '200 OK' }; };
      this.factory    = function(request, response) { return [request, response]; };
    });

    describe('that is registered', function() {
      beforeEach(function() {
        this.container.register(this.factory, [this.request, this.response]);
      });

      it('should return a new instance each time', function() {
        var a = this.container.resolve(this.factory);
        var b = this.container.resolve(this.factory);

        assert.deepEqual(a, b);
        assert.notEqual(a, b);
      });

      describe('with registered dependencies', function() {
        beforeEach(function() {
          this.container.register(this.request);
          this.container.register(this.response);
        });

        it('should instantiate dependencies', function() {
          var a = this.container.resolve(this.factory);
          var b = this.container.resolve(this.factory);

          assert.deepEqual(a[0], b[0]);
          assert.deepEqual(a[1], b[1]);
        });
      });

      describe('in a parent container', function() {
        beforeEach(function() {
          this.child = this.container.container();
        });

        it('should return a new instance each time', function() {
          var a = this.child.resolve(this.factory);
          var b = this.child.resolve(this.factory);

          assert.deepEqual(a, b);
          assert.notEqual(a, b);
        });
      });
    });

    describe('that is not registered', function() {
      it('should throw an error', function() {
        assert.throws(this.container.resolve.bind(this.container, this.factory));
      });
    });
  });
});
