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
              ['$scope', '$location', 'Products', 'ServerData',  
              function ($scope, $location, Products, ServerData) {
    
    Products.getList().then(function(products) {      
      $scope.products = products;   
        console.log(products[0]);
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
        $scope.sampleBookSelected = $scope.products.indexOf(product);
        $scope.selectedProductSampleBook = product;
        $scope.modals.sampleBook = true;
        $scope.modals.background = true;
    };
    
    $scope.selectProductToAdd = function(product) {
        //$scope.quantityToAdd = "";
        $('#addingProductQuantity').modal('toggle');
        $scope.selectedProductToAdd = product;
    };
    
    $scope.addingProduct = function() {
        $scope.selectedProductToAdd.quantity += $scope.quantityToAdd;
        $scope.selectedProductToAdd.save();
        $('#addingProductQuantity').modal('toggle');
        $scope.quantityToAdd = "";
        $scope.addingQuantityForm.$setPristine();
    };
    
    $scope.cancelAdding = function() {
        $scope.quantityToAdd = "";
        $scope.addingQuantityForm.$setPristine();
        
        $('#addingProductQuantity').modal('toggle');
    }
    
    $scope.showSellingItem = function(sellingItemData){  
        $scope.sellingItemData = sellingItemData;                
        $scope.savedsellingItemData = $.extend(true, {}, $scope.sellingItemData);
        $scope.modals.sellingItem = true;
        $scope.modals.background = true;    
        window.scrollTo(0, 0);
    };
    
    //$scope.endSelling = function(message){
    //    $scope.hideModals();
    //}
    
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
    
    $scope.showDetails = function(productId){
        $location.path ("products/" + productId);
    }
    
    
    $scope.windowTop = function(){
        window.scrollTo(0, 0);
    }
    
    $('#addingProductQuantity').on('shown.bs.modal', function () {
        $('#addingQuantity').focus()
    })
  }]);
