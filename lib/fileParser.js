module.exports = parser;


var fs   = require('fs'),
    path = require('path');


function parser(startPath, pathList) {
  if (!pathList) {
    return iterate(startPath);
  }

  var result = {};

  pathList.map(function(p) {
    p = path.join(startPath, p);
    setElements(result, iterate(p, result));
  });

  return result;
}


function iterate(path, result) {
  if (fs.statSync(path).isFile()) {
    var i = path.lastIndexOf('/');
    setElements(result, parseFile(path, path.slice(i+1)));
    return;
  }


  var names  = fs.readdirSync(path);

    // console.log(names)
  names.map(function(name) {
    var concatPath = path + '/' + name,
        statFunc   = fs.statSync(concatPath);

    if (statFunc.isDirectory()) {
      var part = iterate(concatPath, result);
      setElements(result, part);
    }

    if (statFunc.isFile()) {
      setElements(result, parseFile(concatPath, name));
    }
  });
}


function setElements(result, from) {
  for (var key in from) {
    if (result[key] && from[key]) {
      throw new Error('Dublicate filename: ' + key);
    }

    result[key] = from[key];
  }
}


function parseFile(path, name) {
  if (name.length - name.lastIndexOf('.js') !== 3) { return; }

  var obj = {},
      key = name.slice(0, name.lastIndexOf('.js')),
      fn  = require(path);

  obj[key] = fn;

  return obj;
}
