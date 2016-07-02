'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('RegisterCtrl', ['$scope', 'Users', 'Notifier', 'Messages', 'AuthInfo', '$state',
    function ($scope, Users, Notifier, Messages, AuthInfo, $state) {
    
    $scope.roles = [{text: "ADMIN", value: "admin"}, 
                    {text: "TRABAJADOR", value: "worker"},
                    {text: "PUBLICO", value: "public"}];

    $scope.newUser ={
        role: $scope.roles[0].value
    }

    $scope.submit = function() {

    	$scope.newUser.password = $scope.password;
    	Users.post($scope.newUser).then(function(res){ 

            AuthInfo.setInfo(res);
            $state.go('products');

			Notifier({ 
                message: _.template(Messages.message020)({user : res.user.name}),
                classes: 'alert-success'
            }); 	     	
        }, function(err){

            // Validate if user already exists
            if(err.data.message) {                
                Notifier({ 
	                message: err.data.message,
	                classes: 'alert-danger'
	            });
            }
            else {
                Notifier({ 
	                message: _.template(Messages.message022),
	                classes: 'alert-danger'
	            });
            }
        });
    }

    $scope.changeRole = function(role) {
        $scope.newUser.role = role;
    }

    $scope.isRoleSelected = function(role) {
        return role == $scope.newUser.role;
    }
  }]);
