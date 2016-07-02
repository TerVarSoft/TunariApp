'use strict';

/**
 * @ngdoc service
 * @name tunariApp.authToken
 * @description
 * # authToken
 * Factory in the authToken.
 */
angular.module('tunariApp')
  .factory('AuthInfo', ['$window', function ($window) {

    var storage = $window.localStorage;
    var cachedToken;
    var cachedName;

    // Public API.
    var authInfo = {
        setInfo: function(info){
          console.log(info.user);
          cachedToken = info.token;
          cachedName = info.user.name;
          storage.setItem('userToken', info.token);
          storage.setItem('userName', info.user.name);
        },
        getToken: function() {
          if(!cachedToken) {
              cachedToken = storage.getItem('userToken');
          }

          return cachedToken;
        },
        getName: function() {
          if(!cachedName) {
              cachedName = storage.getItem('userName');
          }
          console.log(cachedName);
          return cachedName;
        },
        isAuthenticated: function() {
            //!! -> to bool
            return !!authInfo.getToken();
        },
        removeInfo: function() {
          cachedToken = null;
          cachedName = null;
          storage.removeItem('userToken');
          storage.removeItem('userName');
        }
    };   

    return authInfo; 
  }]);
