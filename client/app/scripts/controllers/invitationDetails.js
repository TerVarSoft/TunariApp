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

    // Setup specific properties in invitationDetails, based in product type
    // Merge default configuration with specific configuration
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
    $scope.$on('prepareProductToSaveSpecificProperties', function(e) { 
        // Remove current type, size, genre from tags
        $scope.$parent.product.tags = _.difference($scope.$parent.product.tags, _.intersection($scope.$parent.product.tags, $scope.config.invitationTypes));
        $scope.$parent.product.tags = _.difference($scope.$parent.product.tags, _.intersection($scope.$parent.product.tags, $scope.invitationsDetails.sizes));
        $scope.$parent.product.tags = _.difference($scope.$parent.product.tags, _.intersection($scope.$parent.product.tags, $scope.invitationsDetails.genres));
            
        // Add new type, size, genre from tags
        $scope.$parent.product.tags.push($scope.$parent.product.properties.type);
        $scope.$parent.product.tags.push($scope.$parent.product.properties.size);
        $scope.$parent.product.tags.push($scope.$parent.product.properties.genre);

        var invitationNumber = getInvitationNumber();
        $scope.$parent.product.sortTag = $scope.$parent.product.properties.type + invitationNumber;
    });

    var getInvitationNumber = function(){
        var nameParts = $scope.$parent.product.name.split('-');

        var lastElement = _.last(nameParts);
        var isNum = /^\d+$/.test(lastElement);
        var number = "";

        if(isNum){
            number = lastElement;
        }
    
        return number;
    }

}]);
