var express = require('express');
var _ = require('underscore-node');

// Logger
var logger = require('./../logger/logger');

var sellingRouter = function(Selling){
	var router = express.Router();
	
	// Base route.
	router.route('/')
		.get(function(req, res, next) {
            Selling.find({}, function(err, sellings) {
				if (err) {
					logger.log('error',err);
					throw err;
				}
				
				logger.log('info','get sellings called');
				res.status(200).send(sellings);
			});
        })
        .post(function(req, res, next) {

            _.each(req.body.sellingItems, function(sellingItem){
               sellingItem.date = new Date().toISOString();        
            });
    
			var newSelling = new Selling(req.body);

			newSelling.save(function(err) {
				if (err) {
					logger.log('error',err);
					throw err;
				}
                else{
                    _.each(newSelling.sellingItems, function(sellingItem){
                        logger.log('info',
                            'sellingId:' + sellingItem._id + " " +       
                            'date:' + sellingItem.date + " " +
                            'product:' + sellingItem.product[0].name + " " +
                            'sellingProductQuantity:' + sellingItem.quantity + " " +
                            'productPrice:' + sellingItem.productPrice.value + " " +
                            'client:' + newSelling.client[0].name + " " +
                            'total:' + sellingItem.total + " " +
                            'revenue:' + sellingItem.revenue);
                    });
//                    logger.log('info','post selling called');
                    res.status(201).send(newSelling);
                }				                
			});
		}); ;
    
    return router
}

module.exports = sellingRouter;    