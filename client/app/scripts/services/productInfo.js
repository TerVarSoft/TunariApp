'use strict';

/**
* @ngdoc service
* @name clientApp.productInfo
* @description
* # productInfo
* Service in the clientApp.
*/
angular.module('tunariApp')
  .service('ProductInfo', ["Settings", function (Settings) {


    var imgServer = "";

    Settings.getList().then(function(settings){
        imgServer = _.find(settings, {'key': 'imgServer'}).value;
    });

    this.getProductImageUrl = function(product, suffix) {
        if(product && !_.isEmpty(product.category) && !_.isEmpty(product.properties))
        {
            return  imgServer + "/" +
                    product.category + "/" +
                    (product.properties.type || '' )+ "/" +
                    product.name + suffix +".jpg";
        }
        else {
            return imgServer  + "/notFound.jpg"
        }
    }

    this.setImageServer = function(newImageServer) {
        imgServer = newImageServer;
    }
}]);