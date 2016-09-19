'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/tunariDB-dev'
  },
  serverOptions:{
    target: 'http://localhost:8000'
  },
  loggingOptions: {
  	logDir: './log'
  }
};