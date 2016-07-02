'use strict';

/**
 * @ngdoc service
 * @name tunariApp.authRestAngular
 * @description
 * # authRestAngular
 * Factory in the tunariApp.
 */
angular.module('tunariApp')
  .factory('AuthRestangular', ['Restangular', 'AuthInterceptor', function (Restangular, AuthInterceptor) {

    // Public API here
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.addFullRequestInterceptor(AuthInterceptor.request);
    });
  }]);
