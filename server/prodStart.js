process.env.NODE_ENV = 'production';

var app = require('./app');

// Config
var config = require('./config/environment');

var port = process.env.PORT || 5000;

var server = app.listen(port, function () {
  console.log('TunariApp should be running at %s in %s mode.  Real port : %s',
      config.serverOptions.target, config.env, port);
});
