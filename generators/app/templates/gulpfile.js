var gulp = require('gulp');
var stylus = require('gulp-stylus');
var less = require('gulp-less');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var pug = require('gulp-pug');
var autowatch = require('gulp-autowatch');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('stylus', function() {
    gulp.src('./styles/*.styl')
        .pipe(plumber())
        .pipe(stylus({
            'include css': true
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

gulp.task('less', function() {
    gulp.src('./styles/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

gulp.task('views', function() {
    gulp.src('./public/*.html')
        .pipe(clean())

    gulp.src('./views/templates/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('./public'))
        .pipe(livereload());
})

gulp.task('scripts', function() {
    gulp.src([
            './vendor/*.js',
            './libs/*.js',
            './services/*.js',
            './controllers/*.js',
            './configs/*.js',
            './app.js'
        ])
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js'))
        .pipe(livereload());
})

gulp.task('vendor', function() {
    gulp.src([
            './node_modules/ricejs/dist/rice.min.js',
            './bower_components/ricejs/dist/rice.min.js'
        ])
        .pipe(plumber())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    autowatch(gulp, {
        'views': './views/**/*.pug',
        'scripts': ['./**/*.js', './**/**/*.js', './**/**/**/*.js'],
        'stylus': ['./styles/*.styl', './styles/**/*.styl'],
        'less': ['./styles/*.less', './styles/**/*.less']
    });
});

gulp.task('default', ['vendor', 'scripts', 'views', 'stylus', 'less']);

gulp.task('live', ['vendor', 'scripts', 'views', 'stylus', 'less', 'watch']);
