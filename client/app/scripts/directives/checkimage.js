'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:checkImage
 * @description
 * # checkImage
 */
angular.module('tunariApp')
  .directive('checkImage', ['$http', 'ServerData', function ($http, ServerData) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.$observe('ngSrc', function(ngSrc) {
                $http.get(ngSrc).success(function(){
                }).error(function() {
                    element.attr('src', ServerData.urlImages + "/" + "notFound.gif"); // set default image
                });
            });
        }
    };
  }]);
