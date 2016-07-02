'use strict';

/**
 * @ngdoc function
 * @name tunariApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tunariApp
 */
angular.module('tunariApp')
  .controller('LoginCtrl', ['$scope', '$state', 'Messages', 'Notifier', 'Login', 'AuthInfo', 
  	function ($scope, $state, Messages, Notifier, Login, AuthInfo) {
    	$scope.submit = function() {

	    	Login.post($scope.user).then(function(res){ 

	            AuthInfo.setInfo(res);
	            $state.go('products');

				Notifier({ 
	                message: _.template(Messages.message024)({user : res.user.name}),
	                classes: 'alert-success'
	            }); 	     	
	        }, function(err){
	            console.log(err);
                Notifier({ 
	                message: err.data.message,
	                classes: 'alert-warning'
	            });
	        });
	    }
  }]);
