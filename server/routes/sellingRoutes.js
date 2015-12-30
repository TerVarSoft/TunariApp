var express = require('express');
var _ = require('underscore-node');

// Logger
var logger = require('./../logger/logger');

var sellingRouter = function(Selling){
	var router = express.Router();
	
	// Base route.
	router.route('/')
		.get(function(req, res, next) {

			var query = {};

			if(req.query.from && req.query.to){
				query = {
					date: {
					    $gte: req.query.from,
					    $lte: req.query.to
				  	}
				}
			}

			Selling.count(query, function(err, count){

	            Selling.find(query, function(err, sellings) {
					if (err) {
						logger.log('error',err);
						res.status(500).send(err);
					}
					
					logger.log('info','get sellings called');
					res.status(200).sendWrapped({
						meta: {
                            count: count   
                        },
						items: sellings
					});
				})			
				.sort("-date");
			});
        })
        .post(function(req, res, next) {

			var newSelling = new Selling(req.body);

			newSelling.date = new Date();
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

                    res.status(201).sendWrapped(newSelling);
                }				                
			});
		}); ;
    
    return router
}

module.exports = sellingRouter;    