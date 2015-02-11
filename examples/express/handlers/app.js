var diez  = require('../../../');
var React = require('react');

var {
  Link,
  RouteHandler,
} = require('react-router');

var App = React.createClass({
  render() {
    return (
      <section>
        {this.renderHeader()}

        <RouteHandler />

        <hr />

        {this.renderFooter()}
      </section>
    );
  },

  renderHeader() {
    return (
      <nav className="navbar navbar-inverse navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <Link to="welcome" className="navbar-brand">
              Server-side React with Diez & Express
            </Link>
          </div>
        </div>
      </nav>
    );
  },

  renderFooter() {
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

module.exports = App;
