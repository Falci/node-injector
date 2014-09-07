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
  , rootDir  = __dirname
  , injector = new Injector(rootDir);

injector.add(answer, 42);
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
var injector = new Injector(rootDir)
```

```js
injector.load('foo/bar/**/*.js')
injector.load(['foo/bar/**/*.js', 'foo/bar/**/*.json'])
injector.load(basedir, ['foo/bar/**/*.js', 'foo/bar/**/*.json'])
```

```js
injector.set(key, value)
injector.setConst(key, value)
injector.setService(key, value, [deps])
```

```js
injector.get(key)
```

```js
injector.done()
```

```js
module.exports = function(dep1, dep2) {
  return {
    sum: dep1 + dep2
  }
}

module.exports['@name'] = 'anyNameSpace.moduleName'
module.exports['@inject'] = ['numbers.dep1', 'numbers.dep2']
```
