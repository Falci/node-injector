var DepGraph = require('dependency-graph').DepGraph;

module.exports = Injector;


function Injector(init) {
  this.graph = new DepGraph();

  // this.raw[key].type: 'fn', 'const', 'var', 'module'
  // this.raw[key].value: anything
  // this.raw[key].deps: ['depName']
  this.raw = {};
  this.prepared = {};
}


/* @params: key, value */
Injector.prototype.addConst = require('./addConst');

/* @params: key, value */
Injector.prototype.addFunc = require('./addFunc');

/* @params: moduleName */
Injector.prototype.addModule = require('./addModule');

/* @params: options - {recursion: bool, pass: ['key']} */
Injector.prototype.addPath = require('./addPath');

/* @params: key, value */
Injector.prototype.addVar = require('./addVar');


// Injector.prototype.config = function(configObj) {};


Injector.prototype.done = require('./done');


// Injector.prototype.init = function() {};

/* @params: key */
Injector.prototype.get = require('./get');


// Injector.prototype.set = function() {};
