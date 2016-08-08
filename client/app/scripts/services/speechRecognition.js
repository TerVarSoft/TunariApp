'use strict';

/**
 * @ngdoc service
 * @name clientApp.SpeechRecognition
 * @description
 * # SpeechRecognition
 * Factory in the clientApp.
 */
angular.module('tunariApp')
  .factory('SpeechRecognition', ['$window', function ($window) {
    
    var observerOnResultCallbacks = [];
    var observerOnFinalResultCallbacks = [];

    var SpeechRecognition = $window.SpeechRecognition || $window.webkitSpeechRecognition;

    var recognizer;
    var isRecognizing = false;
    var transcript = "";

    var service = {
        startRecognition: startRecognition,
        stopRecognition: stopRecognition,
        getTranscript: function () {
            return transcript;
        },
        registirObserverOnResultCallback: function(callback) {
            observerOnResultCallbacks.push(callback);
        },
        registirObserverOnFinalResultCallback: function (callback) {
            observerOnFinalResultCallbacks.push(callback);
        }
    };

    activate();

    function notifyOnResultObservers(){
      angular.forEach(observerOnResultCallbacks, function(callback){
            callback();
      });
    };

    function notifyOnFinalResultObservers(finalResult){
      angular.forEach(observerOnFinalResultCallbacks, function(callback){
            callback(finalResult);
      });
    };

    function activate() {
        if (SpeechRecognition) {
            recognizer = new SpeechRecognition();

            recognizer.maxAlternatives = 3;
            recognizer.interimResults = true;

            recognizer.onstart = startHandler;
            recognizer.onend = endHandler;
            recognizer.onresult = resultHandler;
        }
    }

    function getTranscript () {
        return transcript;
    }

    function resultHandler(event) {
        if (event.results) {
            var result = event.results[event.resultIndex];

            transcript = result[0].transcript;
            notifyOnResultObservers();

            if(result.isFinal) {
                notifyOnFinalResultObservers(transcript);
                console.log ("Final result: " + transcript)
            }
            else
            {
                console.log ("Interm result: " + transcript)
            }
        }
    }

    function startHandler() {
        isRecognizing = true;
    }

    function endHandler() {
        isRecognizing = false;
    }

    function startRecognition() {
        if(recognizer) {
            if(!isRecognizing) {
                recognizer.start();
            }
        }
        else
        {
            throw new Error('Speech recognition is not supported');
        }
    }

    function stopRecognition() {
        if(recognizer) {
            recognizer.stop();
        }
    }

    return service;
  }]);
