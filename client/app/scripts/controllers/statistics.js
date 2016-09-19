'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:StatisticsCtrl
 * @description
 * # StatisticsCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('StatisticsCtrl', ['$scope', '$uibModal', 'ServerData', function ($scope, $uibModal, ServerData) {

      $scope.header.title = 'Estadisticas';

      ServerData.config.get().then(function(config){
          $scope.statisticsView = config.statisticsViews[0].view;  
      });

      $scope.openOptionsModal = function (){
      	  var optionsModal = $uibModal.open({
              templateUrl: '../../views/statisticsOptions.html',
              controller: 'StatisticsOptionsCtrl',
              resolve: {
              }
          });

          optionsModal.result.then(function (view) {
              $scope.statisticsView = view;                
          });
      }
  }]);
