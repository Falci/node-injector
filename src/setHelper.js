var is = require('./is')
  , count = 0
  , key = '';


module.exports = setHelper;


function setHelper(fn, deps, raw) {
  if (!is.function(fn)) { throw new Error(fn.toString() + ' is not a function'); }
  if (!deps || !is.array(deps)) { deps = []; }

  if(!raw) { raw = this.raw; }

  count += 1;
  key = '__injector.helper.' + count;

  raw[key] = {
    type: 'helper',
    value: fn,
    deps: deps
  };
}
