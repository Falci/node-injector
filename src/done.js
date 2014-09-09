module.exports = done;


var clone = require('clone'),
    DepGraph = require('dependency-graph').DepGraph,
    is = require('./is');


function done() {
  var raw = this.raw,
      lib = this.lib,
      graph = new DepGraph();

  addNodes(graph, this.raw);
  addDeps(graph, this.raw);

  graph
    .overallOrder()
    .map(function(node) {
      var ele = clone(raw[node]);

      switch (ele.type) {
      case 'atom':
        lib[node] = ele.value;
        break;
      case 'service':
        var args = ele.deps.map(function(dep) {
          return lib[dep];
        });
        lib[node] = ele.value.apply(null, args);
        break;
      }
    });

  this.raw = {};
}


function addNodes(graph, raw) {
  for (var key in raw) {
    graph.addNode(key);

    if (!raw[key].deps || !is.array(raw[key].deps)) { continue; }

    raw[key].deps.map(function(dep) {
      graph.addNode(dep);
    });
  }
}

function addDeps(graph, raw) {
  for (var key in raw) {
    if(!raw[key].deps || !is.array(raw[key].deps)) { return; }

    raw[key].deps.map(function(dep) {
      graph.addDependency(key, dep);
    });
  }
}
