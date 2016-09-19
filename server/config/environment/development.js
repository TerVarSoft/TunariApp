'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/tunariDB-dev'
  },
  loggingOptions: {
  	logDir: './log'
  }
};