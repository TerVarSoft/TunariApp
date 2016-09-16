process.env.NODE_ENV = 'production';

var app = require('./app');

// Config
var config = require('./config/environment');

var port = config.serverOptions.target.split(':').pop();
if(config.env === "production")
{
	port = process.env.PORT || 5000;
}

var server = app.listen(port, function () {
//  var host = server.address().address;
//  var port = server.address().port;

  console.log('TunariApp is running at %s in %s mode', config.serverOptions.target, config.env);
});
