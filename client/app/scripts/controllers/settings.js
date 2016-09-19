'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:StatisticsCtrl
 * @description
 * # StatisticsCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('SettingsCtrl', ['$scope', 'ServerData', function ($scope, ServerData) {

      $scope.layout.title = 'Configuraciones';

      ServerData.config.get().then(function(config){
        $scope.config = config;
        $scope.imgServer = config.imgServer;     
    });
     
  }]);
