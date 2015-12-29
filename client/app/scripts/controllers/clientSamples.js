'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ClientsamplesCtrl
 * @description
 * # ClientsamplesCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('ClientSamplesCtrl', 
              ['Clients', 'Products', 'ServerData', '$scope', '$location', '$routeParams', 
            function (Clients, Products, ServerData, $scope, $location, $routeParams) {
    
    $scope.serverData = ServerData;
    ServerData.config.get().then(function(config){
        $scope.invitationTypes = config.invitationTypes;
        $scope.selectedType = $scope.invitationTypes[0]
    });

    $scope.distributedOptions = [ "Todos", "Repartidos", "No Repartidos" ];
    $scope.distributedOption = $scope.distributedOptions[0]
    
               
    $scope.client={};
    Clients.one($routeParams.clientId).get().then(function(client){
        $scope.client = client;

        // Save a clone of the product samples
        $scope.savedProductSamples = _.clone(client.productSamples);

        $scope.getInvitations();
    });
        
    $scope.getInvitations = function() {
        $scope.isAllMarked = false;

        if(!$scope.client.productSamples[$scope.selectedType]) {
            $scope.client.productSamples[$scope.selectedType] = [];
        }
        var query = {
            category:'Invitaciones',
            'properties.type': $scope.selectedType || 'Mementos'
        };  
        Products.getList(query).then(function(products){
            $scope.products = products;

            _.each($scope.products, function(product){
                product.isDistributed = _.includes($scope.client.productSamples[$scope.selectedType], product.name);                
            });
        });
    }
    
    $scope.filterDistributedOptions = function(product){
        var result = true;
        if($scope.distributedOption == "Repartidos"){
            result = product.isDistributed;
        }
        else if($scope.distributedOption == "No Repartidos"){
            result = !product.isDistributed;
        }
        return result;
    }
    
    $scope.addSample = function(productName){
        
        if(_.includes($scope.client.productSamples[$scope.selectedType], productName)){
            $scope.client.productSamples[$scope.selectedType] = 
            _.without($scope.client.productSamples[$scope.selectedType], productName);
        }
        else{       
            $scope.client.productSamples[$scope.selectedType].push(productName);
        }
    }
    
    $scope.saveModification = function(){
        $scope.client.save().then(function(){
             $location.path("/clientSearch");   
        });
    }

    $scope.cancelModifications = function(){
        $scope.client.productSamples = _.clone($scope.savedProductSamples);
        $location.path("/clientSearch");
    }
    
    $scope.toogleMark = function(){

        if($scope.products.length <= 0) return;

        if($scope.isAllMarked){
            $scope.client.productSamples[$scope.selectedType] = [];
            $scope.isAllMarked = false;
        }
        else{
            $scope.isAllMarked = true;
            $scope.client.productSamples[$scope.selectedType] = _.pluck($scope.products, 'name');
        }
    }    
}]);
