'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:sellingquantity
 * @description
 * # sellingquantity
 */
angular.module('tunariApp')
  .directive('sellingquantity', function () {
    return {
      require: 'ngModel',    
      restrict: 'EA',
      scope: {
          maxQuantity : '@'
      },
      link: function postLink(scope, element, attrs, ctrl) {
        ctrl.$parsers.push(function(value){
            
            var result = value;
            
            var reg = /^(\d+)[ #\*](\d+)$|(^\d+)$/;
            var match = value.match(reg);
            
            if(match){                
                if(match[1] && match[2]){   
                    result = (parseInt(match[1])*100) + parseInt(match[2]);                          
                }
                else if(match && match[3]){
                    result = parseInt(match[3]);
                }

                // Validates max value
                if(result > scope.maxQuantity){  
                    ctrl.$setValidity('max_quantity', false);
                    result = undefined;
                }
                else{
                    ctrl.$setValidity('max_quantity', true);
                } 
            }
                
            return result;
        });
      }
    };
  });
