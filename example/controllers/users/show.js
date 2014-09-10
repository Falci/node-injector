exports = module.exports = function() {
  return function(req, res) {
    var users = {
      1: {id: 1, name: 'Joe'},
      2: {id: 2, name: 'Kevin'},
      3: {id: 3, name: 'Mark'},
    };

    res.json(users[req.param('id')] || 'user not found');
  };
};


module.exports['@name'] = 'controllers.users.show';
module.exports['@inject'] = [];
