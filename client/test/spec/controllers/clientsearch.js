'use strict';

describe('Controller: ClientsearchCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ClientsearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClientsearchCtrl = $controller('ClientsearchCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ClientsearchCtrl.awesomeThings.length).toBe(3);
  });
});
