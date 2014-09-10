"use strict";

var fs = require('fs');

module.exports.array = function isArray(arg) {
  return arg instanceof Array;
};

module.exports.nativeObject = function isNativeObject(arg) {
  return arg instanceof Object
};

module.exports.object = function isObject(arg) {
  return isNativeObject(arg) && !isArray(arg);
};

module.exports.directory = function isDirectory(_path) {
  try {
    return fs.statSync(_path).isDirectory();
  } catch (e) {
    return false;
  }
};

module.exports.file = function isFile(_path) {
  try {
    return fs.statSync(_path).isFile();
  } catch (e) {
    return false;
  }
};

module.exports.function = function isFunction(arg) {
  return arg instanceof Function;
};

module.exports.string = function(arg) {
  return typeof arg === 'string';
};
