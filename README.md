# Diez ![https://img.shields.io/npm/v/diez.svg](https://img.shields.io/npm/v/diez.svg?style=flat-square)

> Incredibly simple, Dependency Injection for isomorphic Javascript applications.

[![](https://img.shields.io/github/issues-raw/ericclemmons/diez.svg?style=flat-square)](https://github.com/ericclemmons/diez/issues)
[![](https://img.shields.io/travis/ericclemmons/diez/master.svg?style=flat-square)](https://travis-ci.org/ericclemmons/diez)
[![](https://img.shields.io/david/ericclemmons/diez.svg?style=flat-square)](https://david-dm.org/ericclemmons/diez#info=dependencies)
[![](https://img.shields.io/david/dev/ericclemmons/diez.svg?style=flat-square)](https://david-dm.org/ericclemmons/diez#info=devDependencies)


## The Problem

When using libraries such as [React][1], [React Router][2], & [RefluxJS][3],
you'll find that **singletons don't work well on the server-side**
for Actions, Routes, Stores, & Views, as they share state between all requests.

_On the client-side, each user's browser serves as a container to scope
functions.  Similarly, Diez introduces a container for each request on the server._


## The Solution

Luckily, all it takes is to turn your _singletons_ into _factories_ by wrapping
them with `function(...) { return ...; }` & registering them via `diez.register`.

Diez will retrieve them while **isolating instances to a single container-per-request**.


### Example

- [Server-side React with Diez & Express][4]


### Getting Started

Suppose you're rendering your [React][1] view on the server with [React Router][2],
but rely on `request`-specific data, such as the user's `ip`, for some reason.


#### Step 1 - Create a container per request

In your application middleware:

```javascript
// server.js
app.use(function(req, res, next) {
  // This container & it's references are sandboxed to this request.
  req.container = diez.container();
  req.container.register('request', req);
});
```

Now, every call to `req.container.get('request')` returns `req`.


#### Step 2 - Inject [React][1] components with dependencies

**Before**, your view is a singleton:

```javascript
// MyView.js
var MyView = React.createClass({
  render: function() {
    <p>
      Hello!
    </p>
  }
});

module.exports = MyView;
```

**After**, your view is a factory with dependencies defined:

```javascript
// MyView.js
var diez = require('diez');

// Convert singleton to factory
var MyView = function(request) {
  return React.createClass({
    render: function() {
      <p>
        Hello, {request.ip}!
      </p>
    }
  });
};

// Register component with dependencies
diez.register(MyView, ['request']);

module.exports = MyView;
```


#### Step 3 - Retrieve instances of components from container

```javascript
app.get('/', function(req, res) {
  // Get instantiated MyView with dependencies injected
  var component = req.container.get(MyView);
  var element   = React.createElement(view);

  res.send(React.renderToString(element));
});
```

That's it!

## [License][5]

> The MIT License (MIT)
>
> Copyright (c) 2015 Eric Clemmons
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.


[1]: http://facebook.github.io/react/
[2]: https://github.com/rackt/react-router
[3]: https://github.com/spoike/refluxjs/
[4]: https://github.com/ericclemmons/diez/tree/master/examples/express
[5]: https://github.com/ericclemmons/diez/blob/master/LICENSE
