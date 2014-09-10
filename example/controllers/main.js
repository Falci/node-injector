exports = module.exports = function() {
  return function(req, res) {
    res.send('Hello from main controller. Also works: <b>GET /users</b>, <b>GET /users/:id</b>');
  };
};


module.exports['@name'] = 'controllers.main';
module.exports['@inject'] = [];
