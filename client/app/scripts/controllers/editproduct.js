'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:EditproductCtrl
 * @description
 * # EditproductCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('EditproductCtrl', ['$scope', '$location', '$routeParams', 'Products', 'ServerData', 'AlertMessages',
    function ($scope, $location, $routeParams, Products, ServerData, AlertMessages){       
    $scope.editingProduct = Products.one($routeParams.productId).get().then(function(product){
        $scope.editingProduct = product;
    });
    
    $scope.serverData = ServerData;    
    
    $scope.saveProduct = function(){  
                
        $scope.editingProduct.put().then(function(){
            var message = "Acaba de modificar " + $scope.editingProduct.name; 
            AlertMessages.setMessage(message)
            $location.path("/productSearch");
        });
        
    }
    
    $scope.cancelEditing = function() {
        $location.path("/productSearch");
    }
    
    $scope.deleteProduct = function(){            
       
        Products.one($routeParams.productId).remove().then(function(){
            $("#deleteModal").on('hidden.bs.modal', function () { 
                  $location.path("/productSearch"); 
            //          $scope.$apply();    
            }); 
        });
    }
    
}]);
