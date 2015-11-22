'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SamplebookCtrl
 * @description
 * # SamplebookCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('SamplebookCtrl', ['$scope', '$uibModalInstance', 'samplebookInfo', 
  	function ($scope, $uibModalInstance, samplebookInfo) {    

		$scope.imageUrl = 	samplebookInfo.serverData.urlImages + "/" + 
							samplebookInfo.product.category + "/" + 
							samplebookInfo.product.properties.type + "/" +
							samplebookInfo.product.name + "-L.jpg"

  		$scope.dissmissModal = function () {
      	  $uibModalInstance.dismiss();
      	};
  }]);
