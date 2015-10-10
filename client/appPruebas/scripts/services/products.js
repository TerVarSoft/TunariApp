'use strict';

/**
 * @ngdoc service
 * @name clientApp.Products
 * @description
 * # Products
 * Factory in the clientApp.
 */
angular.module('clientApp')
  .factory('Products', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
