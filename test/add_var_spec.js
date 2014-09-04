var assert   = require('assert'),
    Injector = require('./../lib/injector');


describe('check raw: addVar', function() {
  var injector;

  beforeEach(function(done) {
    injector = new Injector();
    done();
  });

  it('many adds', function() {
    injector.addVar('key', 'value');
    assert.deepEqual('value', injector.raw['key'].value);

    injector.addVar(12, 3);
    assert.deepEqual(3, injector.raw[12].value);

    injector.addVar([1,2], {});
    assert.deepEqual({}, injector.raw[[1,2]].value);

    injector.addVar({q:12}, [1,2,3]);
    assert.deepEqual([1,2,3], injector.raw[{q:12}].value);

    injector.addVar(0, undefined);
    assert.deepEqual(undefined, injector.raw[0].value);
  });

  it('rewrite variable', function() {
    var key = 'its key;'

    injector.addVar(key, 12);
    assert.equal(12, injector.raw[key].value);

    injector.addVar(key, 'qwerty');
    assert.equal('qwerty', injector.raw[key].value);
  });
})
