'use strict';

/**
 * @ngdoc service
 * @name clientApp.serverData
 * @description
 * # serverData
 * Service in the clientApp.
 */
angular.module('tunariApp')
  .service('ServerData', ['Config', function (Config) {
    
    this.urlImages = Config.serverOptions.host + ":" + Config.serverOptions.port + "/images/";
    
    this.invitations = {}
    this.invitations.genres = ["Hombre", "Mujer", "Unisex"];
    this.invitations.types = ["Mementos", "Bautizos", "Matrimonios"];
    this.invitations.sizes = ["Postal", "Esquela", "Doble Postal", "Doble Esquela"];
    
    this.products ={
        categories: ["Invitaciones"]
    }
  }]);


