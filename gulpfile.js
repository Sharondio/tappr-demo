var gulp = require('gulp');
var args = require('yargs').argv;
var path = require('path');
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var connect = require('gulp-connect');

var app = './app/';
var scripts = app;
var temp = './.tmp/';

var config = {
    source: '',
    temp: temp,
    scripts: scripts,
    style: app + 'styles/',
    styleAppCss: app + 'styles/css/',
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
    log('Clean style: ' + config.style + 'css/*.css');
    var files = config.style + 'css/*.css';
    clean(files, done);

});

gulp.task('styles', ['clean-styles'], function () {
    log('Compile Less --> files to and place in: ' + config.styleAppCss);
    return gulp
        .src(config.styleLess)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.styleAppCss));
});

gulp.task('images', ['clean-images'], function () {
    log('Build: images and compress to  -->' + config.build + 'images');

    return gulp.src(config.images)
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('wiredep', function () {
    log('Wire dependencies: bower css, our app into index.html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        //.pipe(wiredep(options))
        //.pipe($.inject(gulp.src(config.main)))
        //.pipe(gulp.dest(config.app));
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
    gulp.watch([config.less], ['styles']);
});

// optimizers
gulp.task('optimize', ['inject'], function () {
    log('Optimizing the js, css, and html');

    var assets = $.useref.assets({searchPath: './'});
    // Filters are named for the gulp-useref path
    //var cssFilter = $.filter('**/*.css');
    //var jsAppFilter = $.filter('**/' + config.optimized.app);
    //var jslibFilter = $.filter('**/' + config.optimized.lib);
    //

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe(assets) // Gather all assets from the html with useref
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest(config.build));
});

gulp.task('test', ['vet'], function (done) {
    startTests(true /* single run */, done);
});

gulp.task('autotest', function (done) {
    startTests(false /*singleRun*/, done);
});

// Server
gulp.task('connect', function() {
    connect.server({
        port: 3000,
        root: 'app',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./app/*.html','./app/views/**/*.js','./app/styles/css/styles.css', './app/views/**/*.html'], ['html']);
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
