'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NewclientCtrl
 * @description
 * # NewclientCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('NewClientCtrl', ['$scope', '$location','Clients', 'Notifier', 'Messages', 'ServerData',
    function ($scope, $location, Clients, Notifier, Messages, ServerData) {


    $scope.createClient = function(){
        
        $scope.newClient.productSamples = {};
        ServerData.config.get().then(function(config){
            var invitationTypes = config.invitationTypes;
            
            _.each(invitationTypes, function(invitationType){
                $scope.newClient.productSamples[invitationType] = [];
            });

            Clients.post($scope.newClient).then(function(){
                $location.path("/clientSearch");  
                Notifier({ 
                    message: Messages.message001 + $scope.newClient.name,
                    classes: 'alert-success'
                });  
            });   
        });
        
        $(".nav").find(".active").removeClass("active");             
    }

    $scope.cancelNewClient = function(){
        $location.path("/clientSearch"); 
        $(".nav").find(".active").removeClass("active"); 
    };
        
    $('#name').focus();
  }]);
