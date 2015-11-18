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
    'cgNotify'    
  ])
  .config(['$routeProvider', 'RestangularProvider', 'Config', function ($routeProvider, RestangularProvider, Config) {
    
    RestangularProvider.setBaseUrl(Config.serverOptions.host + ":" + Config.serverOptions.port + '/api');

    RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
            if (operation === "getList") {
                _.each(response,function(element){
                    element.id = element._id
                });
            }
            else{
                if(response._id){                    
                    response.id = response._id;
                }
            }
            
            return response;
        });
    
    $routeProvider
      .when('/', {
//        templateUrl: 'views/main.html',
//        controller: 'MainCtrl',
//        controllerAs: 'main'
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
        templateUrl: 'views/editproduct.html',
        controller: 'EditproductCtrl',
        controllerAs: 'editProduct'
      })
      .when('/newProduct', {
        templateUrl: 'views/newProduct.html',
        controller: 'NewproductCtrl',
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
      .otherwise({
        redirectTo: '/'
      });
  }]);

