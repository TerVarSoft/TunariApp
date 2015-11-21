'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:DeleteclientCtrl
 * @description
 * # DeleteclientCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('QuestionModalCtrl', ['$scope', '$uibModalInstance', 'options', function ($scope, $uibModalInstance, options) {
    
      $scope.options = options;
	
      $scope.accept = function () {
        $uibModalInstance.close();
      };
	
      $scope.cancel = function () {
        $uibModalInstance.dismiss();
      };
  }]);
