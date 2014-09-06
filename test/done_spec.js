var assert   = require('assert'),
    path     = require('path'),
    filesDir = path.join(__dirname, 'files'),
    Injector = require('./../lib/injector');


describe('check injector.done func:', function() {
  var injector;

  beforeEach(function(done) {
    injector = new Injector();
    done();
  });


  it('check', function() {
    injector.addPath(path.join(filesDir, 'folder'));
    injector.addPath(path.join(filesDir, 'exampleFunc'));
    injector.done();

    assert.equal(5 + 1, Object.keys(injector.prepared).length);  // +1: injector func

    assert.equal(42, injector.prepared.exampleFunc.value());
    assert.equal(50, injector.prepared.serviceA.value);
    assert.equal(30, injector.prepared.serviceD.value);
    assert.equal(12, injector.prepared.serviceB.value);
    assert.equal(16, injector.prepared.serviceC.value);
  });
});
