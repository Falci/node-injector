var assert   = require('assert'),
    Injector = require('./../lib/injector');


describe('check raw addFunc:', function() {
  var injector;

  beforeEach(function(done) {
    injector = new Injector();
    done();
  });


  it('key, value', function() {
    injector.addFunc('answer', function() { return 42; });

    assert.equal(true, injector.raw.answer.value instanceof Function);
    assert.deepEqual([], injector.raw.answer.deps);

    injector.addFunc('withDeps', function(dep1, dep2) { return dep1 + dep2; });

    assert.equal(true, injector.raw.withDeps.value instanceof Function);
    assert.deepEqual(['dep1', 'dep2'], injector.raw.withDeps.deps);
  });
});
