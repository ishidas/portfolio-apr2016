'use strict';
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const paths = ['*.js', 'test/*.js'];


gulp.task('test', function(){
  return gulp.src(paths, {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watcher', function(){
  gulp.watch( __dirname + '/**/*.js', ['test']);
});
