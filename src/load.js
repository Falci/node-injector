var path = require('path'),
    parsePath = require('parse-filepath'),
    glob = require('glob'),
    is = require('./is'); // ?


module.exports = load;


/**
 *  @function load
 *
 *  @param templates string || [string]
 *  @param options {basePath: string}
 */
function load(templates, options) {
  var rootPath = this.rootPath,
      setService = this.setService,
      basePath = (options && is.string(options.pasePath)),
      pathList = [];

  if (is.string(templates)) { templates = [templates]; }
  if (!is.array(templates)) { return; }

  templates = templates.map(function(template) {
    return path.join(rootPath, basePath, template);
  });

  templates.map(function(template) {
    glob.sync(template).map(function(ele) {
      pathList.push(ele);
    });
  });

  pathList.map(function(ele) {
    var fn = require(ele),
        name = fn['@name'] || parsePath(ele).basename,
        deps = fn['@deps'] || [];

    setService(name, fn, deps);
  });
}
