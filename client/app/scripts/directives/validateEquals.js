'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:sameAs
 * @description
 * # sameAs
 */
angular.module('tunariApp')
  .directive('validateEquals', function () {
    return {
    	require: 'ngModel',
    	link: function(scope, element, attrs, ngModelCtrl) {

            var propOne = attrs.ngModel;
            var propTwo = attrs.validateEquals;

            scope.$watch('[' + propOne + "," + propTwo + ']', function(){
                ngModelCtrl.$setValidity('equal', scope[propOne] === scope[propTwo]);
            });
    	}
    };
  });
