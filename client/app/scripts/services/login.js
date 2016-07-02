'use strict';

/**
 * @ngdoc service
 * @name tunariApp.login
 * @description
 * # login
 * Factory in the tunariApp.
 */
angular.module('tunariApp')
  .factory('Login', ['Restangular', function (Restangular) {
      return Restangular.service('login');
  }]);
