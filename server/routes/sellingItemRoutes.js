var express = require('express');

// Logger
var logger = require('./../logger/logger');

var sellingItemRouter = function(SellingItem){
	var router = express.Router();
	
	// Base route.
	router.route('/')
		.get(function(req, res, next) {
            SellingItem.find({}, function(err, sellingItems) {
				if (err) {
					logger.log('error',err);
					throw err;
				}
				
				logger.log('info','get selling items called');
				res.status(200).send(sellingItems);
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
				res.status(201).send(newSellingItem);
			});
		}); ;
    
    return router
}

module.exports = sellingItemRouter;    