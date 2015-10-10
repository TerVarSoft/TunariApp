'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:productLocation
 * @description
 * # productLocation
 */
angular.module('tunariApp')
  .directive('productlocation', function () {
    return {
      require: 'ngModel', 
      restrict: 'EA',
      link: function postLink(scope, element, attrs, ctrl) {
        
        ctrl.$parsers.push(function(value){
            var result = value;

            var reg = /^d(\w) e(\d+) p(\d+)$/;
            var match = value.match(reg);

            if(match){                  
                result = "Deposito " + match[1].toUpperCase() +
                         ", Estante " + match[2] + 
                         ", Peldaño " + match[3];
            }

            return result
        });
      }
    };
  });
