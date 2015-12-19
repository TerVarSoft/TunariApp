'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NewProductCtrl
 * @description
 * # NewProductCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('NewProductCtrl', 
              ['$scope', '$location', 'ServerData', 'Products', 'Notifier', 'Messages',
             function ($scope, $location, ServerData, Products, Notifier, Messages) {
     window.scrollTo(0, 0);
    $scope.serverData = ServerData;

    ServerData.config.get().then(function(config){
        $scope.config = config;
        $scope.categories = _.pluck(config.productCategories, 'name');
        $scope.product.category = $scope.categories[0];
        $scope.updateCategory();        
    });

    $scope.updateCategory = function () {
        var category = $scope.product.category;
        $scope.product = {category: category,prices:[],properties:{},tags:[],locations:[]};
        $scope.productView = _.where($scope.config.productCategories, {name:category})[0].view;

        // Merge default product properties with specif default product properties based 
        // on the product category.
        $scope.defaultValues = $.extend(true, {}, $scope.config.defaultProductProperties['Default']);  
        _.merge($scope.defaultValues, $scope.config.defaultProductProperties[category] || {}, 
            // Replace first array with second array when merging
            // Default behavior would mix the arrays, that is not what we want
            function(a, b) {
                if (_.isArray(a)) {
                    return b;
                };
            }
        );   
    }
    
    $scope.createProduct = function() {
        $scope.product.tags.push($scope.product.name);       
        $scope.product.tags.push($scope.product.category);       
        $scope.product.tags.push($scope.product.provider); 
        $scope.$broadcast ('prepareProductToSave');
        Products.post($scope.product).then(function(){
            $location.path("/productSearch");    
            Notifier({ 
                message: Messages.message002 + $scope.product.name,
                classes: 'alert-success'
            });
        });
    };

        
    $scope.cancelProduct = function(){
        $location.path("/productSearch");  
        $(".nav").find(".active").removeClass("active");
    };
    
    $('#name').focus();
  }]);
