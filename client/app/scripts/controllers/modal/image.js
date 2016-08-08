'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ModalImageCtrl
 * @description
 * # ModalImageCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('ImageCtrl', ['$scope', '$mdDialog', '$mdMedia', 'ServerData', 'product', 
    function ($scope, $mdDialog, $mdMedia, ServerData, product) {
    
    $scope.product = product;

    $scope.getImageUrl = function() {
      var isSmall = ($mdMedia('sm') || $mdMedia('xs'));

      var imageUrl = ServerData.urlImages + "/" + 
          $scope.product.category + "/" + 
          ($scope.product.properties.type || '') + "/" +
          $scope.product.name;

    	return isSmall ? imageUrl + "-M.jpg" : imageUrl + "-L.jpg";
    }    

    $scope.cancel = function () {
  		  $mdDialog.cancel();
  	};
  }]);
