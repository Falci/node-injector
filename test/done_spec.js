var assert   = require('assert'),
    Injector = require('./../lib/injector');


describe('check injector.done func:', function() {
  var injector;

  beforeEach(function(done) {
    injector = new Injector();
    done();
  });


  it('check', function() {
    throw new Error('failed');
  });
});
