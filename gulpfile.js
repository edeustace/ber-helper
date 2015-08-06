var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  jasmine = require('gulp-jasmine-phantom'),
	clean = require('gulp-clean'),
	zip = require('gulp-zip');

gulp.task('default', function() {
});

gulp.task('clean', function() {
	return gulp.src('dist/*', {read: false})
		.pipe(clean());
});

gulp.task('jshint', function() {
  return gulp.src(['src/js/**/*.js','test/js/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function(){
  return gulp.src(['src/js/**/*.js', 'test/js/**-spec.js'])
  .pipe(jasmine({
    integration: true,
    vendor: [
      'bower_components/jquery/dist/jquery.min.js'
    ]
  }));
});
