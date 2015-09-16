// TODO: figure out the order of the CSS concat/compile/minify process with vendor libs.
var gulp = require('gulp');
var args = require('yargs').argv;
var path = require('path');
var del = require('del');
var bowerFiles = require('bower-files')();
var $ = require('gulp-load-plugins')({lazy: true});

var app = './app/';
var scripts = app;
var temp = './.tmp/';

var config = {
    source: '',
    temp: temp,
    scripts: scripts,
    images: app + 'images/**/*.*',
    index: app + 'index.html',
    main: [
        'app.js'
    ],
    js: [
        app + '**/*.js',
    ],
    alljs: [
        app + 'scripts/**/*.js',
        app + 'app.js'
    ],
    vendorjs: [
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './app/bower_components/'
    ],
    bower: {
        json: require('./bower.json'),
        directory: app +'bower_components/',
        ignorePath: '../..'
    },
    defaultPort: 8000,
};

gulp.task('default', ['help']);

gulp.task('vet', function () {
    log('Analyzing sources with JSHint and JSCS');
    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'), {verbose: true});
});


gulp.task('clean-styles', function () {
    log('Clean styles: ./app/styles/css/*.css');
    return del(['./app/styles/bundle.css']);
});

gulp.task('concat-css', function () {
    log('Concat CSS');
    return gulp
        .src('./app/styles/css/*.css')
        .pipe($.concatCss('bundle.css'))
        .pipe(gulp.dest('./app/styles'));
});

gulp.task('less-css', ['move-bootstrap-less'], function () {
    log('Less CSS');
    return gulp
        .src('./app/styles/less/styles.less')
        .pipe($.less())
        .pipe(gulp.dest('./app/styles/css'));
});

gulp.task('minify-css', function () {
    "use strict";
    log('Minify CSS');
    return gulp
        .src('./app/styles/bundle.css')
        .pipe($.sourcemaps.init())
        .pipe($.minifyCss())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./app/styles/'));
});

gulp.task('styles', ['clean-styles', 'concat-css'], function () {
    log('Compile Less --> ./app/styles/css');
    return gulp.src('./app/styles/less/*.less')
        .pipe($.less())
        .pipe(gulp.dest('./app/styles/css'))
});

gulp.task('concat-js', function () {
    log('Concat JS --> ./app/all.js');
    return gulp
        .src(config.alljs)
        .pipe($.concat('all.js'))
        .pipe(gulp.dest('./app'));
});

gulp.task('concat-bower', function() {
    log('Concat Bower --> ./app/bower.js');
    gulp
        .src(bowerFiles.ext('js').files)
        .pipe($.concat('bower.js'))
        .pipe(gulp.dest('./app'));
});

gulp.task('uglify-bower', function () {
    log('Uglify bower.js');
    gulp
        .src('./app/bower.js')
        .pipe($.uglify())
        .pipe(gulp.dest('./app'));
});

gulp.task('uglify-js', function () {
    log('Uglify all.js');
    gulp
        .src('./app/all.js')
        .pipe($.uglify())
        .pipe(gulp.dest('./app'));
});

gulp.task('build', ['styles', 'concat-js', 'concat-bower'], function () {
    log('Build');
});

gulp.task('build:prod', ['build', 'uglify-bower', 'uglify-js'], function () {
    log('Build --> production');
});

// Watchers
gulp.task('less-watcher', function () {
    gulp.watch(['./app/styles/less/*.less'], ['styles']);
});

gulp.task('watch', function () {
    gulp.watch(['./app/*.html', './app/**/*.html', './app/**/*.js', './app/styles/css/*.css'], ['reload']);
});

// Server
gulp.task('connect', function() {
    $.connect.server({
        port: 8000,
        root: 'app',
        livereload: true
    });
});

gulp.task('reload', ['build'], function () {
    gulp.src('./app/*.html')
        .pipe($.connect.reload());
});

gulp.task('serve', ['connect', 'watch']);

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
