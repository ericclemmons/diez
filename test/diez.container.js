var assert  = require('assert');
var diez    = require('..');

describe('.container', function() {
  var child = diez.container();

  it('should set `parent`', function() {
    assert(child.parent);
  });

  it('should be a child of the parent', function() {
    assert.equal(diez, child.parent);
  });

  it('should have a \'container\' alias that references itself', function() {
    assert(child.has('container'));
    assert.equal(child, child.get('container'));
  });
});

