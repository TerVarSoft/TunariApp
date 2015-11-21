'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:EditproductCtrl
 * @description
 * # EditproductCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('EditproductCtrl', ['$scope', '$location', '$routeParams', '$uibModal', 'Products', 'ServerData', 'Notifier', 'Messages',
    function ($scope, $location, $routeParams, $uibModal, Products, ServerData, Notifier, Messages){       
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
    
    $scope.deleteProduct = function () {

        var deleteModal = $uibModal.open({
          templateUrl: '../../views/questionModal.html',
          controller: 'QuestionModalCtrl',
          resolve: {
            options: function () {
              return {
                title: Messages.message010,
                message: Messages.message011+ $scope.editingProduct.name + '?',
              }
            }
          }
        });

        deleteModal.result.then(function () {
            Products.one($routeParams.productId).remove().then(function(){
                $location.path("/productSearch");  
                Notifier({ 
                    message: Messages.message006 + $scope.editingProduct.name,
                    classes: 'alert-danger'
                });
            });                    
        });
    };
    
}]);
