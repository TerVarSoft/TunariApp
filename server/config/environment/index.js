'use strict';

var _ = require('lodash');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var localConfig;

try {
  localConfig = require('./../local.env');
} catch(e) {
  localConfig = {};
}

// Main configuration
// All environments will share this configuration
var all = {
	env: process.env.NODE_ENV,
	serverOptions:{
		host: 'http://localhost',
		port: 8000
	},	
	clientOptions:{
		host: 'http://localhost',
		port: 9000
	}
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {},
  localConfig);

