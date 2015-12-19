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

      // Initialize productPrice with an element from prices
      // to prevent productPrice dropdown from displaying empty options
      $scope.sellingItem.productPrice = _.where($scope.sellingItem.product.prices, 
        {
          _id: $scope.sellingItem.productPrice._id
        })[0];

      $scope.serverData = ServerData;

      $scope.imageUrl =    ServerData.urlImages + "/" + 
                         $scope.sellingItem.product.category + "/" + 
                         ($scope.sellingItem.product.properties.type || '') + "/" +
                         $scope.sellingItem.product.name + "-M.jpg"

      $scope.updateTotal = function() {
          var pricePerUnity = $scope.sellingItem.productPrice.type != 'Unidad' ?
                              $scope.sellingItem.productPrice.value / $scope.sellingItem.product.properties.quantityPerPackage :
                              $scope.sellingItem.productPrice.value;

          $scope.sellingItem.total = $scope.sellingItem.quantity * pricePerUnity;
          $scope.sellingItem.total = parseFloat($scope.sellingItem.total.toFixed(2));
          $scope.updateRevenue();
      }
        
      $scope.updateRevenue = function() {
          var pricePerUnity = $scope.sellingItem.productPrice.type != 'Unidad' ?
                            $scope.sellingItem.productPrice.value / $scope.sellingItem.product.properties.quantityPerPackage :
                            $scope.sellingItem.productPrice.value;

          var buyingPricePerUnity = $scope.sellingItem.product.buyingPrice.type != 'Unidad' ?
                            $scope.sellingItem.product.buyingPrice.value / $scope.sellingItem.product.properties.quantityPerPackage :
                            $scope.sellingItem.product.buyingPrice.value;

          $scope.sellingItem.revenue = $scope.sellingItem.total -
              $scope.sellingItem.quantity * buyingPricePerUnity;
          $scope.sellingItem.revenue = parseFloat($scope.sellingItem.revenue.toFixed(2));
      }

      $scope.addToCart = function () {
          sellingItem.productPrice = $scope.sellingItem.productPrice;
          sellingItem.total = $scope.sellingItem.total;
          sellingItem.quantity =  $scope.sellingItem.quantity;
          sellingItem.revenue = $scope.sellingItem.revenue;
          $uibModalInstance.close(sellingItem);
      };
	    
      $scope.cancel = function () {
      	  $uibModalInstance.dismiss();
      }; 
  }]);
