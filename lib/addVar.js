module.exports = function(key, value) {
  this.raw[key] = {
    value: value,
    type: 'var',
  };
};
