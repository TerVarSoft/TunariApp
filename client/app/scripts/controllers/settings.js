'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:StatisticsCtrl
 * @description
 * # StatisticsCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('SettingsCtrl', ['$scope', 'Settings', 'ProductInfo',
        function ($scope, Settings, ProductInfo) {

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
            ProductInfo.setImageServer($scope.imgServer.value);
            $scope.$parent.showToast('Nuevo servidor de imagenes!', $scope.imgServer.value);
        });
	}
     
  }]);
	
