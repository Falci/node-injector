module.exports = set;


function set(key, value) {
  this.raw[key] = {
    type: 'atom',
    value: value
  };
}
