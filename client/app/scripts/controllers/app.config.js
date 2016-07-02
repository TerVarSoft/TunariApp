'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .config(function ($stateProvider) {

  	$stateProvider.state('register', {
		url: '/register',
		templateUrl: '/../../views/register.html'
  	});

  });