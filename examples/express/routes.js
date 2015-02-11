var diez  = require('../../');
var React = require('react');

var App     = require('./handlers/app');
var Welcome = require('./handlers/welcome');

var {
  Route,
  DefaultRoute
} = require('react-router');

module.exports = diez.register(function(App, Welcome) {
  return (
    <Route handler={App} path="/">
      <DefaultRoute name="welcome" handler={Welcome} />
    </Route>
  );
}, [App, Welcome]);
