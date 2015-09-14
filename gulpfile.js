var gulp = require('gulp');
var args = require('yargs').argv;
var path = require('path');
var del = require('del');
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
        scripts + '**/*.js',
        app + 'app.js'
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

gulp.task('clean-styles', function (done) {
    log('Clean style: ' + config.style + 'css/*.css', done);
    clean('./app/styles/css/*.css', done);
});

gulp.task('bootstrap-styles', function () {
    log('Compile Bootstrap styles --> ' + './app/styles/css/');
    return gulp
        .src('./node_modules/bootstrap/dist/css/*.min.css')
        .pipe(gulp.dest('./app/styles/css'));
});

gulp.task('styles', ['clean-styles', 'bootstrap-styles'], function () {
    log('Compile Less --> files to and place in: ./app/styles/css');
    var stream = gulp.src('./app/styles/less/*.less')
        .pipe($.less())
        .pipe(gulp.dest('./app/styles/css'))
    return stream;
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

gulp.task('reload', function () {
    gulp.src('./app/*.html')
        .pipe($.connect.reload());
});

gulp.task('serve', ['connect', 'watch']);

function clean(path, done) {
    log('Cleaning ' + path);
    del(path, done);
}

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
