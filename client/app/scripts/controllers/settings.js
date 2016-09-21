'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:StatisticsCtrl
 * @description
 * # StatisticsCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('SettingsCtrl', ['$scope', 'Settings', function ($scope, Settings) {

    $scope.layout.title = 'Configuraciones';

	Settings.getList().then(function(settings){
        $scope.imgServer = _.find(settings, {'key': 'imgServer'});     

        if(!$scope.imgServer) {
        	Settings.post({key:"imgServer", value:""}).then(function(newSetting){
        		$scope.imgServer = newSetting;
        	});
        }
	});

	$scope.saveSettings = function() {

		$scope.imgServer.save().then(function(){
            $scope.$parent.showToast('Las configuraciones han sido actualizadas!', "");
        });
	}
     
  }]);
	
