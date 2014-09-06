var assert   = require('assert'),
    Injector = require('./../lib/injector');


describe('check injector.get()', function() {
  var injector;

  beforeEach(function(done) {
    injector = new Injector();
    done();
  });

  it('check', function() {
    injector.addVar('number', 42);

    injector.addFunc('x2', function(number) {
      return number * 2;
    });

    injector.addFunc('x2fn', function(number) {
      return function() { return number * 2; };
    });

    injector.done();

    assert.equal(42, injector.get('number'));
    assert.equal(84, injector.get('x2'));
    assert.equal(84, injector.get('x2fn')());
  });
});
