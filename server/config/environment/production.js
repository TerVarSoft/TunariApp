'use strict';

// Production specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
     uri: 'mongodb://admin:test1234@ds161495.mlab.com:61495/tunari'
  },
  serverOptions:{
     target: 'https://servertunari.herokuapp.com/'
  },
  loggingOptions: {
  	logDir: './log'
  }
};