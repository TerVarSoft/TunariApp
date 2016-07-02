'use strict';

/**
 * @ngdoc service
 * @name tunariApp.authInterceptor
 * @description
 * # authInterceptor
 * Factory in the tunariApp.
 */
angular.module('tunariApp')
  .factory('AuthInterceptor', [ 'AuthInfo', function (AuthInfo) {
    
    // Public API here
    var interceptor = {
      request: function(element, operation, route, url, headers, params) {
        var token = AuthInfo.getToken();
      return {
        element: element,
        params: params,
        headers: {authorization: 'Bearer ' + token}
      };
    }/*function(element, operation, route, url) {
          var token = AuthToken.getToken();

          if(token) {
              element.headers.Authorization = 'Bearer' + token;
          }

          return element;
      }*/,
      response: function(response) {
          return response;
      }
    }

    return interceptor;
  }]);
