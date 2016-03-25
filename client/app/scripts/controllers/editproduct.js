'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:EditproductCtrl
 * @description
 * # EditproductCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('EditProductCtrl', ['$scope', '$location', '$routeParams', '$uibModal', 'Products', 'ServerData', 'Notifier', 'Messages',
    function ($scope, $location, $routeParams, $uibModal, Products, ServerData, Notifier, Messages){       
    
    $scope.serverData = ServerData; 
    
    $scope.product = Products.one($routeParams.productId).get().then(function(product){
        $scope.product = product; 
        ServerData.config.get().then(function(config) {
            $scope.config = config;
            $scope.productView = _.where(config.productCategories, {name: $scope.product.category})[0].view;
        });    
    });
    
    $scope.saveProduct = function(){   
        // Default value for sortTag, this can be overriden in prepareProductToSave
        $scope.product.sortTag = $scope.product.category + $scope.product.name;           
        
        $scope.$broadcast ('prepareProductToSave');    

        $scope.product.put().then(function(){
            $location.path("/productSearch");
            Notifier({ 
                message: Messages.message004 + $scope.product.name,
                classes: 'alert-info'
            }); 
        }, function(response){
            if(response.code = 409) {                
                Notifier({ 
                    message: _.template(Messages.message018)({product : $scope.product.name}),
                    classes: 'alert-danger'
                });
            }
            else {
                Notifier({ 
                    message: Messages.message019,
                    classes: 'alert-danger'
                });
            }
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
                        message: Messages.message011+ $scope.product.name + '?',
                    }
                }
            }
        });

        deleteModal.result.then(function () {
            Products.one($routeParams.productId).remove().then(function(){
                $location.path("/productSearch");  
                Notifier({ 
                    message: Messages.message006 + $scope.product.name,
                    classes: 'alert-danger'
                });
            });                    
        });
    };
    
}]);
