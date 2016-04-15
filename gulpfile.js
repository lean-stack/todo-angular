'use strict';

// the gulp task runner
var gulp = require('gulp');

// Gulp plugins
var $ = require('gulp-load-plugins')();

// NPM modules
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync').create();

// Main tasks

gulp.task('default',['build']);

gulp.task('build');
gulp.task('serve',['inject','watch'], serveTask);
gulp.task('test');

// Task runner

function serveTask() {
    browserSync.init({
      server: {
        baseDir: "./src",
        routes: {
          "/bower_components": "bower_components"
        }
      }
    })
}

// Secondary tasks

gulp.task('inject', function () {

    var appScripts = gulp.src(['./src/scripts/**/*.js']).pipe($.angularFilesort());

    return gulp.src('./src/index.html')
        .pipe(wiredep({ ignorePath: '../' }))
        .pipe($.inject(appScripts,{ ignorePath: 'src/', addRootSlash: false }))
        .pipe(gulp.dest('./src'));
});

gulp.task('watch', function(){
  gulp.watch(['./src/index.html'],browserSync.reload);
  gulp.watch(['./bower.json'],['inject'],browserSync.reload);
  $.watch(['./src/scripts/**/*.js'], function() {
    gulp.run(['inject']);
    browserSync.reload();
  });
  gulp.watch(['./src/styles/*.css'],browserSync.reload);
});
