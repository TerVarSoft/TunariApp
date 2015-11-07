'use strict';

/**
 * @ngdoc service
 * @name clientApp.clients
 * @description
 * # clients
 * Service in the clientApp.
 */
angular.module('tunariApp')
  .service('Clients', ['Restangular', function (Restangular) {
    return Restangular.service('clients');
  }]);
