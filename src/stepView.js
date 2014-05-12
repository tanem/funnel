'use strict';

var query = require('query');
var domify = require('domify');
var bind = require('bind');
var stepTemplate = require('../templates/step.html');
var viewUtils = require('./viewUtils');

/**
 * Expose `StepView`.
 */

module.exports = StepView;

/**
 * Initialize a new `StepView`.
 *
 * @param {StepModel} model
 * @return {StepView}
 * @api public
 */

// TODO: Use js classes!

function StepView(model) {
  this.model = model;
  this.model.on('change:label', bind(this, this._changeLabelHandler));
  this.model.on('change:hits', bind(this, this._changeHitsHandler));
  this.model.on('change:conversion', bind(this, this._changeConversionHandler));

  this.el = domify(stepTemplate);
  this.labelEl = query('.js-funnel-item-label', this.el);
  this.hitsEl = query('.js-funnel-item-hits', this.el);
  this.trendWrapperEl = query('.js-funnel-item-trend-wrapper', this.el);
  this.barEl = query('.js-funnel-item-bar', this.el);
  this.conversionEl = query('.js-funnel-item-conversion', this.el);

  this._changeLabelHandler(this.model.get('label'));
  this._changeHitsHandler(this.model.get('hits'));
  this._changeConversionHandler(this.model.get('conversion'));

  // Some models don't have a trend attribute set.
  if (this.model.get('trend') !== void 0) {
    this.trendWrapperEl.classList.remove('is-hidden');
    this.model.on('change:trend', bind(this, this._changeTrendHandler));
    this.trendEl = query('.js-funnel-item-trend', this.el);
    this._changeTrendHandler(this.model.get('trend'));
  }
}

/**
 * Remove the `StepView`.
 *
 * ```js
 * stepView.remove()
 * ```
 *
 * @api public
 */

StepView.prototype.remove = function(){
  this.model.removeAllListeners();
};

/**
 * Update label.
 *
 * @param {String} label
 * @api private
 */

StepView.prototype._changeLabelHandler = function(label){
  this.labelEl.textContent = label;
};

/**
 * Update hits.
 *
 * @param {Number} hits
 * @api private
 */

StepView.prototype._changeHitsHandler = function(hits){
  this.hitsEl.textContent = hits;
};

/**
 * Update trend.
 *
 * @param {Number} trend
 * @api private
 */

StepView.prototype._changeTrendHandler = function(trend){
  this.trendEl.textContent = viewUtils.formatAsPercentage(trend, 1);
};

/**
 * Update conversion.
 *
 * @param {Number} conversion
 * @api private
 */

StepView.prototype._changeConversionHandler = function(conversion){
  this.barEl.style.width = viewUtils.formatAsPercentage(conversion, 1);
  this.conversionEl.textContent = viewUtils.formatAsPercentage(conversion, 1);
};