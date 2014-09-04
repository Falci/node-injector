module.exports = function(key, value) {
  if (this.raw[key]) { throw new Error('Dont rewrite const!'); }

  this.raw[key] = {
    value: value,
    type: 'const',
  };
};
