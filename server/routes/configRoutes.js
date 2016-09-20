var express = require('express');
var _ = require('lodash');

var configFile = require('./../config/environment');
var logger = require('./../logger/logger');

var configRouter = function(Setting){
	var router = express.Router();

	router.route('/')
		.get(function(req, res, next) {

            Setting.find({}, function(err, settings) {
                var config = _.clone(configFile);
                if (err) {
                    logger.log('error',err);
                    res.status(500).send(err);
                }

                _.forEach(settings, function(setting){
                    config[setting.key] = setting.value;
                });

                res.status(200).sendWrapped(config);
            })
            .sort('name');
		})
        .post(function(req, res, next) {

            Setting.findOneAndUpdate({_id: req.body._id}, {key: req.body.key, value: req.body.value},
                {new:true}, function(error, result) {
                if (!error) {
                    // If the document doesn't exist
                    if (!result) {
                        // Create it
                        result = new Setting(req.body);
                        result.save(function(error) {
                            if (error) {
                                logger.log('error',error);
                                throw error;
                            }

                            logger.log('info','post settings called');
                            logger.log('info',req.body.key);

                        });
                    }

                    res.status(201).sendWrapped(result);
                }
            });
        });

	return router;
}

module.exports = configRouter;  