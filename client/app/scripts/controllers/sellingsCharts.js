'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SellingschartsCtrl
 * @description
 * # SellingschartsCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('SellingsChartsCtrl', ["$scope", "Sellings", 
    function ($scope, Sellings) {  	      

    $scope.getSellings = function() {

        Sellings.getList({
            from: moment($scope.from).format($scope.format), 
            to: moment($scope.to).format($scope.format)
        }).then(function(sellings) {      
            $scope.sellings = [];
            _.each(sellings, function(selling){ 
                _.map(selling.sellingItems, function(sellingItem){
                    sellingItem.client = selling.client[0];
                    sellingItem.date = selling.date;

                    return sellingItem;
                });
                 
                $scope.sellings = $scope.sellings.concat(selling.sellingItems);
            });

            $scope.totalSellings = _.round(_.sum($scope.sellings, 'total'), 2);
        }); 
    }

    $scope.formatDate = function(date) {    	
        return moment(date).format("dddd, MMMM DD YYYY");;
    }

    $scope.formatHour = function(date) {    	
        return moment(date).format("h:mm:ss a");;
    }

    $scope.format = "YYYY-MM-DD HH:mm:ss"
    $scope.from = moment({ hour:0, minute:0, second:0 }).format($scope.format);
    $scope.to = moment({ hour:23, minute:59, second:59 }).format($scope.format);

    $scope.getSellings(); 
}]);
