module.exports = function(moduleName) {
  var module = require(moduleName);
  this.raw[moduleName] = { type: 'module', value: module };
};
