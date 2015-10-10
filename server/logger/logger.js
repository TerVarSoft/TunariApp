// Winston
var winston = require('winston');
var fs = require( 'fs' );

var logDir = 'log';
if ( !fs.existsSync( logDir ) ) {
	// Create the directory if it does not exist
	fs.mkdirSync( logDir );
}



var logger = new (winston.Logger)({
transports: [
  new (winston.transports.File)(
        { 
          filename: logDir + '/tunariApp.log',   
          timestamp: function() {
            return new Date().toISOString();
          },
          json: false,
          formatter: function(options) {
        // Return string will be passed to logger.
        return options.timestamp() +'|'+ options.level.toUpperCase() +'|'+ (undefined !== options.message ? options.message : '');
      }
        })
]
});

module.exports = logger; 