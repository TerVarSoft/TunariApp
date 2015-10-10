'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:samplebook
 * @description
 * # samplebook
 */
angular.module('tunariApp')
  .directive('samplebook', function () {
    return {
      templateUrl: '../../views/samplebook.html',  
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
       // element.text('this is the samplebook directive');
      }
    };
  });
