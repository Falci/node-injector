var express = require('express'),
    app = express(),
    Injector = require('./../src/injector'),
    injector = new Injector(__dirname);


injector.set('express', express);
injector.set('app', app);
injector.load([
  'config/*.js',
  'controllers/**/*.js',
  'routes/*.js'
]);
injector.done();

app.listen(injector.get('config.port'), function() {
  console.log('server started on ' + injector.get('config.port') + ' port');
  console.log('environment: ' + injector.get('config.env'));
});
