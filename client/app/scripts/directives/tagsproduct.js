'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:tagsproduct
 * @description
 * # tagsproduct
 */
angular.module('tunariApp')
  .directive('tagsproduct', function () {
    return {
      require: 'ngModel',          
      restrict: 'EA',
      link: function postLink(scope, element, attrs, ctrl) {
        
          ctrl.$formatters.push(function(value){
              var result = value;
              if(result){                  
                result = value.join(" ");
              }
              
              return result
          });
          
          ctrl.$parsers.push(function(value){
              var result = value;
              if(result){                  
                result = value.split(" ");
              }
              
              return result
          });
      }
    };
  });
