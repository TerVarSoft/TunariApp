'use strict';

/**
 * @ngdoc function
 * @name tunariApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the tunariApp
 */
angular.module('tunariApp')
  .controller('LogoutCtrl', ['AuthInfo', '$state', function (AuthInfo, $state) {
    AuthInfo.removeInfo();

    $state.go('login');
  }]);
