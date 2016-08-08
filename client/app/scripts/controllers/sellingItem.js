'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AddingproducttocartCtrl
 * @description
 * # AddingproducttocartCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('sellingItemCtrl', ['$scope', '$mdDialog', 'ServerData', 'SellingItemInfo', 'sellingItem',
   function ($scope, $mdDialog, ServerData, SellingItemInfo, sellingItem) {
   
      $scope.selling = $.extend(true, {}, sellingItem);     

      // Initialize productPrice with an element from prices
      // to prevent productPrice dropdown from displaying empty options
      $scope.selling.productPrice = _.where($scope.selling.product.prices, 
        {
          _id: $scope.selling.productPrice._id
        })[0];
      
      $scope.serverData = ServerData;

      $scope.imageUrl =  ServerData.urlImages + "/" + 
                         $scope.selling.product.category + "/" + 
                         ($scope.selling.product.properties.type || '') + "/" +
                         $scope.selling.product.name + "-M.jpg"

      $scope.updateTotal = function() { 
        SellingItemInfo.updateProperties($scope.selling);
      }      

      $scope.saveSelling = function () {
          sellingItem = $scope.selling;
          $mdDialog.hide(sellingItem);
      };
	    
      $scope.cancel = function () {
      	  $mdDialog.cancel();
      }; 
  }]);
