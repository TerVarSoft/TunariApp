'use strict';

// Production specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/tunariDB'
  },
  loggingOptions: {
  	logDir: './../log'
  }
};