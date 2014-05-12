'use strict';

var Emitter = require('emitter');

/**
 * Expose `StepsCollection`.
 */

module.exports = StepsCollection;

/**
 * Initialize a new `StepsCollection`.
 *
 * @return {StepsCollection}
 * @api public
 */

function StepsCollection() {
  Emitter(this);
  this.models = [];
}

/**
 * Add a `StepModel` instance to the collection.
 *
 * @param {StepModel} model
 * @api public
 */

StepsCollection.prototype.add = function(model){
  this.models.push(model);
};