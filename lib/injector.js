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


Injector.prototype.config = function(configObj) {};


Injector.prototype.done = require('./done');


Injector.prototype.init = function() {};


Injector.prototype.get = function() {};


Injector.prototype.set = function() {};























// function Injector(startPath, pathList) {
//   this.graph    = new DepGraph();
//   this.store = {};
// }
//
//
// Injector.prototype.get = function(key) {
//   return this.store[key];
// };
//
// Injector.prototype.set = function(key, value) {
//   this.store[key] = value;
// };
//
//
// Injector.prototype.fromFiles = function(startPath, pathList) {
//   var raw = parseFiles(startPath, pathList);
//
//   addNodes(this.graph, raw);
//   addDeps(this.graph, raw);
//
//   var hash = inject(this.graph, raw);
//
//   for (var key in hash) {
//     this.store[key] = hash[key];
//   }
// };
//
//
// function parseFiles(startPath, pathList) {
//   var raw    = fileParser(startPath, pathList),
//       result = {};
//
//   for (var key in raw) {
//     result[key] = {
//       fn: raw[key],
//       deps: parseFuncArgs(raw[key])
//     };
//   }
//
//   return result;
// }
//
//
// function parseFuncArgs(fn) {
//   var args = [];
//
//   var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
//   var FN_ARG_SPLIT = /,/;
//   var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
//
//   var fnText = fn.toString().replace(STRIP_COMMENTS, '');
//   var raw = fnText.match(FN_ARGS)[1].split(FN_ARG_SPLIT);
//
//   for (var i in raw) {
//     var ele = raw[i].trim();
//     if (ele.length) { args.push(ele); }
//   }
//
//   return args;
// }
//
//
// function addNodes(graph, obj) {
//   for (var key in obj) {
//     graph.addNode(key);
//
//     obj[key].deps.map(function(dep) {
//       graph.addNode(dep);
//     });
//   }
// }
//
//
// function addDeps(graph, obj) {
//   for (var key in obj) {
//     obj[key].deps.map(function(dep) {
//       graph.addDependency(key, dep);
//     });
//   }
// }
//
//
// function inject(graph, obj) {
//   var injected = {};
//
//   graph
//     .overallOrder()
//     .map(function(node) {
//       var args = [];
//
//       for (var i in obj[node].deps) {
//         args[i] = injected[obj[node].deps[i]];
//       }
//
//       injected[node] = obj[node].fn.apply({}, args);
//     });
//
//   return injected;
// }
