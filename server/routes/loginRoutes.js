var express = require('express');
var jwt = require('jwt-simple')


var loginRouter = function(User){
	var router = express.Router();

	router.route('/')
		.post(function (req, res, next) {
			req.user = req.body;

			var searchUser = {name: req.user.name};
			User.findOne(searchUser, function(err, user){
				if(err) {
					throw err;
				}

				if(!user) {
					return res.status(401).send({message:"Email/password incorrectos"});
				}

				user.comparePasswords(req.user.password, function(err, isMatch) {
					if(err) {
						throw err;
					}

					if(isMatch) {

						var payload = {
							iss: req.hostname,
							sub: user.id
						};
						var token = jwt.encode(payload, "shhh...");

						res.status(200).sendWrapped({
	                    	user: user.toJSON(),
	                    	token: token	
	                    });
					}
					else {
						res.status(401).send({message:"Email/password incorrectos"});
					}	
				});
			})		
	});
	return router
}

module.exports = loginRouter;
