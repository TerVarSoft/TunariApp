'use strict';

describe('Controller: sellingItemCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var AddingproducttocartCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddingproducttocartCtrl = $controller('sellingItemCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddingproducttocartCtrl.awesomeThings.length).toBe(3);
  });
});
