'use strict';

/**
 * @ngdoc service
 * @name clientApp.notifier
 * @description
 * # notifier
 * Factory in the clientApp.
 */
angular.module('tunariApp')
  .factory('Notifier', ['notify', function (notify) {
    
    notify.config({
      duration:3000      
    });
    
    return notify;    
  }]);
