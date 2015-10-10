'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:typehead
 * @description
 * # typehead
 */
angular.module('tunariApp')
  .directive('typeahead', function () {
     var controller = ['$scope', 'Sellings', 'Clients', function($scope, Sellings, Clients){
        var items = new Bloodhound({
            datumTokenizer: function() {},
            queryTokenizer: Bloodhound.tokenizers.whitespace,
        }); 


        $scope.exampleData = {
            displayKey: 'name',
            source: items.ttAdapter()
        };

        $scope.exampleOptions = {
            highlight: true
        };

        Clients.getList().then(function(clients) {      

            items = new Bloodhound({
                datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local:clients
            }); 

            items.initialize();

            $scope.exampleData = {
                displayKey: 'name',
                source: items.ttAdapter()
            };
        });



        $scope.client = null;
     }];
    return {
      template: '<input placeholder="Cliente..." class="typeahead sfTypeahead form-control" options="exampleOptions" datasets="exampleData" \
        ng-model="client"/>',
        scope:{
        client:"="
        },
      restrict: 'EA',        
      controller: controller,
//      replace: true, 
    };
  });
