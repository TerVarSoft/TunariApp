'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ClientsearchCtrl
 * @description
 * # ClientsearchCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('ClientSearchCtrl', ['$scope', '$location', 'Clients', function ($scope, $location, Clients) {
    
    $scope.header.title = 'Clientes';

    Clients.getList().then(function(clients) {   
        $scope.clients = clients;
        
        $scope.pagination = {}
        $scope.pagination.pageSize = 10;
        $scope.pagination.numberOfPages = Math.ceil($scope.clients.length/$scope.pagination.pageSize) ;
    });
  
    $scope.search = function(){
        Clients.getList({name:$scope.selectedClient.name}).then(function(clients) {
            $scope.clients = clients;
        });
    }
    
    $scope.editClient = function(clientId){
        $location.path("/clients/"+clientId);
    }
    
    $scope.showProductSamples = function(clientId){
        $location.path("/clientSamples/"+clientId);
    };
      
    $scope.windowTop = function(){
        window.scrollTo(0, 0);
    }
  }]);
