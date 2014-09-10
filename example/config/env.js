exports = module.exports = function() {
  return process.env.NODE_ENV || 'development';
};


exports['@name'] = 'config.env';
