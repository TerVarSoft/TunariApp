'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ContentctrlCtrl
 * @description
 * # ContentctrlCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('ContentCtrl', ['$scope', '$mdSidenav', '$mdToast', 'SpeechRecognition', 
    function ($scope, $mdSidenav, $mdToast, SpeechRecognition) {

  	$scope.layout = {
  		title: 'Tunari',
      backupTitle: 'Tunari',
  		bottomFabButtonIcon: 'add',
  		bottomFabButtonIconTooltip: 'Oprimeme!',	    		    	
  	  recordIcon: 'mic' 
    }    

    $scope.isRecording = false;

  	$scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };    

  	$scope.bottomFabRightButtonClick = function (ev) {
    	$scope.$broadcast('onBottomFabRightButtonClicked', {ev: ev});
  	}

    $scope.bottomFabLeftButtonClick = function () {
      $scope.$broadcast('onBottomFabLeftButtonClicked', {});
    }

    $scope.showToast = function(message, action) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(message)
            .action(action)
            .highlightAction(true)
            .position('right')
            .hideDelay(1500)
            .parent(angular.element(document.body))
        );       
    }

    // Recording Functions
    $scope.toogleRecording = function () {

        $scope.isRecording = !$scope.isRecording;
        if($scope.isRecording) {
            try {                        
                SpeechRecognition.startRecognition();
                $scope.layout.recordIcon = 'mic_off';
            }
            catch (e) {
                $scope.layout.recordIcon = 'mic';
                $scope.showToast("No pude oir!, prueba otra vez", ":)")
            }
        } 
        else {
            $scope.layout.recordIcon = 'mic';
            SpeechRecognition.stopRecognition();
            $scope.$broadcast('onFinalResultFromSpeechRecognizer', 
              {finalSearchText: SpeechRecognition.getTranscript()});
        }              
    }

    function updateSearchText () {
        if($scope.isRecording) {
            $scope.layout.title = SpeechRecognition.getTranscript();
            $scope.$apply();
        }
    }

    function onFinalResult (finalResult) {
        if($scope.isRecording) {
            $scope.isRecording = false;   
            $scope.layout.recordIcon = 'mic';                     
            $scope.$broadcast('onFinalResultFromSpeechRecognizer', {finalSearchText: finalResult});
        }
    }

    SpeechRecognition.registirObserverOnResultCallback(updateSearchText);
    SpeechRecognition.registirObserverOnFinalResultCallback(onFinalResult);
  
  }]);
