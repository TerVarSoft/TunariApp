'use strict';

describe('Filter: checkedProduct', function () {

  // load the filter's module
  beforeEach(module('clientApp'));

  // initialize a new instance of the filter before each test
  var checkedProduct;
  beforeEach(inject(function ($filter) {
    checkedProduct = $filter('checkedProduct');
  }));

  it('should return the input prefixed with "checkedProduct filter:"', function () {
    var text = 'angularjs';
    expect(checkedProduct(text)).toBe('checkedProduct filter: ' + text);
  });

});
