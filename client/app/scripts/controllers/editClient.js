'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:EditclientCtrl
 * @description
 * # EditclientCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('EditClientCtrl', ['$scope', '$location', '$routeParams', '$uibModal', 'Clients', 'Notifier', 'Messages',
     function ($scope, $location, $routeParams, $uibModal, Clients, Notifier, Messages) {
    
        Clients.one($routeParams.clientId).get().then(function(client){
            $scope.client = client;

            // Save a clone of the client
            $scope.savedClient = $.extend(true, {}, $scope.client);
        });

        $scope.saveClient = function(){
            $scope.client.save().then(function(){
                $location.path("/clientSearch");   
                Notifier({ 
                    message: Messages.message003 + $scope.client.name,
                    classes: 'alert-info'
                });  
            });
        }

        $scope.cancelEditClient = function(){              
            $scope.client = $.extend(true, {}, $scope.savedClient);
            $location.path("/clientSearch"); 
        };        

        $scope.deleteClient = function () {

            var deleteModal = $uibModal.open({
              templateUrl: '../../views/questionModal.html',
              controller: 'QuestionModalCtrl',
              resolve: {
                options: function () {
                  return {
                    title: Messages.message008,
                    message: Messages.message009 + $scope.client.name + '?',
                  }
                }
              }
            });

            deleteModal.result.then(function () {
                Clients.one($routeParams.clientId).remove().then(function(){
                    $location.path("/clientSearch");  
                    Notifier({ 
                        message: Messages.message005 + $scope.client.name,
                        classes: 'alert-danger'
                    });
                });                    
            });
        };
}]);
