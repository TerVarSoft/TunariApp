'use strict';

// Use local.env.js for environmet variables related to
// your local machine settings, like your url or your secrets.

// This file should not be tracked by git.

module.exports = {	
	serverOptions:{
		host: 'http://localhost',
		port: 8000,
		target: 'http://localhost'
	},	
	clientOptions:{
		host: 'http://localhost',
		port: 9000
	}
};