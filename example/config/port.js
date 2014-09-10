exports = module.exports = function(env) {
  if (env === 'development') {
    return 8080;
  }

  if (env === 'production') {
    return 80;
  }
};


exports['@name'] = 'config.port';
exports['@inject'] = ['config.env'];
