process.env.NODE_ENV = 'development';

var gulp =require('gulp');
    nodemon = require('gulp-nodemon');

// Config
var config = require('./config/environment');

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        script: 'bin/www',
        ext: 'js',
        env: {
            PORT: config.serverOptions.port
        },
        ignore:['./node_modules/**']
        
    })
    .on('start', function(){
        console.log('TunariApp server is listening at %s:%d in %s mode', config.serverOptions.host, config.serverOptions.port, config.env);
    })
    .on('restart', function(){
        console.log('Files have been updated succesfully');
    });
});
