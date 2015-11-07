var app = require('./app');

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('TunariApp listening at port: %s', port);
});
