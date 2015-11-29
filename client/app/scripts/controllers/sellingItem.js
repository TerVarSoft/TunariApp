'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AddingproducttocartCtrl
 * @description
 * # AddingproducttocartCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('sellingItemCtrl', ['$scope', '$uibModalInstance', 'ServerData', 'sellingItem',
   function ($scope, $uibModalInstance, ServerData, sellingItem) {

   		$scope.sellingItem = $.extend(true, {}, sellingItem);
   		$scope.serverData = ServerData;

   		$scope.updateTotal = function() {
            $scope.sellingItem.total = $scope.sellingItem.quantity *
                $scope.sellingItem.productPrice.value / $scope.sellingItem.product.properties.quantityPerPackage;
            $scope.updateRevenue();
        }
        
        $scope.updateRevenue = function() {
            $scope.sellingItem.revenue = $scope.sellingItem.total -
                ($scope.sellingItem.product.buyingPrice * $scope.sellingItem.quantity)/
                $scope.sellingItem.product.properties.quantityPerPackage;
            $scope.sellingItem.revenue = parseFloat($scope.sellingItem.revenue.toFixed(2));
        }

        $scope.addToCart = function () {
			$uibModalInstance.close($scope.sellingItem);
		};
	    
		$scope.cancel = function () {
			$uibModalInstance.dismiss();
		}; 
  }]);
