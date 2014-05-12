'use strict';

/**
 * Format a number as a percentage with the required decimal places.
 *
 * @param {Number} val
 * @param {Number} dp
 * @return {Number}
 * @api private
 */

exports.formatAsPercentage = function(val, dp){
  return Math.round(val * 100 * Math.pow(10, dp)) / Math.pow(10, dp) + '%';
};