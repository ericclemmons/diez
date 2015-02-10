var assert  = require('assert');
var diez    = require('..');

describe('state', function() {
  it('should default to a `null` parent', function() {
    assert.equal(null, diez.parent);
  });

  it('should set a version', function() {
    assert(diez.version);
  });
});
