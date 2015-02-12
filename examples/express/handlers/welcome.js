var diez  = require('../../../');
var React = require('react');

var Welcome = function(request) {
  return React.createClass({
    render() {
      return (
        <section>
          <div className="jumbotron">
            <div className="container">
              <h1>Welcome!</h1>

              <p>
                You're visiting from

                <code>
                  {request.ip}
                </code>

                with:

                <pre>
                  <code>
                    {request.get('User-Agent')}
                  </code>
                </pre>
              </p>

              <p>
                <small>
                  View the source :)
                </small>
              </p>
            </div>
          </div>

          <div className="container">
            <p>
              <em>
                These components are using per-<code>request</code> information injected via Diez.
              </em>
            </p>
          </div>
        </section>
      );
    }
  });
};

diez.register(Welcome, ['request']);

module.exports = Welcome;
