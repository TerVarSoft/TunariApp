'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:uppercase
 * @description
 * # uppercase
 */
angular.module('tunariApp')
  .directive('uppercase', function () {
    return {
      require: 'ngModel', 
      restrict: 'EA',
      link: function postLink(scope, element, attrs, ctrl) {
        ctrl.$parsers.push(function(value){
            var result = value.toUpperCase();
            return result;
        });
      }
    };
  });
