'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NewclientCtrl
 * @description
 * # NewclientCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('NewClientCtrl', ['$scope', '$location','Clients',
    function ($scope, $location, Clients) {


    $scope.createClient = function(){
        $scope.newClient.productSamples = [];
            Clients.post($scope.newClient).then(function(){
            $location.path("/clientSearch");    
        });
    }

    $scope.cancelNewClient = function(){
        $location.path("/clientSearch");  
    };
        
    $('#name').focus();
  }]);
