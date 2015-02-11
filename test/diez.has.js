var assert  = require('assert');
var diez    = require('..');

describe('.has', function() {
  beforeEach(function() {
    this.container = diez.container();
  });

  describe('when given a reference', function() {
    describe('that is not registered', function() {
      it('should return false', function() {
        assert.equal(this.container.has('name'), false);
      });
    });

    describe('that is registered', function() {
      beforeEach(function() {
        this.container.register('name', 'value');
      });

      it('should return true', function() {
        assert(this.container.has('name'));
      });

      describe('in a parent container', function() {
        beforeEach(function() {
          this.child = this.container.container();
        });

        it('should return false', function() {
          assert.equal(this.child.has('name'), false);
        });
      });
    });
  });
});
