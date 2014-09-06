var clone = require('clone'),
    is = require('./is');

module.exports = function() {
  this.prepared.injector = { type: 'fn', value: this };

  addNodes(this.graph, this.raw);
  addDeps(this.graph, this.raw);

  prepare(this);
}


function addNodes(graph, raw) {
  for (var key in raw) {
    graph.addNode(key);

    raw[key].deps.map(function(dep) {
      graph.addNode(dep);
    });
  }
}


function addDeps(graph, raw) {
  for (var key in raw) {
    if(!raw[key].deps) { return; }

    raw[key].deps.map(function(dep) {
      graph.addDependency(key, dep);
    });
  }
}


function prepare(injector) {
  injector
    .graph
    .overallOrder()
    .map(function(node) {
      var ele = injector.raw[node];

      switch (ele.type) {
      case 'var':
        injector.prepared[node] = { type: ele.type, value: ele.value };
        break;
      case 'const':
        injector.prepared[node] = { type: ele.type, value: ele.value };
        break;
      case 'module':
        injector.prepared[node] = { type: ele.type, value: ele.value };
        break;
      case 'fn':
        var args = ele.deps.map(function(dep) {
          var prepared = injector.prepared[dep].value;
          if (injector.raw[dep].type === 'const') { prepared = clone(prepared); }
          return prepared;
        });
        injector.prepared[node] = { type: ele.type, value: ele.value.apply({}, args) };
        break;
      }
  });
}
