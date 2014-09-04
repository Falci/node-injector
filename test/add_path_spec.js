var assert   = require('assert'),
    path     = require('path'),
    filesDir = path.join(__dirname, 'files'),
    Injector = require('./../lib/injector');


describe('check raw: add path: ', function() {
  var injector;

  beforeEach(function(done) {
    injector = new Injector();
    done();
  });

  it('default', function() {
    injector.addPath(path.join(filesDir, 'folder'));

    assert.equal(4, Object.keys(injector.raw).length);

    assert.equal(true, injector.raw['serviceA'].value instanceof Function);
    assert.equal(true, injector.raw['serviceB'].value instanceof Function);
    assert.equal(true, injector.raw['serviceC'].value instanceof Function);
    assert.equal(true, injector.raw['serviceD'].value instanceof Function);

    assert.deepEqual(['exampleFunc'], injector.raw['serviceA'].deps);
    assert.deepEqual(['exampleFunc', 'serviceD'], injector.raw['serviceB'].deps);
    assert.deepEqual(['serviceB'], injector.raw['serviceC'].deps);
    assert.deepEqual(['serviceA'], injector.raw['serviceD'].deps);
  });

  it('recursion false', function() {
    injector.addPath(path.join(filesDir, 'folder'), {recursion: false});

    assert.equal(2, Object.keys(injector.raw).length);

    assert.equal(true, injector.raw['serviceA'].value instanceof Function);
    assert.equal(true, injector.raw['serviceC'].value instanceof Function);

    assert.deepEqual(['exampleFunc'], injector.raw['serviceA'].deps);
    assert.deepEqual(['serviceB'], injector.raw['serviceC'].deps);
  });

  it('pass fileName', function() {
    injector.addPath(path.join(filesDir, 'folder'), {pass: ['serviceB']});

    assert.equal(3, Object.keys(injector.raw).length);

    assert.equal(true, injector.raw['serviceA'].value instanceof Function);
    assert.equal(true, injector.raw['serviceC'].value instanceof Function);
    assert.equal(true, injector.raw['serviceD'].value instanceof Function);

    assert.deepEqual(['exampleFunc'], injector.raw['serviceA'].deps);
    assert.deepEqual(['serviceB'], injector.raw['serviceC'].deps);
    assert.deepEqual(['serviceA'], injector.raw['serviceD'].deps);
  });
});
