var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');

gulp.task('default', function() {
  // place code for your default task here
  console.log('gulp');
});

gulp.task('jshint', function() {
  return gulp.src(['src/js/**/*.js','test/js/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function(){
  return gulp.src('test/js/**-spec.js').pipe(jasmine());
});
