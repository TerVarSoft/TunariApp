'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('NavBarCtrl', ['$scope', '$location', function ($scope, $location) {

  	$scope.subMenu = "views/productsSubmenu.html"
  	 
  	$scope.menus = {
  		products: {
  			redirectTo: '/productSearch',
  			subMenuView: 'views/productsSubMenu.html'
  		},
  		clients: {
  			redirectTo: '/clientSearch',  	
  			subMenuView: 'views/clientsSubMenu.html'		
  		},
  		statistics: {
  			redirectTo: '/statistics'  			
  		}
  	}

  	$scope.changeView = function(menuItem){
  		$scope.subMenu = $scope.menus[menuItem].subMenuView || "";
  		$location.path($scope.menus[menuItem].redirectTo);  
  	}

  	// Collapse navBar when clicking an menu item
	$("#js-navbar-collapse a").on("click", function () {
         $("#js-navbar-collapse").collapse('hide');	   
     });

	// Desactivate menu items and activate selected
	// menu item
	$(".nav a").on("click", function(){
	   $(".nav").find(".active").removeClass("active");
	   $(this).parent().addClass("active");
	});
  }]);
