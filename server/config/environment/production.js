'use strict';

// Production specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    //uri: 'mongodb://localhost/tunariDB-prodTest'
     uri: 'mongodb://admin:test1234@ds161495.mlab.com:61495/tunari'
  },
  loggingOptions: {
  	logDir: './../log'
  }
};