'use strict';

describe('Controller: EditclientCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var EditclientCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditclientCtrl = $controller('EditclientCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditclientCtrl.awesomeThings.length).toBe(3);
  });
});
