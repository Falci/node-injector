exports = module.exports = function() {
  return function(req, res) {
    var users = [
      {id: 1, name: 'Joe'},
      {id: 2, name: 'Kevin'},
      {id: 3, name: 'Mark'},
    ];
    
    res.json(users);
  };
};


module.exports['@name'] = 'controllers.users.list';
module.exports['@inject'] = [];
