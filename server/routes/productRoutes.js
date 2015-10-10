var express = require('express');
var _ = require('underscore-node');
var routesUtil = require('./routesUtilities');

// Logger
var logger = require('./../logger/logger');

var productRouter = function(Product){
	var router = express.Router();
	
	// Base route.
	router.route('/')
		.get(function(req, res, next) {
			
			var query = {};
			if (req.query.tags){
				query = routesUtil.buildQuery(req.query);
			}
			
			Product.find(query, function(err, products) {
				if (err) {
					logger.log('error',err);
					throw err;
				}
				
				res.status(200).send(products);
			})
            .sort('name')
            .limit(50);;
		})
		.post(function(req, res, next) {

			var newProduct = new Product(req.body);

			newProduct.save(function(err) {
				if (err) {
					logger.log('error',err);
					throw err;
				}
                else {                    
				    res.status(201).send(newProduct);
                }
			});
		});        
    
    router.route('/log')
        .get(function (req, res, next) {
        
            Product.find({}, function(err, products) {
				if (err) {
					logger.log('error',err);
					throw err;
				}
				else{
                    logger.log('info','Beginning products Logging');
                    
                    _.each(products, function(product){
                        logger.log('info',
                            'productId:' + product._id + ' ' +
                            'product:' + product.name + ' ' +
                            'wareHouseQuantity:' + product.quantity);
                    });
                    logger.log('info','Finished products Logging');
                    
				    res.status(200).send('Products logged');
                }
			})
            
            
        }); 
    
    
    router.use('/:productId', function(req, res, next){
        Product.findById(req.params.productId, function(err, product){
            if(err)
                res.status(500).send(er);
            else if(product){
                req.product = product;
                next();
            }
            else{
                res.status(404).send('no product found');                
            }
        });            
    });
    
    router.route('/:productId')
        .get(function(req, res){
            res.json(req.product);
        })        
        .put(function(req, res){ 
            req.product.name = req.body.name;
            req.product.price = req.body.price;
            req.product.category = req.body.category;
            req.product.tags = req.body.tags;
            req.product.properties = req.body.properties;
            req.product.buyingPrice = req.body.buyingPrice;
            req.product.prices = req.body.prices;
            req.product.imageUrl = req.body.imageUrl;
            req.product.provider = req.body.provider;
            req.product.quantity = req.body.quantity;
            req.product.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.product);       
                    logger.log('info',
                        'productId:' + req.product._id + ' ' +
                        'product:' + req.product.name + ' ' +
                        'wareHouseQuantity:' + req.product.quantity);
                }
            });                                        
        })
        .patch(function(req, res){ 
            if(req.body._id)
                delete req.body._id;
        
            for(var key in req.body){
                req.product[key] = req.body[key];
            }
            req.product.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.product);                    
                }
            });
        })
        .delete(function(req, res){
            req.product.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');                    
                }                
            });        
        });
    
    
	return router
}

module.exports = productRouter;
