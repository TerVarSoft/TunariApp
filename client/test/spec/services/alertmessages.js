'use strict';

describe('Service: alertMessages', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var alertMessages;
  beforeEach(inject(function (_alertMessages_) {
    alertMessages = _alertMessages_;
  }));

  it('should do something', function () {
    expect(!!alertMessages).toBe(true);
  });

});
