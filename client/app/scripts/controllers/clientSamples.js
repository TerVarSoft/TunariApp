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
        $scope.savedProductSamples = client.productSamples.slice(0);;
    });
      
    Products.getList().then(function(products){
        $scope.products = products
    });
    
    $scope.filterDistributedOptions = function(productName){
        var result = true;
        if($scope.distributedOption == "Repartidos"){
            result = $scope.isDistributed(productName);
        }
        else if($scope.distributedOption == "No Repartidos"){
            result = !$scope.isDistributed(productName);
        }
        return result;
    }
    
    $scope.isDistributed = function(productName){
        var result = false;
        result = _.some($scope.client.productSamples, function(sample){
            return sample == productName;
        });
        return result;
    }
    
    $scope.addSample = function(productName){
        
        if(_.contains($scope.client.productSamples, productName)){
            $scope.client.productSamples = _.without($scope.client.productSamples, productName);
        }
        else{       
            $scope.client.productSamples.push(productName);
        }
    }
    
    $scope.saveModification = function(){
        $scope.client.save().then(function(){
             $location.path("/clientSearch");   
        });
    }
    $scope.cancelModifications = function(){
        $scope.client.productSamples = $scope.savedProductSamples.slice(0);
        $location.path("/clientSearch");
    }
    
    $scope.toogleMark = function(){
        if($scope.isAllMarked){
            $scope.client.productSamples = [];
            $scope.isAllMarked = false;
        }
        else{
            $scope.isAllMarked = true;
            $scope.client.productSamples = _.pluck($scope.products, 'name');
        }
    }
  }]);
