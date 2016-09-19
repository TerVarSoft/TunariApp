'use strict';

// Use local.env.js for environmet variables related to
// your local machine settings, like your url or your secrets.

// This file should not be tracked by git.

module.exports = {	
	serverOptions:{
        target: 'http://localhost:8000'
	},	
	clientOptions:{
		host: 'http://localhost',
		port: 9000
	}
};