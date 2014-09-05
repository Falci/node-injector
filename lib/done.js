var clone = require('clone'),
    is = require('./is');

module.exports = function() {
  this.raw.injector = { type: 'fn', value: this, deps: [] };

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
      var ele = injetor.raw[node];

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
          dep = injector.prepared[dep].value;
          if (injector.raw[dep].type === 'const') { dep = clone(dep); }
          return dep;
        });

        injector.prepared[node] = { type: ele.type, value: ele[node].value.apply({}, args) };
        break;
      }
  });
}
