'use strict';

describe('Controller: InvitationsquantitychartsCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ProductquantitychartsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductquantitychartsCtrl = $controller('ProductquantitychartsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProductquantitychartsCtrl.awesomeThings.length).toBe(3);
  });
});
