var assert   = require("assert"),
    path     = require('path'),
    Injector = require('./../lib/injector');


describe('Inject modules', function() {
  var injector;

  it('check num of modules', function() {
    assert.equal(4, Object.keys(injector.store).length);
  });

  it('check dependency injection', function() {
    assert.equal(42, injector.get('exampleFunc')());
    assert.equal(90, injector.get('sum'));
  })

  beforeEach(function(done) {
    injector = new Injector();
    injector.fromFiles(path.join(__dirname, 'files'), ['folder', 'exampleFunc.js', '//sum.js']);
    done();
  });
});


describe('Errors', function() {
  it('show dublicate error', function() {
    assert.throws(
      function() {
        var injector = new Injector();
        injector.fromFiles(path.join(__dirname, 'files'), ['folder', 'dublicate', 'exampleFunc.js']);
      },
      /Dublicate filename/
    );
  });

  it('show loop error', function() {
    assert.throws(
      function() {
        var injector = new Injector();
        injector.fromFiles(path.join(__dirname, 'files', 'loop'));
      },
      /TypeError/
    );
  })
});
