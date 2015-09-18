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
        app + '**/*.js'
    ],
    alljs: [
        app + 'scripts/**/*.js',
        app + 'app.js'
    ],
    defaultPort: 8000
};

gulp.task('default', ['help']);

gulp.task('vet', function () {
    log('TASK: Analyzing sources with JSHint and JSCS');
    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'), {verbose: true});
});


gulp.task('clean-styles', function () {
    log('TASK: Clean styles: ./app/styles/css/*.css');
    return del(['./app/styles/bundle.css']);
});

gulp.task('styles', ['clean-styles'], function () {
    log('TASK: Compile Less --> ./app/styles/css');

    var cssFiles = gulp.src('./app/styles/less/*.less')
        .pipe($.less())
        .pipe(gulp.dest('./app/styles/css'));

    return gulp.src('./app/index.html')
        .pipe($.inject(cssFiles, {relative: true}))
        .pipe(gulp.dest('./app'));
});

gulp.task('concat-js', function () {
    log('TASK: Concat JS --> ./app/all.js');
    return gulp
        .src(config.alljs)
        .pipe($.concat('all.js'))
        .pipe(gulp.dest('./app'));
});

gulp.task('concat-bower', function() {
    log('TASK: Concat Bower --> ./app/bower.js');
    gulp
        .src(bowerFiles.ext('js').files)
        .pipe($.concat('bower.js'))
        .pipe(gulp.dest('./app'));
});

gulp.task('uglify-bower', function () {
    log('TASK: Uglify bower.js');
    gulp
        .src('./app/bower.js')
        .pipe($.uglify())
        .pipe(gulp.dest('./app'));
});

gulp.task('uglify-js', function () {
    log('TASK: Uglify all.js');
    gulp
        .src('./app/all.js')
        .pipe($.uglify())
        .pipe(gulp.dest('./app'));
});

gulp.task('build', ['styles', 'concat-js', 'concat-bower'], function () {
    log('TASK: Build');
});

gulp.task('build:prod', ['build', 'uglify-bower', 'uglify-js'], function () {
    log('TASK: Build:prod --> production');
});

// Watchers
gulp.task('less-watcher', function () {
    log('WATCH: less files --> running styles task');
    gulp.watch(['./app/styles/less/*.less'], ['styles']);
});

gulp.task('watch', function () {
    console.log('WATCH: js files --> running reload');
    gulp.watch(['./app/*.html', './app/**/*.html', './app/**/*.js', './app/styles/css/*.css'], ['reload']);
});

// Server
gulp.task('connect', function() {
    return $.connect.server({
        port: 8000,
        root: 'app',
        livereload: true
    });
});

gulp.task('open', function () {
    var options = {
        uri: 'http://localhost:8000/'
    };

    gulp.src('./app/index.html') //this must be a valid and existing path.
        .pipe($.open(options));
});

gulp.task('reload', ['build'], function () {
    return gulp.src('./app/*.html')
        .pipe($.connect.reload());
});

gulp.task('serve', ['build', 'connect', 'open', 'watch', 'less-watcher']);

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
