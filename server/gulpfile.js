var gulp =require('gulp');
    nodemon = require('gulp-nodemon');

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        script: 'bin/www',
        ext: 'js',
        env: {
            PORT:8000
        },
        ignore:['./node_modules/**']
        
    })
    .on('restart', function(){
        console.log('Gulp is running on port 8000');
    });
});
