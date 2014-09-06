var clone = require('clone');

module.exports = function(key) {
  var ele = this.prepared[key];

  if (ele.type === 'const') { return clone(ele.value); }

  return ele.value;
}
