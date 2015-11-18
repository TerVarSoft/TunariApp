'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:EditproductCtrl
 * @description
 * # EditproductCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('EditproductCtrl', ['$scope', '$location', '$routeParams', 'Products', 'ServerData', 'Notifier', 'Messages',
    function ($scope, $location, $routeParams, Products, ServerData, Notifier, Messages){       
    $scope.editingProduct = Products.one($routeParams.productId).get().then(function(product){
        $scope.editingProduct = product;
    });
    
    $scope.serverData = ServerData;    
    
    $scope.saveProduct = function(){  
                
        $scope.editingProduct.put().then(function(){
            var message = "Acaba de modificar " + $scope.editingProduct.name; 
            $location.path("/productSearch");
            Notifier({ 
                message: Messages.message004 + $scope.editingProduct.name,
                classes: 'alert-info'
            }); 
        });
        
    }
    
    $scope.cancelEditing = function() {
        $location.path("/productSearch");
    }
    
    $scope.deleteProduct = function(){            
       
        Products.one($routeParams.productId).remove().then(function(){
            $("#deleteModal").on('hidden.bs.modal', function () { 
                $location.path("/productSearch"); 
                Notifier({ 
                    message: Messages.message006 + $scope.editingProduct.name,
                    classes: 'alert-danger'
                });       
            }); 
        });
    }
    
}]);
