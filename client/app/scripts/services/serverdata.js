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

        this.config = Restangular.oneUrl('config', Config.serverOptions.target + '/api/config');      

        this.urlImages = Config.serverOptions.target + "/images/";
  }]);


