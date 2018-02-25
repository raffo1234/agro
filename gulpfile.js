var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var connect = require("gulp-connect");
var source = require("vinyl-source-stream");
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var scss = require('gulp-scss');
var minifyCSS = require('gulp-minify-css');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

gulp.task('es6', () => {
  var bundler = browserify({
    entries: 'app/js/app.js',
    debug: true
  });
  bundler.transform(babelify);

  bundler.bundle()
    .on('error', function (err) { console.error(err); })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    // .pipe(uglify()) // Use any gulp plugins you want now
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/build'));
});

gulp.task('styles', function() {
  gulp.src(['app/scss/app.scss'])
    .pipe(scss())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/build'))
})

gulp.task('html', function() {
  gulp.src("app/*.html")
      .pipe(gulp.dest('dist/'))
})

gulp.task('php', function() {
  gulp.src("app/*.php")
      .pipe(gulp.dest('dist/'))
})

var fontName = 'icons';
gulp.task('iconfont', function() {
    gulp.src(['app/icons/*.svg'])
      .pipe(iconfontCss({
        fontName: fontName,
        targetPath: 'scss/_icons.scss',
        fontPath: 'app/fonts/'
      }))
      .pipe(iconfont({
        fontName: fontName,
        formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
        normalize: true,
        fontHeight: 1001
      }))
      .pipe(gulp.dest('app/fonts/'))
      .pipe(gulp.dest('dist/build/app/fonts/'))
  });

gulp.task('default', function() {
    gulp.run( 'styles', 'es6', 'html', 'php', 'iconfont');

    gulp.watch('app/js/**', function(event) {
        gulp.run('es6');
    })

    gulp.watch('app/scss/**', function(event) {
        gulp.run('styles');
    })

    gulp.watch('app/**/*.html', function(event) {
        gulp.run('html');
    })

    gulp.watch('app/**/*.php', function(event) {
        gulp.run('php');
    })

    gulp.watch('app/icons/*.svg', function(event) {
        gulp.run('iconfont');
    })
})
