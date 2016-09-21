'use strict';

/**
 * @ngdoc service
 * @name tunariApp.settings
 * @description
 * # settings
 * Service in the tunariApp.
 */
angular.module('tunariApp')
  .service('Settings', ['Restangular', function (Restangular) {
    return Restangular.service('settings');
  }]);
