'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:productdetails
 * @description
 * # productdetails
 */
angular.module('tunariApp')
  .directive('productdetails', function () {
    return {
      templateUrl: '../../views/productdetails.html',
      restrict: 'EA',
      link: function (scope,element) {
       // element.text('this is the productdetails directive');
      }
    };
  });
