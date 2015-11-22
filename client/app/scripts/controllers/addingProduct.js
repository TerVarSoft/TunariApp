'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AddingproductCtrl
 * @description
 * # AddingproductCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('AddingProductCtrl', ['$scope', '$uibModalInstance', 'productName', 
  	function ($scope, $uibModalInstance, productName) {

  		$scope.productName = productName;

		$scope.accept = function () {
	  	  $uibModalInstance.close($scope.quantityToAdd);
	  	};
		
      	$scope.cancel = function () {
      	  $uibModalInstance.dismiss();
      	};
    
  }]);
