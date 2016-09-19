var express = require('express');

var config = require('./../config/environment');

var configRouter = function(){
	var router = express.Router();

	router.route('/')
		.get(function(req, res, next) {
			config.imgServer = 'http://localhost:8000/images/'
			res.status(200).sendWrapped(config);
		});

	return router;
}

module.exports = configRouter;  