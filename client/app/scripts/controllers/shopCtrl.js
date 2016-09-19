'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProductsearcherCtrl
 * @description
 * # ProductsearcherCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('ShopCtrl', 
              ['$scope', '$mdSidenav', '$mdDialog', '$mdToast', '$mdBottomSheet', '$mdMedia', '$location', '$uibModal', 'Products', 'ServerData', 'SearchInfo', 'SellingItemInfo','Messages', 'Notifier',  
              function ($scope, $mdSidenav, $mdDialog, $mdToast, $mdBottomSheet, $mdMedia, $location, $uibModal, Products, ServerData, SearchInfo, SellingItemInfo, Messages, Notifier) {    

    $scope.layout.title = 'Productos';
    $scope.layout.backupTitle = 'Productos';    
    $scope.layout.bottomFabButtonIcon = 'shopping_cart';
    $scope.layout.bottomFabButtonIconTooltip = 'Ver el Carrito';   

    $scope.serverData = ServerData;
    $scope.tags = SearchInfo.getTags();
    
    $scope.pagination = {
        current: 1,
        itemsPerPage: 30
    };

    $scope.isLoading = true;

    $scope.search = function(page){
        $scope.isLoading = true;
        var query = $scope.tags ? {tags: $scope.tags} : {};
        query.page = page;
        query.queryLimit = $scope.pagination.itemsPerPage;

        Products.getList(query).then(function(products) {
            $scope.products = products;
            $scope.totalProducts = products.meta.count; 
            $scope.pagination.current = page;    
            SearchInfo.setTags($scope.tags);
            $scope.isLoading = false;
        });
    }    

    $scope.pageChanged = function(newPage) {
        $scope.search(newPage);
    };    

    $scope.openQuantityModal = function(product, ev) {
        ev.stopPropagation();

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
        $mdDialog.show({
          controller: 'AddquantityCtrl',
          templateUrl: '../../views/addQuantity.html',
          locals: {
            product: product
          },
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: useFullScreen
        });
    }

    $scope.openImageModal = function(product, ev) {
        ev.stopPropagation();

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
        $mdDialog.show({
          controller: 'ImageCtrl',
          templateUrl: '../../views/modal/image.html',
          locals: {
            product: product
          },
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: useFullScreen
        });
    }

    $scope.addQuantity = function(product) {
        product.quantityToSell ++;
    }

    $scope.stepUpQuantity = function(product, ev) {
        var ceil = _.ceil((product.quantityToSell + 1) / 25);

        product.quantityToSell = 25 * ceil ;
    }

    $scope.stepDownQuantity = function(product, ev) {
        var floor = _.floor((product.quantityToSell - 1) / 25);

        product.quantityToSell = 25 * floor ;     
        if(product.quantityToSell < 0) product.quantityToSell = 0;
    }

    $scope.addToCart = function(product, ev) {
        ev.stopPropagation();        

        if(product.quantityToSell > product.quantity) {
             $scope.$parent.showToast("Solo hay " + product.quantity + " unidades en el deposito!", product.name);
             product.quantityToSell = 0;
             return;
        }

        var sellingItem = _.find($scope.shoppingCartSellings, function(selling) {
            return selling.product.name === product.name; 
        });

        if(sellingItem) {
          sellingItem.quantity += product.quantityToSell;
        }
        else
        {
            sellingItem = {
                product: product,
                productPrice: product.prices[0],
                quantity: product.quantityToSell
            };  
            $scope.shoppingCartSellings.push(sellingItem);
            $scope.$parent.cartItemsCount ++;
        }        

        SellingItemInfo.updateProperties(sellingItem);
        
        product.quantityToSell = 0;
        $scope.$parent.showToast('Agregaste un producto al carrito!', product.name);        
    }

    $scope.getProductImageUrl = function(product) {
        var imageUrl = $scope.serverData.urlImages + "/notFound.gif";

        if(product.category && product.properties) {
            imageUrl = $scope.serverData.urlImages + "/" +
                product.category + "/" +
                (product.properties.type || '' )+ "/" +
                product.name + "-M.jpg";
        }
        return imageUrl;
    }
    
    $scope.getSmallProductImageUrl = function(product) {
        var imageUrl = $scope.serverData.urlImages + "/notFound.gif";

        if(product.category && product.properties) {
            imageUrl = $scope.serverData.urlImages + "/" +
                product.category + "/" +
                (product.properties.type || '' )+ "/" +
                product.name + "-S.jpg";
        }
        return imageUrl;
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

    $scope.editProduct = function(productId){
        $location.path ("products/" + productId);
    }    
    
    $scope.windowTop = function(){
        window.scrollTo(0, 0);
    }            
    
    $scope.queryProductSearchNames = function(query) {        
        if (query && query !== "") {
            console.log("asdfsdf")
            var query = query ? {tags:query} : {};                
            query.properties = "name";
            query.querySort = "name";
            query.queryLimit = 10;

            $scope.productSearchText = null;

            return Products.getList(query).then(function(products) {
                var productNames = _.map(products, 'name');
                
                return productNames;
            });       
        }
        else {
            return [];
        }

    };

    $scope.setTags = function(text) {
        $scope.tags = text;
    }

    $scope.$on('onBottomFabRightButtonClicked', function(event, args) {        
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
        $mdDialog.show({
            controller: 'summaryCartCtrl',
            templateUrl: '../../views/modal/summaryCart.html',
            locals: {
              sellingItems: $scope.shoppingCartSellings,
              sellClient: $scope.sellClient
            },
            parent: angular.element(document.body),
            targetEvent: args.ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        })
        .then(function(total) {

            $scope.shoppingCartSellings = [];
            $scope.$parent.showToast('Venta exitosa!', "Total: " + total +  " Bs.");  
        }, function(sellClient) {
            $scope.sellClient = sellClient;        
        });
    });

    $scope.$on('onBottomFabLeftButtonClicked', function (ev, obj) {
        $mdBottomSheet.show({
          templateUrl: '../../views/bottomSheet/sellingOptions.html',
          controller: 'SellingOptionsCtrl'
        }).then(function(clickedItem) {
            if(clickedItem.name === "ResetProductQuantities") {
                ResetProductQuantities();
            }
            else if(clickedItem.name === "CleanShoppingCart") {
                CleanShoppingCart();
            }            
        });
    });

    $scope.$on('onFinalResultFromSpeechRecognizer', function (ev, obj) {
        $scope.tags = obj.finalSearchText;
        $scope.search($scope.tags, 1);
    });

    function ResetProductQuantities()
    {
        _.forEach($scope.products, function(product){
            product.quantityToSell = 0;
        });
    }


    // Shopping cart functions
    $scope.shoppingCartSellings = [];
    $scope.sellClient; 

    $scope.openSell = function(selling, ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
        $mdDialog.show({
          controller: 'sellingItemCtrl',
          templateUrl: '../../views/sellingItem.html',
          locals: {
            sellingItem: {
                product: selling.product,
                productPrice: selling.productPrice,
                quantity: selling.quantity,
                total: selling.total
            }
          },
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: useFullScreen
        })
        .then(function(sellingItem) {
            var indexToUpdate = _.findIndex($scope.shoppingCartSellings, 
                function(selling) { 
                    return selling.product.name == sellingItem.product.name; 
                }
            );
            $scope.shoppingCartSellings[indexToUpdate] = sellingItem;
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    }  

    $scope.removeSelling = function(selling) {
        _.pull($scope.shoppingCartSellings, selling);
    }  

    $scope.getTotal = function() {
        var result = _.sum($scope.shoppingCartSellings, function(sellingItem){
            return sellingItem.total;
        });

        return _.round(result, 2);
    };

    function CleanShoppingCart()
    {
        $scope.shoppingCartSellings = [];
    }

    $scope.search(1);    
  }]);
