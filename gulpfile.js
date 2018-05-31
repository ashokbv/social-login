'use strict';

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function () {
    return new Promise(function (resolve, reject) {
        nodemon({
                script: 'server.js',
                ext: 'html js',
                ignore: ['node_modules/**/*','client/**/*', 'gulpfile.js', '.vscode/**/*', 'package.json']
            })
            .on('restart', function () {
                console.log('restarted!');
            });
        resolve();
    });
})
