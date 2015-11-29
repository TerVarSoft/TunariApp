'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SamplebookCtrl
 * @description
 * # SamplebookCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('SamplebookCtrl', ['$scope', '$uibModalInstance', 'ServerData', 'product', 
  	function ($scope, $uibModalInstance, ServerData, product) {    

		$scope.imageUrl = 	 ServerData.urlImages + "/" + 
							           product.category + "/" + 
							           product.properties.type + "/" +
							           product.name + "-L.jpg"

  		$scope.dissmissModal = function () {
      	  $uibModalInstance.dismiss();
      	};
  }]);
