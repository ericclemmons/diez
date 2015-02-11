var assert  = require('assert');
var diez    = require('..');

describe('state', function() {
  it('should default to a `null` parent', function() {
    assert.equal(null, diez.parent);
  });

  it('should set a version', function() {
    assert(diez.version);
  });

  it('should have an id', function() {
    assert(diez.id, 'diez_1');
  });

  describe('in a new container', function() {
    beforeEach(function() {
      this.container = diez.container();
    });

    it('should have an id', function() {
      assert(this.container.id, 'diez_2');
    });

    it('should have a different id', function() {
      assert(this.container.id, diez.id);
    });
  });
});
