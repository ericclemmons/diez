Diez
====

> Incredibly simple, Dependency Injection for isomorphic Javascript applications.

## The Problem

When using libraries such as [React][1], [React Router][2], & [RefluxJS][3],
you'll find that **singletons don't work well on the server-side**
for Actions, Routes, Stores, & Views, as they share state between all requests.

_On the client-side, each user's browser serves as a container to scope
functions.  Similarly, Diez introduces a container for each request on the server._


## The Solution

Luckily, all it takes is to turn your _singletons_ into _factories_ by wrapping
them with `function(...) { return ...; }`.

Diez will retrieve them while **isolating instances to a single container-per-request**.


### Getting Started

Suppose you're using [React Router][2] and have a `routes.jsx` file:

```javascript
var App   = require('./handlers/app');
var Home  = require('./handlers/home');

var Routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="home" handler={Home} />
  </Route>
);

module.exports = Routes;
```

`Routes` is currently shared across all server-side requests, as well as all
dependencies therein.

Instead, convert `Routes` from a _singleton_ into a _factory_ and use `diez.inject`
to specify the (default) dependencies:

```javascript
var diez  = require('diez');
var App   = require('./handlers/app');
var Home  = require('./handlers/home');

var Routes = function(App, Home) {
  return (
    <Route handler={App} path="/">
      <DefaultRoute name="home" handler={Home} />
    </Route>
  );
};

diez.inject(Routes, [App, Home]);

module.exports = Routes;
```

This is an incredibly common way of writing libraries (e.g. `express`, `koa`, etc.)
for scoped consumption, but pushing the dependency requirements onto the consumer
is burdensome without the use of a container to resolve them.

Still, in even _fewer_ lines of code:

```javascript
var diez  = require('diez');
var App   = require('./handlers/app');
var Home  = require('./handlers/home');

module.exports = diez.inject(function Routes(App, Home) {
  return (
    <Route handler={App} path="/">
      <DefaultRoute name="home" handler={Home} />
    </Route>
  );
}, [App, Home]);
```

Now that our routes are turned into container-aware factories,
let's modify how the server's _middleware_ uses this.

Instead of:

```javascript
app
  .use(function *(next) {
    Router.create({
      routes:   Routes, // Singleton! Oh noooos!
      location: this.url,
    }).run(function(Handler, state) {
      ...
    });
  })
;
```

Get the `Routes` from a `container`:

```javascript
app
  .use(function *(next) {
    this.container = diez.container();
  })
  .use(function *(next) {
    Router.create({
      routes:   this.container.get(Routes),
      location: this.url,
    }).run(function(Handler, state) {
      ...
    });
  })
;
```

This container isolates the scope of all returned objects (& their dependencies)
from other containers.


### Examples


#### Using Diez as a Middleware

The ideal use for Diez is as a _container_ to isolate scope between requests
on the server, just as they are in the browser on the client.

```javascript
var app     = require('koa')(); // or Express
var MyStore = require('./stores/my.store');

app
  .use(function *(next) {
    this.container = diez.container();
    yield next;
  })
  // ... some other middleware & events take place ...
  .use(function *(next) {
    this.body = this.container.get(MyStore).getStuffForSession(...);
  })
;
```


#### Using Diez With Other Libraries

There's really no reason to use Diez to retrieve non-injected modules, but it
just shows that it's _safe_ to do so.

The following are all equivalent:

```javascript
var myObj = { 'foo': true, 'bar': false };

myObj === diez.get(myObj);
```

```javascript
var express = require('express');

var app = express();
// or
diez.get(express)();
```

```javascript
var knex = require('knex');

var db = knex('table_name');
// or
var db = diez.get(knex)('table_name');
```

#### Dynamic API URLs with Diez

An application API may be <https://example.com/api/whatever> on the client-side, but
internally can be anything, such as <http://localhost:3000>, therefore API services
can't have hard-coded URLs or Hostnames as a result.

One solution is to code your services to utilize Diez and inject them with
a URL prefix:

```javascript
var diez = require('diez');

var MyService = function(prefix) {
  return {
    find: function(id) {
      return request.get(`${prefix}/api/whatever/${prefix}`);
    }
  };
};

diez.inject(MyService, ['api.prefix']);

module.exports = MyService;
```

Then, in a middleware of your application:

```javascript
var app   = require('koa')();
var diez  = require('diez');
var util  = require('util');

app
  .use(function *(next) {
    this.container = diez.container();
    yield next;
  })
  .use(function *(next) {
    this.container.set('api.prefix', url.format({
      host:     this.host,
      port:     this.port,
      protocol: this.protocol,
    })); // http://localhost:3000/

    yield next;
  })
  // ... some other middleware & events take place ...
  .use(function *(next) {
    this.body = yield this.container.get(MyService).find(1);
  })
;
```

This way, the `MyService` will correctly request <http://localhost:3000/api/whatever/1>
on the server, and <http://example.com/api/whatever/1> on the client.


#### Removing Diez as a Code Smell

The consuming application shouldn't be required to be aware of Diez to use your
library.

Therefore, it's recommended that you export a factory with your defaults:

```javascript
var diez  = require('diez');
var App   = require('./handlers/app');
var Home  = require('./handlers/home');

var Routes = function(App, Home) {
  return (
    <Route handler={App} path="/">
      <DefaultRoute name="home" handler={Home} />
    </Route>
  );
};

diez.inject(Routes, [App, Home]);

module.exports          = Routes;
module.exports.factory  = diez.factory(Routes);
```

Now any consuming services instead use `Routes.factory()` without depending on `diez`.


### Testing with Diez

Suppose you have a service that depends on an HTTP library for making requests:

```javascript
var diez    = require('diez');
var request = require('superagent');

var MyService = function(http) {
  return { ... };
};

diez.inject(MyService, request);

module.exports = MyService;
```

The vanilla way to do this would be:

```javascript
var MyService = require('./my-service');

describe('my test', function() {
  it('should use a mock', function() {
    var http = // Sinon or similar
    var mock = MyService(http);

    // Test the mock...
  });
});
```

Alternatively, you can create a new container to override the dependencies:

```javascript
var diez      = require('diez');
var MyService = require('./my-service');

describe('my test', function() {
  var container = diez.container();
  var http      = // Sinon or similar

  container.inject(MyService, [http])

  it('should use a mock', function() {
    var mock = container.get(MyService);

    // Test the mock...
  });
});
```

[1]: http://facebook.github.io/react/
[2]: https://github.com/rackt/react-router
[3]: https://github.com/spoike/refluxjs/
