var assert  = require('assert');
var diez    = require('..');

describe('.lookup', function() {
  beforeEach(function() {
    this.container = diez.container();
  });

  describe('when given a reference', function() {
    describe('that is not registered', function() {
      it('should throw an error', function() {
        assert.throws(this.container.lookup.bind(this.container, 'name'))
      });
    });

    describe('that is registered', function() {
      beforeEach(function() {
        this.container.register('name', 'value');
      });

      it('should return the stamp', function() {
        var stamp = this.container.lookup('name');

        assert(stamp);
        assert(stamp.matches);
        assert(stamp.resolve);
      });

      describe('in a parent container', function() {
        beforeEach(function() {
          this.child = this.container.container();
        });

        it('should return the stamp', function() {
          var stamp = this.container.lookup('name');

          assert(stamp);
          assert(stamp.matches);
          assert(stamp.resolve);
        });
      });
    });
  });
});
