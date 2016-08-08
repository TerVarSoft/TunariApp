'use strict';

/**
 * @ngdoc service
 * @name clientApp.sellingItemInfo
 * @description
 * # sellingItemInfo
 * Service in the clientApp.
 */
angular.module('tunariApp')
  .service('SellingItemInfo', [function () {
    
    this.updateProperties = function(sellingItem) { 
	  var pricePerUnity = sellingItem.productPrice.type != 'Unidad' ?
	                      sellingItem.productPrice.value / sellingItem.product.properties.quantityPerPackage :
	                      sellingItem.productPrice.value;

	  sellingItem.total = sellingItem.quantity * pricePerUnity;
	  sellingItem.total = parseFloat(sellingItem.total.toFixed(1));
	  this.updateRevenue(sellingItem);
	}

	this.updateRevenue = function(sellingItem) {
	  var pricePerUnity = sellingItem.productPrice.type != 'Unidad' ?
	                    sellingItem.productPrice.value / sellingItem.product.properties.quantityPerPackage :
	                    sellingItem.productPrice.value;

	  var buyingPricePerUnity = sellingItem.product.buyingPrice.type != 'Unidad' ?
	                    sellingItem.product.buyingPrice.value / sellingItem.product.properties.quantityPerPackage :
	                    sellingItem.product.buyingPrice.value;

	  sellingItem.revenue = sellingItem.total -
      sellingItem.quantity * buyingPricePerUnity;
	  sellingItem.revenue = parseFloat(sellingItem.revenue.toFixed(1));
	}
  }]);
