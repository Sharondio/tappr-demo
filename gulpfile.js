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
    styleAppCss: app + 'styles/css/',
    styleBootstrapLess: '/node_modules/bootstrap/less/',
    styleCss: 'styles/css/',
    styleLess: app + 'styles/less/styles.less',
    images: app + 'images/**/*.*',
    getWiredepDefaultOptions: '',
    index: app + 'index.html',
    main: [
        'app.js'
    ],
    app: app,
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
    server: ''
};

config.getWiredepDefaultOptions = function () {
    return {
        bowerJson: config.bower.json,
        directory: config.bower.directory,
        ignorePath: config.bower.ignorePath
    };
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
    log('Compile Bootstrap styles --> ' + config.styleAppCss);
    gulp
        .src(config.styleBootstrapLess)
        .pipe($.less())
        .pipe(gulp.dest(config.styleAppCss));
});

gulp.task('styles', ['clean-styles', 'bootstrap-styles'], function () {
    log('Compile Less --> files to and place in: ' + config.styleAppCss);
    return gulp
        .src(config.styleLess)
        .pipe($.less())
        .pipe(gulp.dest(config.styleAppCss));
});

gulp.watch(['./app/styles/less/*.less'], ['styles']);

gulp.task('wiredep', function () {
    log('Wire dependencies: bower css, our app into index.html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.main)))
        .pipe(gulp.dest(config.app));
});

gulp.task('inject', ['wiredep', 'styles'], function () {
    log('Wire up the app css into the html and call wiredep');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.styleCss + '*.css')))
        .pipe(gulp.dest(config.app));
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
