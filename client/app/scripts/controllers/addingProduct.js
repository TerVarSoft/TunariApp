'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AddingproductCtrl
 * @description
 * # AddingproductCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('AddingProductCtrl', ['$scope', '$uibModalInstance', 'productName', 'Messages',
  	function ($scope, $uibModalInstance, productName, Messages) {

      $scope.productName = productName;
      $scope.messages = Messages;

      $scope.accept = function () {
        $uibModalInstance.close($scope.quantityToAdd);
      };
    
      $scope.cancel = function () {
        $uibModalInstance.dismiss();
      };   
    
  }]);
