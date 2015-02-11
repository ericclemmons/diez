var diez  = require('../../../');
var React = require('react');

var Welcome = function(request, url) {
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
                <a href={url} target="_blank" className="btn btn-success">
                  View Source
                </a>
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

diez.register(Welcome, ['request', 'url']);

module.exports = Welcome;
