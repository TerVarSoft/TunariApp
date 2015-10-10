'use strict';

describe('Controller: NewclientCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var NewclientCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewclientCtrl = $controller('NewclientCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NewclientCtrl.awesomeThings.length).toBe(3);
  });
});
