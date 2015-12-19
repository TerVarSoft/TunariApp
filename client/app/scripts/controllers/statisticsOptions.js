'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:StatisticsoptionsCtrl
 * @description
 * # StatisticsoptionsCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('StatisticsOptionsCtrl', ['$scope', '$uibModalInstance', 
  	function ($scope, $uibModalInstance) {
    
	    $scope.options = [
	    	{
	    		name: 'Cantidad de Productos',
	    		view: '../../views/productQuantityCharts.html'
	    	},
	    	{
	    		name: 'Ventas',
	    		view: '../../views/sellingCharts.html'
	    	}
	    ]

	    $scope.selectOption = function(option){
	    	$uibModalInstance.close(option.view);
	    }
  }]);
