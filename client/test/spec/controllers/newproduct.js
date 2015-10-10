'use strict';

describe('Controller: NewproductCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var NewproductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewproductCtrl = $controller('NewproductCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NewproductCtrl.awesomeThings.length).toBe(3);
  });
});
