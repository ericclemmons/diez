var assert  = require('assert');
var diez    = require('..');

describe('.container', function() {
  beforeEach(function() {
    this.container = diez.container();
  });

  it('should set `parent`', function() {
    assert(this.container.parent);
  });

  it('should be a child of the parent', function() {
    assert.equal(this.container.parent, diez);
  });

  it('should have a \'container\' alias that references itself', function() {
    assert(this.container.contains('container'));
    assert.equal(this.container.get('container'), this.container);
  });
});

