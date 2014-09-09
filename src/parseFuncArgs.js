module.exports = function(fn) {
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
}
