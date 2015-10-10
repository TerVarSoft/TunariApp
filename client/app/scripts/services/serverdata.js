'use strict';

/**
 * @ngdoc service
 * @name clientApp.serverData
 * @description
 * # serverData
 * Service in the clientApp.
 */
angular.module('tunariApp')
  .service('ServerData', function () {
    
//    this.url = "http://localhost:8000/";
//    this.urlImages = "http://localhost:8000/images/";
//    this.url = "http://10.0.0.4:8000/";
    this.urlImages = "http://10.0.0.6:8000/images/";
//    this.url = "http://192.168.43.210:8000/";
//    this.urlImages = "http://192.168.43.210:8000/images/";
    
    this.invitations = {}
    this.invitations.genres = ["Hombre", "Mujer", "Unisex"];
    this.invitations.types = ["Mementos", "Bautizos", "Matrimonios"];
    this.invitations.sizes = ["Postal", "Esquela", "Doble Postal", "Doble Esquela"];
    
    this.products ={
        categories: ["Invitaciones"]
    }
  });


