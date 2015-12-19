'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NewinvitationCtrl
 * @description
 * # NewinvitationCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('InvitationDetailsCtrl', ['$scope', 'ServerData', function ($scope, ServerData) {

	ServerData.config.get().then(function(config){
        $scope.config = config;
        $scope.$parent.product.properties.type =    $scope.$parent.product.properties.type ? 
                                                    $scope.$parent.product.properties.type :
                                                    config.invitationTypes[0]
        $scope.updateProperties();        
    });

    $scope.updateProperties = function() {
    	$scope.invitationsDetails = $.extend(true, {}, $scope.config.invitationsDetails['Default']);  
        var productType = $scope.$parent.product.properties.type;
        _.merge($scope.invitationsDetails, $scope.config.invitationsDetails[productType] || {}, 
            // Replace first array with second array when merging
            // Default behavior would mix the arrays, that is not what we want
            function(a, b) {
                if (_.isArray(a)) {
                    return b;
                };
            }
        );      

        $scope.sizes =  $scope.invitationsDetails.sizes;
        $scope.$parent.product.properties.size =    _.includes($scope.sizes, $scope.$parent.product.properties.size) ? 
                                                    $scope.$parent.product.properties.size : 
                                                    $scope.sizes[0];   
        $scope.genres =  $scope.invitationsDetails.genres;
        $scope.$parent.product.properties.genre =   _.includes($scope.genres, $scope.$parent.product.properties.genre) ? 
                                                    $scope.$parent.product.properties.genre :
                                                    $scope.genres[0];            
    };

    // Called by the parent scope
    $scope.$on('prepareProductToSave', function(e) { 
        $scope.$parent.product.tags.push($scope.$parent.product.properties.size);
        $scope.$parent.product.tags.push($scope.$parent.product.properties.type);
        $scope.$parent.product.tags.push($scope.$parent.product.properties.genre);
    });
}]);
