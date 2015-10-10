'use strict';

describe('Controller: ProductsearcherCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ProductsearcherCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductsearcherCtrl = $controller('ProductsearcherCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProductsearcherCtrl.awesomeThings.length).toBe(3);
  });
});
