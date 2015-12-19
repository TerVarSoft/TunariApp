'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:StatisticsCtrl
 * @description
 * # StatisticsCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('StatisticsCtrl', ['$scope', '$uibModal', function ($scope, $uibModal) {

  	$scope.statisticsView = '../../views/productQuantityCharts.html'; 

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
