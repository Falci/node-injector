var fs = require('fs');


module.exports = Injector;


function Injector(rootPath) {
  this.lib = {};

  this.parseFiles(rootPath + '/services');
}


Injector.prototype.configure = function() {};


Injector.prototype.checkDependencies = function() {};


Injector.prototype.prepareDependencies = function() {};


Injector.prototype.parseFuncArgs = function(fn) {
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
};


Injector.prototype.call = function(fn) {
  var lib = this.lib,
      argsNames = this.parseFuncArgs(fn);

  var args = argsNames.map(function(name) {
    if (!lib[name]) {
      throw new Error('undefined function param: ' + name);
    }

    return lib[name];
  });


  return fn.apply({}, args);
};


Injector.prototype.set = function(obj) {
  for (var key in obj) {
    this.lib[key] = obj[key];
  }
}


Injector.prototype.parseFiles = function(path, options) {
  var injector = this,
      names    = fs.readdirSync(path);

  names.map(function(name) {
    var concatPath = path + '/' + name,
        statFunc   = fs.statSync(concatPath);

    if (statFunc.isDirectory()) {
      injector.parseFiles(concatPath, options);
    }

    if (statFunc.isFile()) {
      if (name.length - name.lastIndexOf('.js') !== 3) { return; }

      var obj = {},
          key = name.slice(0, name.lastIndexOf('.js')),
          fn  = require(concatPath);

      obj[key] = fn;

      injector.set(obj);
    }
  });
}
