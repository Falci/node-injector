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
    setElements(result, iterate(p));
  });

  return result;
}


function iterate(path) {
  var result = {},
      names  = fs.readdirSync(path);

  names.map(function(name) {
    var concatPath = path + '/' + name,
        statFunc   = fs.statSync(concatPath);

    if (statFunc.isDirectory()) {
      var part = parser(concatPath);
      setElements(result, part);
    }

    if (statFunc.isFile()) {
      if (name.length - name.lastIndexOf('.js') !== 3) { return; }

      var obj = {},
          key = name.slice(0, name.lastIndexOf('.js')),
          fn  = require(concatPath);

      obj[key] = fn;

      setElements(result, obj);
    }
  });

  return result;
}


function setElements(result, from) {
  for (var key in from) {
    if (result[key] === from[key]) {
      throw new Error('Dublicate filename: ' + key);
    }

    result[key] = from[key];
  }
}
