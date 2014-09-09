var is = require('./is');


module.exports = setService;


function setService(key, fn, deps) {
  if (!deps || !is.array(deps)) { deps = []; }

  this.raw[key] = {
    type: 'service',
    value: fn,
    deps: deps
  };
}
