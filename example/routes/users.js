exports = module.exports = function(app, list, show) {
  app.get('/users', list);
  app.get('/users/:id', show);
};


module.exports['@inject'] = ['app', 'controllers.users.list', 'controllers.users.show'];
