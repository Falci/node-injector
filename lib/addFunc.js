var parseFuncArgs = require('./parseFuncArgs');

module.exports = function(key, fn) {
  this.raw[key] = { type: 'fn', value: fn, deps: parseFuncArgs(fn) };
};
