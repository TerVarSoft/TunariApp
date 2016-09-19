process.env.NODE_ENV = 'development';

var gulp =require('gulp');
    nodemon = require('gulp-nodemon');

// Config
var config = require('./config/environment');

var port = config.serverOptions.target.split(':').pop();
if(config.env === "production")
{
    port = process.env.PORT || 5000;
}

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        script: 'bin/www',
        ext: 'js',
        env: {
            PORT: port
        },
        ignore:['./node_modules/**']
        
    })
    .on('start', function(){
        console.log('TunariApp server is listening at %s in %s mode', config.serverOptions.target, config.env);
    })
    .on('restart', function(){
        console.log('Files have been updated succesfully');
    });
});
