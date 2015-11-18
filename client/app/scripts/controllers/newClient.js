'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NewclientCtrl
 * @description
 * # NewclientCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('NewClientCtrl', ['$scope', '$location','Clients', 'Notifier', 'Messages',
    function ($scope, $location, Clients, Notifier, Messages) {


    $scope.createClient = function(){
        $scope.newClient.productSamples = [];
            Clients.post($scope.newClient).then(function(){
            $location.path("/clientSearch");  
            Notifier({ 
                message: Messages.message001 + $scope.newClient.name,
                classes: 'alert-success'
            });  
        });        
    }

    $scope.cancelNewClient = function(){
        $location.path("/clientSearch");  
    };
        
    $('#name').focus();
  }]);
