var is = require('./is'),
    fs = require('fs'),
    parsePath = require('parse-filepath'),
    parseFuncArgs = require('./parseFuncArgs');


/** @params:
 *    path: string
 *    options.recursion: bool, default: true
 *    options.pass: ['key'], default: [];
 */
module.exports = function(path, options) {
  if (!options) {
    options = {
      recursion: true,
      pass: []
    };
  }

  if(options.recursion === undefined) { options.recursion = true; }

  if(!options.pass || !is.array(options.pass)) { options.pass = []; }

  iterate(this.raw, path, options);
};


function iterate(raw, path, options) {
  if (is.file(path)) {
    addFile(raw, path, options);
  }

  if (is.directory(path)) {
    var names  = fs.readdirSync(path);

    names.map(function(name) {
      var newPath = path + '/' + name;

      if (is.directory(newPath) && options.recursion === false) { return; }

      iterate(raw, newPath, options);
    });
  }
}

function addFile(raw, path, options) {
  var pathInfo = parsePath(path);

  if ( (options.pass.indexOf(pathInfo.basename) !== -1) || (options.pass.indexOf(pathInfo.name) !== -1) ) { return; }

  var required = require(path);

  if (is.function(required)) {
    raw[pathInfo.name] = { type: 'fn', value: required, deps: parseFuncArgs(required) };
  } else {
    raw[pathInfo.name] = { type: 'var', value: required };
  }
}
