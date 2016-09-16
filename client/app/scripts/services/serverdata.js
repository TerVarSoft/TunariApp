'use strict';

/**
 * @ngdoc service
 * @name clientApp.serverData
 * @description
 * # serverData
 * Service in the clientApp.
 */
angular.module('tunariApp')
  .service('ServerData', ['Config', 'Restangular',
    function (Config, Restangular) {
        
        //this.config = Restangular.oneUrl('config', Config.serverOptions.host + ":" + Config.serverOptions.port + '/api/config');      
        this.config = Restangular.oneUrl('config', Config.serverOptions.target + '/api/config');      


        //this.urlImages = Config.serverOptions.host + ":" + Config.serverOptions.port + "/images/";
        this.urlImages = Config.serverOptions.target + "/images/";
  }]);


