var express = require('express');
var _ = require('underscore-node');
//var jwt = require('./../services/jwt.js')
var jwt = require('jwt-simple')
var routesUtil = require('./routesUtilities');


// Logger
var logger = require('./../logger/logger');

var userRouter = function(User){

	var router = express.Router();

	router.route('/')
		.get(function(req, res, next) {

			User.count({}, function(err, count){

				User.find({}, function(err, users) {
	    				if (err) {
	    					logger.log('error',err);
	    					throw err;
	    				}
	    				
	    				res.status(200).sendWrapped({
	                        meta: {
	                            count: count   
	                        },
	                        items: users
	                    });
	    			});
			});
		})
		.post(function(req, res, next) {
			var newUser = new User(req.body);


			var searchUser = {name: newUser.name};
			User.findOne(searchUser, function(err, user){
				if(err) {
					throw err;
				}

				if(user) {
					res.status(401).send({message:"El nombre de usario " + user.name + " ya existe, por favor elija otro nombre"});
				}
				else {
					var payload = {
						iss: req.hostname,
						sub: newUser.id
					};
					var token = jwt.encode(payload, "shhh...");

					newUser.save(function(err) {
						if (err) {
							logger.log('error',err + "");
		                    /*if(err.code = 11000){
		                        // Product name already exists
		    					res.status(409).send(err);
		                    }
		                    else {
		                        res.status(500).send(err);
		                    }*/
		                    res.status(500).send(err);
						}
		                else {                    
		                    res.status(201).sendWrapped({
		                    	user: newUser.toJSON(),
		                    	token: token	
		                    });
		                    logger.log('info',
		                        'new User created!:' + newUser.name);
		                }
					});
				}
			});
		});

	return router;
}


module.exports = userRouter;
