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
var babel = require("gulp-babel");

gulp.task('stylus', function() {
    gulp.src('./<%= apppath  %>/styles/*.styl')
        .pipe(plumber())
        .pipe(stylus({
            'include css': true
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./<%= publicpath  %>/css'))
        .pipe(livereload());
});

gulp.task('less', function() {
    gulp.src('./<%= apppath  %>/styles/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./<%= publicpath  %>/css'))
        .pipe(livereload());
});

gulp.task('views', function() {
    gulp.src('./<%= publicpath  %>/*.html')
        .pipe(clean())

    gulp.src('./<%= apppath  %>/views/templates/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('./<%= publicpath  %>'))
        .pipe(livereload());
})

gulp.task('scripts', function() {
    gulp.src([
            './<%= apppath  %>/vendor/*.js',
            './<%= apppath  %>/libs/*.js',
            './<%= apppath  %>/services/*.js',
            './<%= apppath  %>/controllers/*.js',
            './<%= apppath  %>/configs/*.js',
            './<%= apppath  %>/app.js'
        ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ['env']}))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./<%= publicpath  %>/js'))
        .pipe(livereload());
})

gulp.task('vendor', function() {
    gulp.src([
            './node_modules/ricejs/dist/rice.min.js'
        ])
        .pipe(plumber())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./<%= publicpath  %>/js'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    autowatch(gulp, {
        'views': './<%= apppath  %>/views/**/*.pug',
        'scripts': ['./<%= apppath  %>/**/*.js', './<%= apppath  %>/**/**/*.js', './<%= apppath  %>/**/**/**/*.js'],
        'stylus': ['./<%= apppath  %>/styles/*.styl', './<%= apppath  %>/styles/**/*.styl'],
        'less': ['./<%= apppath  %>/styles/*.less', './<%= apppath  %>/styles/**/*.less']
    });
});

gulp.task('default', ['vendor', 'scripts', 'views', 'stylus', 'less']);

gulp.task('live', ['vendor', 'scripts', 'views', 'stylus', 'less', 'watch']);
