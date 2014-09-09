node-injector
=================

```js
npn install --save node-injector
```

Usage
---------
app.js:
```js
var Injector = require('node-injector')
  , rootPath  = __dirname
  , injector = new Injector(rootPath);

injector.set('answer', 42);
injector.load('services/*.js');
injector.done(); // preparing

injector.get('service.answer') === 'answer is 42'  // true
```

services/printAnswer.js:
```js
module.exports = function(numberAnswer) {
  var str = 'answer is ' + numberAnswer;
  return str;
};

module.exports['@name'] = 'service.answer';
module.exports['@inject'] = ['answer'];
```


API
---------

```js
var injector = new Injector(rootPath)
```

```js
injector.load('foo/bar/**/*.js')
injector.load(['foo/bar/**/*.js', 'foo/bar/**/*.json'])
injector.load(['foo/bar/**/*.js', 'foo/bar/**/*.json'], {basePath: 'app/baz'})
```

```js
injector.set(key, value)
injector.setService(key, value, ['dep1', 'dep2', 'depN'])
```

```js
injector.get(key)
```

```js
injector.done()
```

```js
module.exports = function(dep1, dep2) {
  // ...
  // return anything - object, fn, etc
}

module.exports['@name'] = 'anyNameSpace.moduleName'
module.exports['@inject'] = ['dep1', 'foo.dep2']
```
