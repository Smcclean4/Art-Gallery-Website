var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');

// simple call to gulp
gulp.task('hello', function () {
  console.log('hello world and stuff!');
})

// compile sass to css and load browserSync simultaneously
gulp.task('sass', function () {
  return gulp.src('project-content/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('project-content/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

// watch both browserSync and sass (browserSync first) and reload html and js on call for watch
gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('project-content/scss/**/*.scss', ['sass']);
  gulp.watch('project-content/*.html', browserSync.reload);
  gulp.watch('project-content/js/**/*.js', browserSync.reload);
})

// browserSync function to init the server with directory
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'project-content'
    },
  })
})

//store minified file of css and js
gulp.task('useref', function() {
  return gulp.src('project-content/*.html')
    .pipe(useref())
    .pipe(gulp.dest('minified-files'))
})

// using uglify to minify js and css
gulp.task('useref', function() {
  return gulp.src('project-content/*.html')
    .pipe(useref())
    // minify only if javascript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('minified-files'))
    // minify only if css file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('minified-files'))
})

//optimize photos files with image minify
gulp.task('images', function() {
  return gulp.src('project-content/images/**/*.+(png|jpg|gif|svg)')
    .pipe(gulp.dest('minified-files/images'))
})

// implementing fonts
gulp.task('fonts', function() {
  return gulp.src('project-content/fonts/**/*')
    .pipe(gulp.dest('minified-files/fonts'))
})
