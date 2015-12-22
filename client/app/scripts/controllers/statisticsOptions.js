'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:StatisticsoptionsCtrl
 * @description
 * # StatisticsoptionsCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('StatisticsOptionsCtrl', ['$scope', '$uibModalInstance', 'ServerData',
  	function ($scope, $uibModalInstance, ServerData) {
    	
    	ServerData.config.get().then(function(config){
	        $scope.options = config.statisticsViews;  
	    });

	    $scope.selectOption = function(option){
	    	$uibModalInstance.close(option.view);
	    }
  }]);
