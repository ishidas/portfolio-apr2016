'use strict';
//if you wanna attach karma star to gulp, you can, but make sure bundle first and make sure it finishes before running test
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const paths = ['*.js', 'test/*.js', 'app/*.js', 'app/templates/*.js', 'app/**/*.html', 'app/**/*.scss'];
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const minifyCSS = require('gulp-minify-css');
// const urlAdjuster = require('gulp-css-url-adjuster');
const source = {
  html: __dirname + '/app/**/*.html',
  js: __dirname + '/app/index.js',
  test: __dirname + '/test/*_spec.js',
  directive: __dirname + '/app/*.js',
  sass: __dirname + '/app/**/*.scss',
  img: __dirname + '/app/**/*.png',
  turner: __dirname + '/app/lib/*'
};

gulp.task('copy-turner', ()=>{
  return gulp.src(source.turner)
    .pipe(gulp.dest('./build/lib/'));
});

gulp.task('sassy:dev', ()=>{
  gulp.src(__dirname + '/app/sass/*.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('img', ()=>{
  return gulp.src(source.img)
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('copy', ()=>{
  return gulp.src([source.html,source.img])
    .pipe(gulp.dest('./build'));
});

gulp.task('bundle:test', ()=>{
  return gulp.src(source.test)
    .pipe(webpack({
      watch: true,
      output: {
        filename: 'test_bundle.js'
      },
      module: {
        loaders: [
          {test:  /\.scss$/, loaders: ['style', 'css', 'sass']}
        ]
      }
    }))
    .pipe(gulp.dest('./test'));
});

gulp.task('bundle:dev', function(){
  return gulp.src(source.directive)
  .pipe(webpack({
    watch: true,
    output: {
      filename: 'bundle.js'
    },
    module: {
      loaders: [{test: /\.(png|jpg|gif)$/,
          loader: 'file-loader?name=img/img-[hash:6].[ext]'},
        { test: /\.css$/, loader: 'style!css' }
      ]
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('eslint', function(){
  return gulp.src(paths)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('test', function(){
  return gulp.src( __dirname + '/test/test.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watcher', function(){
  gulp.watch( paths, ['bundle:dev','sassy:dev']);
});

gulp.task('default', ['copy-turner', 'copy', 'sassy:dev', 'bundle:dev','img']);
