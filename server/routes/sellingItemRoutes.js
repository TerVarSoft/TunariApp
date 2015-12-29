var express = require('express');

// Logger
var logger = require('./../logger/logger');

var sellingItemRouter = function(SellingItem){
	var router = express.Router();
	
	// Base route.
	router.route('/')
		.get(function(req, res, next) {

			SellingItem.count(req.query, function(err, count){

	            SellingItem.find(req.query, function(err, sellingItems) {
					if (err) {
						logger.log('error',err);
						throw err;
					}
					
					logger.log('info','get selling items called');
					res.status(200).sendWrapped({
						meta: {
                            count: count   
                        },
						items: sellingItems
					});
				});
			});
        })
        .post(function(req, res, next) {

			var newSellingItem = new SellingItem(req.body);

			newSellingItem.save(function(err) {
				if (err) {
					logger.log('error',err);
					throw err;
				}
				
				logger.log('info','post sellingItem called');
				res.status(201).sendWrapped(newSellingItem);
			});
		}); ;
    
    return router
}

module.exports = sellingItemRouter;    