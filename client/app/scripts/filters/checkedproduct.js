'use strict';

/**
 * @ngdoc filter
 * @name clientApp.filter:checkedProduct
 * @function
 * @description
 * # checkedProduct
 * Filter in the clientApp.
 */
angular.module('tunariApp')
  .filter('checkedProduct', function () {    
    
    return function (input, client, filter) {
        
        var out = [];
        
        
        angular.forEach(input, function(product) {
            
            var isDistributed = _.some(client.productSamples, function(sample){
                return sample == product.name;
            });
            
            var result = true;
            if(filter == "Repartidos"){
                if(isDistributed){
                    
                    out.push(product);
                }
            }
            else if(filter == "No Repartidos"){
                if(!isDistributed){
                    
                    out.push(product);
                }
            }
            else{
                out.push(product);
            }

            
        });
      return out;
    };
  });
