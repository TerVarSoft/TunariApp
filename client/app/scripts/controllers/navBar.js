'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('NavBarCtrl', ['$scope', '$location', '$mdSidenav', function ($scope, $location, $mdSidenav) {
    
  	$scope.subMenu = "views/productsSubmenu.html"
  	 
    $scope.menus = {
      products: {
        icon: 'dashboard',
        redirectTo: '/productSearch',
        subMenuView: 'views/productsSubMenu.html',
        propName: 'products',
        text: 'Productos'
      },
      settings: {
        icon: 'settings',
        redirectTo: '/settings',
        propName: 'settings',
        text: 'Configuraciones'
      }
      /*clients: {
        icon: 'people',
        redirectTo: '/clientSearch',  	
        subMenuView: 'views/clientsSubMenu.html',
        propName: 'clients',
        text: 'Clientes'		
      },
      statistics: {
        icon: 'insert_chart',
        redirectTo: '/statistics',
        propName: 'statistics',
        text: 'Estadisticas'  			
      }*/
    }

    $scope.changeView = function(menuItem){
      $scope.subMenu = $scope.menus[menuItem].subMenuView || "";
      $location.path($scope.menus[menuItem].redirectTo);  
      $mdSidenav('sideNav').toggle();
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
