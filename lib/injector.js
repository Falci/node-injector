module.exports = Injector;


var fileParser = require('./fileParser'),
    DepGraph   = require('dependency-graph').DepGraph;


function Injector(startPath, pathList) {
  this.graph    = new DepGraph();

  var raw = parseFiles(startPath, pathList);

  addNodes(this.graph, raw);
  addDeps(this.graph, raw);

  this.injected = inject(this.graph, raw);
}


function parseFiles(startPath, pathList) {
  var raw    = fileParser(startPath, pathList),
      result = {};

  for (var key in raw) {
    result[key] = {
      fn: raw[key],
      deps: parseFuncArgs(raw[key])
    };
  }

  return result;
}


function parseFuncArgs(fn) {
  var args = [];

  var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
  var FN_ARG_SPLIT = /,/;
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

  var fnText = fn.toString().replace(STRIP_COMMENTS, '');
  var raw = fnText.match(FN_ARGS)[1].split(FN_ARG_SPLIT);

  for (var i in raw) {
    var ele = raw[i].trim();
    if (ele.length) { args.push(ele); }
  }

  return args;
}


function addNodes(graph, obj) {
  for (var key in obj) {
    graph.addNode(key);

    obj[key].deps.map(function(dep) {
      graph.addNode(dep);
    });
  }
}


function addDeps(graph, obj) {
  for (var key in obj) {
    obj[key].deps.map(function(dep) {
      graph.addDependency(key, dep);
    });
  }
}


function inject(graph, obj) {
  var injected = {};

  graph
    .overallOrder()
    .map(function(node) {
      var args = [];

      for (var i in obj[node].deps) {
        args[i] = injected[obj[node].deps[i]];
      }

      injected[node] = obj[node].fn.apply({}, args);
    });

  return injected;
}
