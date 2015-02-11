var diez  = require('../../');
var React = require('react');

var App     = require('./handlers/app');
var Welcome = require('./handlers/welcome');

var {
  Route,
  DefaultRoute
} = require('react-router');

var Routes = function(App, Welcome) {
  return (
    <Route handler={App} path="/">
      <DefaultRoute name="welcome" handler={Welcome} />
    </Route>
  );
};

diez.register(Routes, [App, Welcome]);

module.exports = Routes;
