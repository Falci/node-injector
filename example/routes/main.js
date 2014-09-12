exports = module.exports = function(app, ctrl) {
  app.get('/', ctrl);
};


module.exports['@inject'] = ['app', 'controllers.main'];
