var assert   = require("assert"),
    path     = require('path'),
    Injector = require('./../lib/injector');


describe('Inject modules', function() {
  var injector;

  it('check num of modules', function() {
    assert.equal(4, Object.keys(injector.injected).length);
  });

  it('check dependency injection', function() {
    assert.equal(42, injector.injected.exampleFunc());
    assert.equal(90, injector.injected.sum);
  })

  beforeEach(function(done) {
    injector = new Injector(path.join(__dirname, 'files'), ['folder', 'exampleFunc.js', '//sum.js']);
    done();
  });
});


describe('Errors', function() {
  it('show dublicate error', function() {
    assert.throws(
      function() {
        new Injector(path.join(__dirname, 'files'), ['folder', 'dublicate', 'exampleFunc.js']);
      },
      /Dublicate filename/
    );
  });

  it('show loop error', function() {
    assert.throws(
      function() {
        new Injector(path.join(__dirname, 'files', 'loop'));
      },
      /TypeError/
    );
  })
});
