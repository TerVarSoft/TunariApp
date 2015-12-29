'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:datepicker
 * @description
 * # datepicker
 */
angular.module('tunariApp')
  .directive('sellingsDatepicker', function () {
    return {
      templateUrl: '../../views/sellingsDatepicker.html',
      restrict: 'E',
      scope: {
          from: '=',
          to: '=',
          format: '='
      },  
      link: function postLink(scope, element, attrs) {               

	    scope.status = {
	    	from: {
	      		opened: false	    		
	    	},
	    	to: {
	      		opened: false	    		
	    	}
	    };

	    scope.openFrom = function($event) {
	      	scope.status.from.opened = true;
	    };

	    scope.openTo = function($event) {
	      	scope.status.to.opened = true;
	    };
      }
    };
  });
