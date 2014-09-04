var assert   = require('assert'),
    Injector = require('./../lib/injector');


describe('check raw addModule:', function() {
  var injector;

  beforeEach(function(done) {
    injector = new Injector();
    done();
  });


  it('add module', function() {
    injector.addModule('path');
    assert.equal(true, injector.raw.path.value !== undefined);
    assert.equal('module', injector.raw.path.type);
  });

  it('add wrong module', function() {
    assert.throws(function() {
      injector.addModule('blablabla');
    });
  });
});
