'use strict';

describe('Service: sellingItemInfo', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var sellingItemInfo;
  beforeEach(inject(function (_sellingItemInfo_) {
    sellingItemInfo = _sellingItemInfo_;
  }));

  it('should do something', function () {
    expect(!!sellingItemInfo).toBe(true);
  });

});
