'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BottomsheetSellingoptionsCtrl
 * @description
 * # BottomsheetSellingoptionsCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('SellingOptionsCtrl', ['$scope', '$mdBottomSheet', 
    function ($scope, $mdBottomSheet) {
    
    $scope.items = [
    	 {
      	 	name : "ResetProductQuantities",
      	 	text : "Resetear cantidades",
      	 	icon : "settings_backup_restore"
    	 },
       {
          name : "CleanShoppingCart",
          text : "Limpiar el carrito",
          icon : "delete"
       }
    ]

    $scope.listItemClick = function($index) {
  	    var clickedItem = $scope.items[$index];
  	    $mdBottomSheet.hide(clickedItem);
  	};
  }]);
