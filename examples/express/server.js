require("6to5/register");

var app   = require('./app');
var diez  = require('../../');
var util  = require('util');

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.info('Express server listening on port %s (%s)', app.get('port'), app.get('env'));
});
