'use strict';

describe('Service: authRestAngular', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var authRestAngular;
  beforeEach(inject(function (_authRestAngular_) {
    authRestAngular = _authRestAngular_;
  }));

  it('should do something', function () {
    expect(!!authRestAngular).toBe(true);
  });

});
