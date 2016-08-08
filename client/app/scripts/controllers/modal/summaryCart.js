'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ModalSummarycartCtrl
 * @description
 * # ModalSummarycartCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('summaryCartCtrl', ['$scope', '$mdDialog', 'Clients', 'sellingItems', 'sellClient',
  	function ($scope, $mdDialog, Clients, sellingItems, sellClient) {
    
    $scope.sellingItems = sellingItems;
    $scope.selectedClient = sellClient;

    Clients.getList().then(function(clients) {
        $scope.clients = clients;
    });

    $scope.cancel = function () {
	  	  $mdDialog.cancel($scope.selectedClient);
	  }; 	

    $scope.getTotal = function() {
        var result = _.sum($scope.sellingItems, function(sellingItem){
            return sellingItem.total;
        });

        return _.round(result, 2);
    };

    $scope.sell = function () {   	
	  	  $mdDialog.hide($scope.getTotal());
	  };

    // Client autocomplete functions.
	  $scope.queryClientSearch = function(query) {
        var results = query ? $scope.clients.filter( createFilterFor(query) ) : $scope.clients;
        return results;
  	}

  	function createFilterFor(query) {
    		var lowercaseQuery = angular.lowercase(query);
    		return function filterFn(client) {
    			return (client.name.indexOf(lowercaseQuery) === 0);
    		};
    }
    
  }]);
