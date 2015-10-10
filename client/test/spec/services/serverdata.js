'use strict';

describe('Service: serverData', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var serverData;
  beforeEach(inject(function (_serverData_) {
    serverData = _serverData_;
  }));

  it('should do something', function () {
    expect(!!serverData).toBe(true);
  });

});
