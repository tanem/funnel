'use strict';

var extend = require('extend');
var domify = require('domify');
var query = require('query');
var funnelTemplate = require('../templates/funnel.html');
var StepsCollection = require('./stepsCollection');
var StepModel = require('./stepModel');
var StepView = require('./stepView');
var viewUtils = require('./viewUtils');

/**
 * Expose `Funnel`.
 */

module.exports = Funnel;

/**
 * Initialize a new `Funnel`.
 *
 * @return {Funnel}
 * @api public
 */

function Funnel(){
  this.el = domify(funnelTemplate);
  this.nameEl = query('.js-funnel-name', this.el);
  this.listEl = query('.js-funnel-list', this.el);
  this.completionEl = query('.js-funnel-item-completion', this.el);
  this.conversionEl = query('.js-funnel-conversion', this.el);
  this.stepsCollection = new StepsCollection();
  this._name = '';
  this.stepViews = [];
}

/**
 * Set the name of the funnel.
 *
 * ```js
 * funnel.name('foo')
 * ```
 *
 * @param {String} name
 * @return {Funnel} self
 * @api public
 */

Funnel.prototype.name = function(name){
  this.nameEl.textContent = name;
  return this;
};

/**
 * Add a step to the funnel.
 *
 * ```js
 * funnel.step({
 *   label: 'foo',
 *   url: 'http://foo.com'
 * })
 * ```
 *
 * @param {Object} opts
 * @param {String} opts.label
 * @param {String} opts.url
 * @return {Funnel} self
 * @api public
 */

Funnel.prototype.step = function(opts){
  var defaultModelOpts = { hits: 0, trend: 0, conversion: 0 };

  // No trend data should be displayed for the first step.
  if (this.stepsCollection.models.length === 0) defaultModelOpts = { hits: 0, conversion: 0 };
  var stepModel = new StepModel(extend(opts, defaultModelOpts));
  this.stepsCollection.add(stepModel);
  var stepView = new StepView(stepModel);
  this.listEl.insertBefore(stepView.el, this.completionEl);
  this.stepViews.push(stepView);
  return this;
};

/**
 * Hit the funnel.
 *
 * If the the passed `url` matches a step url, then this will count as a step
 * hit.
 *
 * ```js
 * funnel.hit('http://foo.com')
 * ```
 *
 * @param {String} url
 * @return {Funnel} self
 * @api public
 */

Funnel.prototype.hit = function(url){
  var isMatched;
  this.stepsCollection.models.forEach(function(stepModel, i, models){

    // Update model data for a matched step.
    if (stepModel.get('url') === url) {
      isMatched = true;
      var newHits = stepModel.get('hits') + 1;
      stepModel.set('hits', newHits);
      stepModel.set('conversion', this._getRatio(newHits, models[0].get('hits')));
      if (i - 1 >= 0) stepModel.set('trend', this._getTrend(newHits, models[i - 1].get('hits')));

    // Update conversion and trend for the remaining steps.
    } else if (isMatched) {
      stepModel.set('conversion', this._getRatio(stepModel.get('hits'), models[0].get('hits')));
      stepModel.set('trend', this._getTrend(stepModel.get('hits'), models[i - 1].get('hits')));
    }

    // Update overall conversion rate.
    if (i + 1 >= models.length) {
      this.conversionEl.textContent = viewUtils.formatAsPercentage(stepModel.get('conversion'), 1);
    }
  }, this);
  return this;
};

/**
 * Remove the funnel.
 *
 * ```js
 * funnel.remove()
 * ```
 *
 * @api public
 */

Funnel.prototype.remove = function(){
  this.stepViews.forEach(function(stepView){
    stepView.remove();
  });
};

/**
 * Get the ratio of two values.
 *
 * Special case - will return `1` if `valueA` is larger than `valueB`.
 *
 * ```js
 * funnel._getRatio(2, 1)
 * // => 1
 *
 * funnel._getRatio(1, 2)
 * // => 0.5
 * ```
 *
 * @param {Number} valueA
 * @param {Number} valueB
 * @return {Number} ratio
 * @api private
 */

Funnel.prototype._getRatio = function(valueA, valueB){
  return valueA >= valueB ? 1 : valueA / valueB;
};

/**
 * Get the trend between two values.
 *
 * Special case - will return `1` if the `valueA` is larger than `valueB`,
 * otherwise will return a value denoting the change between `valueA` and
 * `valueB`.
 *
 * ```js
 * funnel._getTrend(2, 1)
 * // => 1
 *
 * funnel.getTrend(1, 2)
 * // => -0.5
 * ```
 *
 * @param {Number} valueA
 * @param {Number} valueB
 * @return {Number} ratio
 * @api private
 */

Funnel.prototype._getTrend = function(valueA, valueB){
  var ratio = this._getRatio(valueA, valueB);
  return ratio === 1 ? 1 : ratio - 1;
};