var version = require('../package.json').version;
var stampit = require('stampit');

module.exports = stampit().state({
  parent:   null,
  version:  version,
});
