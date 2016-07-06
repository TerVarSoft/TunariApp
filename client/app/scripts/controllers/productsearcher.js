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
              ['$scope', '$location', '$uibModal', 'Products', 'ServerData', 'SearchInfo', 'Messages', 'Notifier',  
              function ($scope, $location, $uibModal, Products, ServerData, SearchInfo, Messages, Notifier) {    

    $scope.header.title = 'Productos';
    $scope.shoppingCartSellings = [];    
    
    $scope.serverData = ServerData;
    $scope.tags = SearchInfo.getTags();

    $scope.pagination = {
        current: 1,
        itemsPerPage: 15
    };
    
    $scope.search = function(page){
        var query = $scope.tags ? {tags:$scope.tags} : {};
        query.page = page;
        query.queryLimit = $scope.pagination.itemsPerPage;

        Products.getList(query).then(function(products) {
            $scope.products = products;
            $scope.totalProducts = products.meta.count; 
            $scope.pagination.current = page;    
            SearchInfo.setTags($scope.tags);
        });
    }    

    $scope.pageChanged = function(newPage) {
        $scope.search(newPage);
    };
    
    $scope.showSampleBook = function(product){
        var samplebookModal = $uibModal.open({
            templateUrl: '../../views/samplebook.html',
            controller: 'SamplebookCtrl',
            resolve: {
                product: function () {
                    return product;                                        
                }
            }
        });
    }

    $scope.getProductImageUrl = function(product) {
        return  $scope.serverData.urlImages + "/" + 
                product.category + "/" + 
                (product.properties.type || '' )+ "/" +
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

    $scope.createSellingItem = function(product) {

        if(_.some($scope.shoppingCartSellings, 'product.name', product.name)) {
            Notifier({ 
                message: _.template(Messages.message017)({product: product.name}),
                classes: 'alert-warning'
            }); 
            return;
        }

        var addingProductToCartModal = $uibModal.open({
            templateUrl: '../../views/sellingItem.html',
            controller: 'sellingItemCtrl',
            size:'lg',
            resolve: {
                sellingItem: function () {
                    return {
                        product: product,
                        productPrice: product.prices[0]
                    };
                }
            }
        });

        addingProductToCartModal.result.then(function(sellingItem) {
            if(!_.contains($scope.shoppingCartSellings, sellingItem)){           
                $scope.shoppingCartSellings.push(sellingItem);
            }
        }); 
    };            
    
    $scope.editProduct = function(productId){
        $location.path ("products/" + productId);
    }    
    
    $scope.windowTop = function(){
        window.scrollTo(0, 0);
    }
    
    $scope.search(1);    
  }]);
