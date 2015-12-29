var express = require('express');

// Logger
var logger = require('./../logger/logger');

var clientRouter = function(Client){
	var router = express.Router();
	
	// Base route.
	router.route('/')
		.get(function(req, res, next) {
            Client.count(req.query, function(err, count){

                Client.find(req.query, function(err, clients) {
    				if (err) {
    					logger.log('error',err);
    					res.status(500).send(err);
    				}
    				
    				res.status(200).sendWrapped({
                        meta: {
                            count: count   
                        },
                        items: clients
                    });
    			})
                .sort('name');
            });
        })
        .post(function(req, res, next) {

			var newClient = new Client(req.body);

			newClient.save(function(err) {
				if (err) {
					logger.log('error',err);
					throw err;
				}
				
				logger.log('info','post clients called');
				res.status(201).sendWrapped(newClient);
			});
		});
    
    router.use('/:clientId', function(req, res, next){
        Client.findById(req.params.clientId, function(err, client){
            if(err)
                res.status(500).send(er);
            else if(client){
                req.client = client;
                next();
            }
            else{
                res.status(404).send('no client found');                
            }
        });            
    });
    
    router.route('/:clientId')
        .get(function(req, res){
            res.sendWrapped(req.client);
        })
        .put(function(req, res){          
            req.client.name = req.body.name;
            req.client.phone = req.body.phone;
            req.client.cellphone = req.body.cellphone;
            req.client.address = req.body.address;
            req.client.sampleBook = req.body.sampleBook;
            req.client.productSamples = req.body.productSamples;
            
            req.client.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.sendWrapped(req.client);                    
                }
            });                                        
        })
        .delete(function(req, res){
            req.client.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');                    
                }                
            });        
        });
    
    return router
}

module.exports = clientRouter;    