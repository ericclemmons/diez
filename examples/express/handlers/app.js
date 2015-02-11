var diez    = require('../../../');
var React   = require('react');

var {
  Link,
  RouteHandler,
} = require('react-router');

var App = function(title) {
  return React.createClass({
    render: function() {
      return (
        <section>
          {this.renderHeader()}

          <RouteHandler />

          <hr />

          {this.renderFooter()}
        </section>
      );
    },

    renderHeader: function() {
      return (
        <nav className="navbar navbar-inverse navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <Link to="welcome" className="navbar-brand">
                Diez Express Example
              </Link>
            </div>
          </div>
        </nav>
      );
    },

    renderFooter: function() {
      return (
        <footer className="footer">
          <p className="text-center">
            &copy;
            &nbsp;
            <a href="https://github.com/ericclemmons/diez">
              ericclemmons/diez
            </a>
          </p>
        </footer>
    );
    },
  });
};

diez.register(App, ['title']);

module.exports = App;
