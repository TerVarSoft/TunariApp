'use strict';

describe('Controller: ModalSummarycartCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ModalSummarycartCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalSummarycartCtrl = $controller('ModalSummarycartCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ModalSummarycartCtrl.awesomeThings.length).toBe(3);
  });
});
