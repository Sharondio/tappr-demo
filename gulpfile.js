var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');

// JS hint task
gulp.task('jshint', function() {
    gulp.src('./src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

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
    gulp.watch([config.less], ['styles']);
});

gulp.task('build', ['optimize'], function () {

});