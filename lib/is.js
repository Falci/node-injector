var fs = require('fs');


module.exports = {
  array:        isArray,
  directory:    isDirectory,
  file:         isFile,
  function:     isFunction,
  nativeObject: isNativeObject,
  object:       isObject,
};



function isArray(arg) {
  return arg instanceof Array;
}

function isNativeObject(arg) {
  return arg instanceof Object
}

function isObject(arg) {
  return isNativeObject(arg) && !isArray(arg);
}

function isDirectory(_path) {
  return fs.statSync(_path).isDirectory();
}

function isFile(_path) {
  return fs.statSync(_path).isFile();
}

function isFunction(arg) {
  return arg instanceof Function;
}
