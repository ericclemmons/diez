var assert  = require('assert');
var diez    = require('..');

describe('.register', function() {
  beforeEach(function() {
    this.container = diez.container();
  });

  describe('when given a function', function() {
    beforeEach(function() {
      this.factory = function() {};
    });

    it('should not throw an error', function() {
      assert.doesNotThrow(this.container.register.bind(this.container, this.factory));
    });

    it('should return the container', function() {
      assert.equal(this.container.register(this.factory), this.container);
    });
  });

  describe('when given a string', function() {
    it('should throw an error', function() {
      assert.throws(this.container.register.bind(this.container, 'name'));
    });

    describe('and a value', function() {
      it('should not throw an error', function() {
        assert.doesNotThrow(this.container.register.bind(this.container, 'name', 'value'));
      });

      it('should return the container', function() {
        assert.equal(this.container.register('name', 'value'), this.container);
      });
    });
  });

  describe('when given something else', function() {
    it('should throw an error', function() {
      assert.throws(this.container.register.bind(this.container, null,      []));
      assert.throws(this.container.register.bind(this.container, undefined, []));
      assert.throws(this.container.register.bind(this.container, NaN,       []));
      assert.throws(this.container.register.bind(this.container, 12345,     []));
      assert.throws(this.container.register.bind(this.container, true,      []));
      assert.throws(this.container.register.bind(this.container, {},        []));
      assert.throws(this.container.register.bind(this.container, /name/,    []));
    });
  });
});

//   it('should accept a string', function() {})
//     assert.doesNotThrow(this.container.register.bind(this.container, this.factory));

//   it('should require a Function', function() {
//   });

//   it('should only accept a Function', function() {
//   });

//   describe('when registered', function() {
//     beforeEach(function() {
//       this.container.register(this.factory, [this.request, this.response]);
//     });

//     it('should be known via .has', function() {
//       assert(this.container.has(this.factory));
//     });

//     it('should be known via .owns', function() {
//       assert(this.container.owns(this.factory));
//     });

//     describe('and retrieved via .get', function() {
//       describe('with unregistered dependencies', function() {
//         it('should instantiate the factory', function() {
//           var actual    = this.container.get(this.factory);
//           var expected  = this.factory(this.request, this.response);

//           assert.deepEqual(actual, expected);
//         });

//         it('should return the same instance', function() {
//           assert.equal(this.container.get(this.factory), this.container.get(this.factory));
//         });

//         describe('via a child container', function() {
//           beforeEach(function() {
//             this.child = this.container.container();
//           });

//           it('should be known via .has', function() {
//             assert(this.child.has(this.factory));
//           });

//           it('should not be known via .owns', function() {
//             assert(!this.child.owns(this.factory));
//           });

//           it('should instantiate the factory', function() {
//             var actual    = this.child.get(this.factory);
//             var expected  = this.factory(this.request, this.response);

//             assert.deepEqual(actual, expected);
//           });

//           it('should return a different instance', function() {
//             var f1 = this.container.get(this.factory);
//             var f2 = this.child.get(this.factory);

//             assert.notEqual(f1, f2);
//             assert.deepEqual(f1, f2);
//           });
//         });
//       });

//       describe('with registered dependencies', function() {
//         beforeEach(function() {
//           this.container.register(this.request);
//           this.container.register(this.response);
//         });

//         it('should instantiate the factory & dependencies', function() {
//           var actual    = this.container.get(this.factory);
//           var expected  = this.factory(this.request(), this.response());

//           assert.deepEqual(actual, expected);
//         });

//         it('should return the same instance', function() {
//           assert.equal(this.container.get(this.factory), this.container.get(this.factory));
//         });

//         describe('via a child container', function() {
//           beforeEach(function() {
//             this.child = this.container.container();
//           });

//           it('should instantiate the factory & dependencies', function() {
//             var actual    = this.child.get(this.factory);
//             var expected  = this.factory(this.request(), this.response());

//             assert.deepEqual(actual, expected);
//           });

//           it('should return different instances', function() {
//             var f1  = this.container.get(this.factory);
//             var f2  = this.child.get(this.factory);

//             var d11 = this.container.get(this.request);
//             var d12 = this.child.get(this.request);

//             var d21 = this.container.get(this.response);
//             var d22 = this.child.get(this.response);

//             assert.notEqual(f1, f2);
//             assert.deepEqual(f1, f2);

//             assert.notEqual(d11, d12);
//             assert.deepEqual(d11, d12);

//             assert.notEqual(d21, d22);
//             assert.deepEqual(d21, d22);
//           });
//         });
//       });
//     });
//   });
// });
