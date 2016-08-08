'use strict';

describe('Controller: ModalImageCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ModalImageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalImageCtrl = $controller('ModalImageCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ModalImageCtrl.awesomeThings.length).toBe(3);
  });
});
