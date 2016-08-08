'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AddquantityCtrl
 * @description
 * # AddquantityCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('AddquantityCtrl', ['$scope', '$mdDialog', 'product', 
  	function ($scope, $mdDialog, product) {
    
    $scope.product = product;

    $scope.cancel = function () {
		$mdDialog.cancel();
	};

	$scope.add = function() {
		product.quantityToSell = $scope.quantity
		$mdDialog.hide();
	}
  }]);
