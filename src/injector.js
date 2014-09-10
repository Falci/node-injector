var is = require('./is');


module.exports = Injector;


function Injector(rootPath) {
  this.rootPath = is.string(rootPath) ? rootPath : '';
  this.raw = {};  // raw struct: key => type ('service' || 'atom'), value, deps
  this.lib = {};  // key->value prepared struct. initialized on injector.done()
}

Injector.prototype.done = require('./done');

Injector.prototype.get = require('./get');

Injector.prototype.load = require('./load');

Injector.prototype.set = require('./set');

Injector.prototype.setService = require('./setService');
