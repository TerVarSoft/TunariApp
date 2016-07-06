'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('tunariApp', [
    'ngAnimate',
    'ngRoute',
    'angular-carousel',
    'restangular',
    'ngAudio',
    'nya.bootstrap.select',
    'siyfion.sfTypeahead',
    'angularUtils.directives.dirPagination',
    'cgNotify',
    'ui.bootstrap',
    'scrollable-table',
    'ngMaterial',
    'ngMdIcons'
  ])
  .config(['$routeProvider', '$mdThemingProvider', 'RestangularProvider', 'Config', 
    function ($routeProvider, $mdThemingProvider, RestangularProvider, Config) {

    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('cyan');      
    
    // Restangular global configurations
    RestangularProvider.setBaseUrl(Config.serverOptions.host + ":" + Config.serverOptions.port + '/api');

    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        var extractedData;

        if (operation === "getList") {

            extractedData = data.data.items;
            extractedData.meta = data.data.meta;
        } else {
            extractedData = data.data;
        }
        return extractedData;
    });

    RestangularProvider.setRestangularFields({
        id: "_id"
    });

    // Moment.js global configuration
    moment.locale('es', {
         months : "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
         weekdays : "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"), 
    });

    
    $routeProvider
      .when('/', {
        templateUrl: 'views/productSearch.html',
        controller: 'ProductSearcherCtrl',
        controllerAs: 'ProductSearcher'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/productSearch', {
        templateUrl: 'views/productSearch.html',
        controller: 'ProductSearcherCtrl',
        controllerAs: 'ProductSearcher'
      })
      .when('/products/:productId', {
        templateUrl: 'views/editProduct.html',
        controller: 'EditProductCtrl',
        controllerAs: 'editProduct'
      })
      .when('/newProduct', {
        templateUrl: 'views/newProduct.html',
        controller: 'NewProductCtrl',
        controllerAs: 'newProduct'
      })
      .when('/clientSearch', {
        templateUrl: 'views/clientSearch.html',
        controller: 'ClientSearchCtrl',
        controllerAs: 'clientSearch'
      })
      .when('/clientSamples/:clientId', {
        templateUrl: 'views/clientSamples.html',
        controller: 'ClientSamplesCtrl',
        controllerAs: 'clientSamples'
      })
      .when('/newClient', {
        templateUrl: 'views/newClient.html',
        controller: 'NewClientCtrl',
        controllerAs: 'newClient'
      })
      .when('/clients/:clientId', {
        templateUrl: 'views/editClient.html',
        controller: 'EditClientCtrl',
        controllerAs: 'editClient'
      })
      .when('/statistics', {
        templateUrl: 'views/statistics.html',
        controller: 'StatisticsCtrl',
        controllerAs: 'statistics'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

