'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:checkImage
 * @description
 * # checkImage
 */
angular.module('tunariApp')
  .directive('checkImage', ['$http', 'Config', function ($http, Config) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.$observe('ngSrc', function(ngSrc) {
                $http.get(ngSrc).success(function(){
                }).error(function() {
                    element.attr('src', Config.serverOptions.target + "/images/" + "notFound.gif"); // set default image
                });
            });
        }
    };
  }]);
