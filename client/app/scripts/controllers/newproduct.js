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
              ['$scope', '$location', 'ServerData', 'Products', 'Notifier', 'Messages',
             function ($scope, $location, ServerData, Products, Notifier, Messages) {
     window.scrollTo(0, 0);
    $scope.serverData = ServerData;
    
    $scope.saveProduct = function(){
        Notifier({ 
            message: Messages.message002 + $scope.newProduct.name,
            classes: 'alert-success'
        });
        $location.path ("/productSearch");
    }
    
    $scope.createProduct = function(){
        $scope.newProduct.tags.push($scope.newProduct.name);
        $scope.newProduct.tags.push($scope.newProduct.category);
        $scope.newProduct.tags.push($scope.newProduct.properties.size);
        $scope.newProduct.tags.push($scope.newProduct.properties.type);
        $scope.newProduct.tags.push($scope.newProduct.properties.genre);
        Products.post($scope.newProduct).then(function(){
            $location.path("/productSearch");    
            Notifier({ 
                message: Messages.message002 + $scope.newProduct.name,
                classes: 'alert-success'
            });
        });
    }
        
    $scope.cancelNewProduct = function(){
        $location.path("/productSearch");  
    };
    
    $('#name').focus();
  }]);
