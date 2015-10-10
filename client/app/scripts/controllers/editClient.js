'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:EditclientCtrl
 * @description
 * # EditclientCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('EditClientCtrl', ['$scope', '$location', 'Clients', '$routeParams', 
     function ($scope, $location, Clients, $routeParams) {
    
        Clients.one($routeParams.clientId).get().then(function(client){
            $scope.client = client;
            // Save a clone of the product samples
            $scope.savedClient = $.extend(true, {}, $scope.client);
        });
        $scope.saveClient = function(){
            $scope.client.save().then(function(){
                $location.path("/clientSearch");    
            });
        }

        $scope.cancelEditClient = function(){              
            $scope.client = $.extend(true, {}, $scope.savedClient);
            $location.path("/clientSearch"); 
        };
        
        $scope.deleteClient = function(){            
            
            Clients.one($routeParams.clientId).remove().then(function(){
                $('#deleteModal').modal('toggle');
                $('.modal-backdrop').remove();
                $location.path("/clientSearch");  
            });            
        }
}]);
