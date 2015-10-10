'use strict';

describe('Service: sellings', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var sellings;
  beforeEach(inject(function (_sellings_) {
    sellings = _sellings_;
  }));

  it('should do something', function () {
    expect(!!sellings).toBe(true);
  });

});
