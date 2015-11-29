'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:shoppingcart
 * @description
 * # shoppingcart
 */
angular.module('tunariApp')
  .directive('shoppingcart', function () {
    
    var controller = ['$scope', 'Sellings', 'Notifier', 'Messages', '$uibModal', 'ServerData',
      function($scope, Sellings, Notifier, Messages, $uibModal, ServerData){                              

        $scope.serverData = ServerData;

        $scope.selling = {
            sellingItems: $scope.sellingItems,
        };

        $scope.getTotalRevenue = function(){
            return _.reduce($scope.sellingItems, function(memo, sellingItem){ return memo + sellingItem.revenue; }, 0);
        };
        
        $scope.getTotal = function(){
            return _.reduce($scope.sellingItems, function(memo, sellingItem){ 
                var result = memo + sellingItem.total;
                result = parseFloat(result.toFixed(2));
                return result; 
            }, 0);
        };
                
        $scope.showSelling = function(sellingItem) {
            var sellingItemModal = $uibModal.open({
              templateUrl: '../../views/sellingItem.html',
              controller: 'sellingItemCtrl',
              size:'lg',
              resolve: {
                sellingItem: function () {
                  return sellingItem;
                }
              }
            });

            sellingItemModal.result.then(function(updatedSellingItem) {
                var iSelling = $scope.sellingItems.indexOf(sellingItem);
                $scope.sellingItems[iSelling] = updatedSellingItem;
            }); 
        };

        $scope.saveSelling = function () {   

            $('#shoppingcartbody').collapse('hide');
            if($scope.client){                
                $scope.selling.client = $scope.client
            }
            else{
                $scope.selling.client = {
                    name:"Desconocido",
                    address:"Desconocido",
                    phone:"9999999"
                };
            }
             $scope.selling.sellingItems = $scope.sellingItems,
             $scope.selling.total = $scope.getTotal();
             $scope.selling.revenue = $scope.getTotalRevenue();
             
             _.each($scope.selling.sellingItems, function(sellingItem){
                 var newProductQuantity = sellingItem.product.quantity-sellingItem.quantity;
                 sellingItem.product.quantity = newProductQuantity;
                 sellingItem.product.put();
             });
            
             Sellings.post($scope.selling).then(function(){
                 $scope.sellingItems = [];
             });

            Notifier({ 
                message: Messages.message007,
                classes: 'alert-info'
            });                          
        };
        
        $scope.cleanSelling = function() {
            $('#shoppingcartbody').collapse('hide');
            $scope.sellingItems = [];
        }
        
        $('.shopping-cart-body').css('max-height',$(window).height()/2.5);
        
    }];
    
    return {
      templateUrl: '../../views/shoppingcart.html',
      restrict: 'EA',
      scope: {
          sellingItems: '='
      },    
      controller: controller
    };
  });
