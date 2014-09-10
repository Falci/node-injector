var is = require('./is');


module.exports = setService;


function setService(key, fn, deps, raw) {
  if (!deps || !is.array(deps)) { deps = []; }

  if(!raw) { raw = this.raw; }

  raw[key] = {
    type: 'service',
    value: fn,
    deps: deps
  };
}
