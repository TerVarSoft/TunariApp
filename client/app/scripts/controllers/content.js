'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ContentctrlCtrl
 * @description
 * # ContentctrlCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('ContentCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
    	$scope.header = {
    		title: 'Tunari'	
    	}

    	$scope.toggleSidenav = function(menuId) {
	        $mdSidenav(menuId).toggle();
	    };
  }]);
