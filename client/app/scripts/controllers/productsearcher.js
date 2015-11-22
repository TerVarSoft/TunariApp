'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProductsearcherCtrl
 * @description
 * # ProductsearcherCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('ProductSearcherCtrl', 
              ['$scope', '$location', '$uibModal', 'Products', 'ServerData', 'Messages', 'Notifier',  
              function ($scope, $location, $uibModal, Products, ServerData, Messages, Notifier) {
    
    Products.getList().then(function(products) {      
      $scope.products = products;   
    }); 
   
        
    $scope.sampleBookSelected = 0; 
    $scope.shoppingCartSellings = [];
    
    $scope.modals = {
        sampleBook : false,
        sellingItem : false,
        productdetails : false, 
        background: false
    };
    
    $scope.serverData = ServerData;
    
    $scope.search = function(){
        Products.getList({tags:$scope.tags}).then(function(products) {
            $scope.products = products;
        });
    }
    
    $scope.addToCart = function(sellingItem){
        if(!_.contains($scope.shoppingCartSellings, sellingItem)){           
            $scope.shoppingCartSellings.push(sellingItem);
           }
        $scope.hideModals();
    }
    
    $scope.showSampleBook = function(product){
        var samplebookModal = $uibModal.open({
            templateUrl: '../../views/samplebook.html',
            controller: 'SamplebookCtrl',
            resolve: {
                samplebookInfo: function () {
                    return {
                        product: product,
                        serverData: $scope.serverData
                    }
                }
            }
        });
    }

    $scope.getProductImageUrl = function(product) {
        return  $scope.serverData.urlImages + "/" + 
                product.category + "/" + 
                product.properties.type + "/" +
                product.name + "-M.jpg"
    }
    

    $scope.addProduct = function(product) {
        var addProductModal = $uibModal.open({
          templateUrl: '../../views/addingProduct.html',
          controller: 'AddingProductCtrl',
          resolve: {
            productName: function () {
              return product.name;
            }
          }
        });

        addProductModal.result.then(function (quantityToAdd) {
            product.quantity += quantityToAdd;
            product.save();

            Notifier({ 
                message: Messages.message012 + product.name + ' : ' + product.quantity,
                classes: 'alert-info'
            });                    
        });
    };
    
    
    $scope.showSellingItem = function(sellingItemData){  
        $scope.sellingItemData = sellingItemData;                
        $scope.savedsellingItemData = $.extend(true, {}, $scope.sellingItemData);
        $scope.modals.sellingItem = true;
        $scope.modals.background = true;    
        window.scrollTo(0, 0);
    };    
    
    $scope.cancelSelling = function(){
        var iSelling = $scope.shoppingCartSellings.indexOf($scope.sellingItemData);
        $scope.shoppingCartSellings[iSelling] = $scope.savedsellingItemData
        $scope.hideModals();
    }
    
    $scope.hideModals = function(){
        $scope.modals.sampleBook = false;
        $scope.modals.sellingItem = false;
        $scope.modals.productdetails = false;
        $scope.modals.background = false;
    };
    
    $scope.editProduct = function(productId){
        $location.path ("products/" + productId);
    }
    
    
    $scope.windowTop = function(){
        window.scrollTo(0, 0);
    }
    
  }]);
