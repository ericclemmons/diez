var diez    = require('../../../');
var React   = require('react');

var {
  RouteHandler,
} = require('react-router');

module.exports = diez.register(function(title) {
  var App = React.createClass({
    render() {
      return (
        <div>
          <h1>{title}</h1>

          <RouteHandler />
        </div>
      );
    }
  });

  return App;
}, ['title']);
