'use strict';

var Emitter = require('emitter');

/**
 * Expose `StepModel`.
 */

module.exports = StepModel;

/**
 * Initialize a new `StepModel` with the given `opts`.
 *
 * @param {Object} opts
 * @return {StepModel}
 * @api public
 */

function StepModel(opts) {
  Emitter(this);
  opts = opts || {};
  this.set(opts);
}

/**
 * Set `attr` to `val`.
 *
 * @param {Object|String} attr
 * @param {any} val
 * @api public
 */

StepModel.prototype.set = function(attr, val) {
  var attrs;
  
  if (typeof attr === 'object') {
    attrs = attr;
  } else {
    attrs = {};
    attrs[attr] = val;
  }

  Object.keys(attrs).forEach(function(key){
    var val = attrs[key];
    if (this[key] !== val) {
      this[key] = attrs[key];
      this.emit('change:' + key, val);
    }
  }, this);

};

/**
 * Get `attr` value.
 *
 * @param {String} attr
 * @return {any}
 * @api public
 */

StepModel.prototype.get = function(attr){
  return this[attr];
};