'use strict';

/**
 * @ngdoc service
 * @name clientApp.Products
 * @description
 * # Products
 * Factory in the clientApp.
 */
angular.module('tunariApp')
  .factory('Products', function (Restangular) {
    return Restangular.service('products');
    
//    return Restangular.withConfig(function(RestangularConfigurer) {
//        RestangularConfigurer.setResponseExtractor(function(response, operation, what, url) {
//            if (operation === "getList") {                
//                _.each(response,function(product){
//                    product.tags = product.tags.join(" ");
//                });
//            }
//            else{
//                response.tags = response.tags.join(" ");
//            }
//            
//            return response;
//        });
//      }).service('products');
    
  });
