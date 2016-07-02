'use strict';

/**
 * @ngdoc function
 * @name tunariApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the tunariApp
 */
angular.module('tunariApp')
  .controller('HeaderCtrl', ['$scope', 'AuthInfo', function ($scope, AuthInfo) {
    
    $scope.isAuthenticated = function()
    {
    	$scope.user = { name: AuthInfo.getName() };	
    	return AuthInfo.isAuthenticated();	
    }
    
  }]);
