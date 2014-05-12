'use strict';

var expect = require('expect.js');
var classes = require('classes');
var query = require('query');
var css = require('css');
var Funnel = require('funnel');

describe('Funnel', function(){

  var funnel;

  beforeEach(function(){
    funnel = new Funnel();
  });

  afterEach(function(){
    funnel.remove();
  });

  it('should display the correct funnel name', function(){
    funnel.name('foo');
    expect(funnel.nameEl.textContent).to.be('foo');
  });

  it('should not display the trend for an initial step', function(){
    funnel.step({ label: 'foo', url: 'http://foo.com' });
    var initialStepTrendEl = query('.js-funnel-item-trend-wrapper', funnel.el);
    expect(classes(initialStepTrendEl).has('is-hidden')).to.be(true);
  });

  it('should display the trend for a non-initial step', function(){
    funnel.step({ label: 'foo', url: 'http://foo.com' });
    funnel.step({ label: 'bar', url: 'http://bar.com' });
    var nonInitialStepTrendEl = query.all('.js-funnel-item-trend-wrapper', funnel.el).item(1);
    expect(classes(nonInitialStepTrendEl).has('is-hidden')).to.be(false);
  });

  it('should display the hits for a step', function(){
    funnel.step({ label: 'foo', url: 'http://foo.com' });
    funnel.hit('http://foo.com');
    funnel.hit('http://foo.com');
    var hitsEl = query('.js-funnel-item-hits', funnel.el);
    expect(hitsEl.textContent).to.be('2');
  });

  it('should set the conversion rate bar at the correct width for a step', function(){
    funnel.step({ label: 'foo', url: 'http://foo.com' });
    funnel.step({ label: 'bar', url: 'http://bar.com' });
    funnel.hit('http://foo.com');
    funnel.hit('http://foo.com');
    funnel.hit('http://bar.com');
    var barEl = query.all('.js-funnel-item-bar', funnel.el).item(1);
    expect(css(barEl, 'width')).to.be('50%');
  });

  it('should display the conversion rate for a step', function(){
    funnel.step({ label: 'foo', url: 'http://foo.com' });
    funnel.step({ label: 'bar', url: 'http://bar.com' });
    funnel.hit('http://foo.com');
    funnel.hit('http://foo.com');
    funnel.hit('http://bar.com');
    var conversionEl = query.all('.js-funnel-item-conversion', funnel.el).item(1);
    expect(conversionEl.textContent).to.be('50%');
  });  

  it('should display the funnel completion rate', function(){
    funnel.step({ label: 'foo', url: 'http://foo.com' });
    funnel.step({ label: 'bar', url: 'http://bar.com' });
    funnel.hit('http://foo.com');
    funnel.hit('http://foo.com');
    funnel.hit('http://bar.com');
    var conversionEl = query('.js-funnel-conversion', funnel.el);
    expect(conversionEl.textContent).to.be('50%');
  });

});