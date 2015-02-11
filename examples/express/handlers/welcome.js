var diez  = require('../../../');
var React = require('react');

module.exports = diez.register(function(request) {
  var Welcome = React.createClass({
    render() {
      return (
        <header>
          <h1>{'Howdy'}</h1>
        </header>
      );
    }
  });

  return Welcome;
}, ['request']);
