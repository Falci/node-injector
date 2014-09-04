var assert   = require('assert'),
    Injector = require('./../lib/injector');


describe('check raw addConst', function() {
  var injector;

  beforeEach(function(done) {
    injector = new Injector();
    done();
  });

  it('many adds', function() {
    injector.addConst('key', 'value');
    assert.deepEqual('value', injector.raw['key'].value);

    injector.addConst(12, 3);
    assert.deepEqual(3, injector.raw[12].value);

    injector.addConst([1,2], {});
    assert.deepEqual({}, injector.raw[[1,2]].value);

    injector.addConst({q:12}, [1,2,3]);
    assert.deepEqual([1,2,3], injector.raw[{q:12}].value);

    injector.addConst(0, undefined);
    assert.deepEqual(undefined, injector.raw[0].value);
  });

  it('error on dublicate const', function() {
    var key = 0, value = {q: 12};
    assert.throws(function() {
      injector.addConst(key, value);
      injector.addConst(key, value);
    });
  });
})
