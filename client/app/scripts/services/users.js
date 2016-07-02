'use strict';

/**
 * @ngdoc service
 * @name tunariApp.users
 * @description
 * # users
 * Service in the tunariApp.
 */
angular.module('tunariApp')
  .service('Users', ['Restangular', function (Restangular) {
    return Restangular.service('users');
  }]);