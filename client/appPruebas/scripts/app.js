'use strict';

/**
 * @ngdoc overview
 * @name angPruebasApp
 * @description
 * # angPruebasApp
 *
 * Main module of the application.
 */
angular
  .module('angPruebasApp', [
    'ngAnimate',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/prueba2', {
        templateUrl: 'views/prueba2.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/prueba3', {
        templateUrl: 'views/prueba3.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/prueba4', {
        templateUrl: 'views/prueba4.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/prueba5', {
        templateUrl: 'views/prueba5.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/prueba6', {
        templateUrl: 'views/prueba6.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/prueba7', {
        templateUrl: 'views/prueba7.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
