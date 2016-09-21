var express = require('express');
var _ = require('lodash');

var config = require('./../config/environment');
var logger = require('./../logger/logger');

var configRouter = function(Setting){
	var router = express.Router();

	router.route('/')
		.get(function(req, res, next) {

            Setting.find({}, function(err, settings) {
                if (err) {
                    logger.log('error',err);
                    res.status(500).send(err);
                }

                _.forEach(config, function(value, key) {
                	settings.push({key:key, value: value});
                });

                res.status(200).sendWrapped({items:settings});
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

    router.use('/:settingId', function(req, res, next){
        Setting.findById(req.params.settingId, function(err, setting){
            if(err)
                res.status(500).send(err);
            else if(setting){
                req.setting = setting;
                next();
            }
            else{
                res.status(404).send('no product found');                
            }
        });            
    });
    
    router.route('/:settingId')
        .get(function(req, res){
            res.sendWrapped(req.setting);
        })        
        .put(function(req, res){ 
            req.setting.key = req.body.key;
            req.setting.value = req.body.value;
            
            req.setting.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{     
                    res.sendWrapped(req.setting);
                    logger.log('info',
                        'settingId:' + req.setting._id + ' ' +
                        'setting:' + req.setting.key + ' ');                        
                }
            });                                        
        });

	return router;
}

module.exports = configRouter;  