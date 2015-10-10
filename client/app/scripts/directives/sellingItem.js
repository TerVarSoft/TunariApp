'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:selling
 * @description
 * # selling
 */
angular.module('tunariApp')
  .directive('sellingitem', function () {    
    var controller = ['$scope',  function($scope){

        $scope.submitSelling = function () {            
            
//            $scope.sellingData.client = [$scope.clients[0]];
//            
//
//
//            if($scope.sellingData.quantity){                
//                
//                Sellings.post($scope.sellingData);
//                
//                var newProductQuantity = $scope.product.quantity-$scope.sellingData.quantity;
//                $scope.product.quantity = newProductQuantity;
//                $scope.product.put();
//
//                var resultMessage =   "Acabas de agregar " + 
//                                $scope.sellingData.quantity + " unidades de " + 
//                                $scope.product.name + " al carrito";
//                $scope.endSelling()(resultMessage);                    
//            }            
        };
        
    
        
        $scope.updateTotal = function() {
            $scope.sellingItemData.total = $scope.sellingItemData.quantity *
                $scope.sellingItemData.productPrice.value / $scope.sellingItemData.product.properties.quantityPerPackage;
            $scope.updateRevenue();
        }
        
        $scope.updateRevenue = function() {
            $scope.sellingItemData.revenue = $scope.sellingItemData.total -
                ($scope.sellingItemData.product.buyingPrice * $scope.sellingItemData.quantity)/
                $scope.sellingItemData.product.properties.quantityPerPackage;
            $scope.sellingItemData.revenue = parseFloat($scope.sellingItemData.revenue.toFixed(2));
        }
        

        $('#quantity').focus();
        
    }];


    return {
      scope: {
          sellingItemData: '=',          
          serverData: '=',
          addToCart: '&',
          endSelling: '&',
          cancelSelling: '&'

      },
      controller: controller,
      templateUrl: '../../views/sellingItem.html',
      restrict: 'EA'
    };
    
});
