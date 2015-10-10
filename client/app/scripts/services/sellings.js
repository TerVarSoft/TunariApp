'use strict';

/**
 * @ngdoc service
 * @name clientApp.sellings
 * @description
 * # sellings
 * Service in the clientApp.
 */
angular.module('tunariApp')
  .service('Sellings', function (Restangular) {
    return Restangular.service('sellings');
  });
