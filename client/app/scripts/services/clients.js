'use strict';

/**
 * @ngdoc service
 * @name clientApp.clients
 * @description
 * # clients
 * Service in the clientApp.
 */
angular.module('tunariApp')
  .service('Clients', function (Restangular) {
    return Restangular.service('clients');
  });
