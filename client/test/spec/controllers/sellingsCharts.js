'use strict';

describe('Controller: SellingschartsCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var SellingschartsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SellingschartsCtrl = $controller('SellingschartsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SellingschartsCtrl.awesomeThings.length).toBe(3);
  });
});
