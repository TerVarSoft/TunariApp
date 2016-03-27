'use strict';

/**
 * @ngdoc service
 * @name clientApp.search
 * @description
 * # search
 * Service in the clientApp.
 */
angular.module('tunariApp')
  .service('SearchInfo', function () {
    
    this.tags = "";

    this.getTags = function(){
    	return this.tags;
    }

    this.setTags = function(tags){
    	this.tags = tags;
    }

  });
