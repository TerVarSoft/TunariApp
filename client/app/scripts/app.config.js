'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .config(function ($urlRouterProvider, $stateProvider, RestangularProvider, AuthInfoProvider) {

  	$urlRouterProvider.otherwise('/login');

  	$stateProvider
  	.state('main', {
		url: '/',
		controller: 'ProductSearcherCtrl as ProductSearcher',
		templateUrl: '/views/productSearch.html'
  	})
	.state('products', {
		url: '/productSearch',
		controller: 'ProductSearcherCtrl as ProductSearcher',
		templateUrl: '/views/productSearch.html'
  	})  
  	.state('clients', {
		url: '/clientSearch',
		controller: 'ClientSearchCtrl as clientSearch',
		templateUrl: '/views/clientSearch.html'
  	}) 
  	.state('statistics', {
		url: '/statistics',
		controller: 'StatisticsCtrl as statistics',
		templateUrl: '/views/statistics.html'
  	})   	
  	.state('register', {
		url: '/register',
		controller: 'RegisterCtrl',
		templateUrl: '/views/register.html'
  	})
  	.state('login', {
		url: '/login',
		controller: 'LoginCtrl',
		templateUrl: '/views/login.html'
  	})
  	.state('logout', {
		url: '/logout',
		controller: 'LogoutCtrl'		
  	});

  });