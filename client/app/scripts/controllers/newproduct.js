'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NewproductCtrl
 * @description
 * # NewproductCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('NewproductCtrl', 
              ['$scope', '$location', 'ServerData', 'Products', 'AlertMessages',
             function ($scope, $location, ServerData, Products, AlertMessages) {
     window.scrollTo(0, 0);
    $scope.serverData = ServerData;
    
    $scope.saveProduct = function(){
        var message = "Acaba de crear " + $scope.newProduct.name; 
        AlertMessages.setMessage(message)
        $location.path ("/productSearch");
    }
    
    $scope.createProduct = function(){
//        console.log("holaaaa");
        $scope.newProduct.tags.push($scope.newProduct.name);
        $scope.newProduct.tags.push($scope.newProduct.category);
        $scope.newProduct.tags.push($scope.newProduct.properties.size);
        $scope.newProduct.tags.push($scope.newProduct.properties.type);
        $scope.newProduct.tags.push($scope.newProduct.properties.genre);
        Products.post($scope.newProduct).then(function(){
            $location.path("/productSearch");    
        });
    }
        
    $scope.cancelNewProduct = function(){
        $location.path("/productSearch");  
    };
    
    $('#name').focus();
  }]);
