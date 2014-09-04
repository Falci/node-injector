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
  try {
    return fs.statSync(_path).isDirectory();
  } catch (e) {
    return false;
  }
}

function isFile(_path) {
  try {
    return fs.statSync(_path).isFile();
  } catch (e) {
    return false;
  }
}

function isFunction(arg) {
  return arg instanceof Function;
}
