'use strict';

/**
 * @ngdoc service
 * @name clientApp.alertMessages
 * @description
 * # alertMessages
 * Service in the clientApp.
 */
angular.module('tunariApp')
  .service('AlertMessages', function () {
        
    var alertMessages = {show : false};
    
    this.getAlertMessages = function(){
        
        return alertMessages;
    }
    this.setMessage = function(message){
        alertMessages.message = message;
        alertMessages.show = true;
    }
    
    this.hideAlerts = function(){
        alertMessages.show = false;
    }
  });
