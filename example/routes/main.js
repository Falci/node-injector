exports = module.exports = function(app, ctrl) {
  app.get('/', ctrl);
};


module.exports['@name'] = 'routes.main';
module.exports['@inject'] = ['app', 'controllers.main'];
