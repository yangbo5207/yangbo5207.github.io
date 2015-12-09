'use strict';

// base module
var
    rf = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    foreach = require('gulp-foreach'),

    // module width js
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    through = require('through2'),

    // module width css
    sass = require('gulp-sass'),
    csscomb = require('gulp-csscomb'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    cssbeautify = require('gulp-cssbeautify'),

    // module width images

    // catch error
    plumber = require('gulp-plumber'),

    paths = {
        htmlurl_start: ['**/!(_)*.{html,php}', '!{build, node_modules}/**'],
        htmlurl_watch: ['**/!(_)*.{html,php}'],
    	cssurl_start: 'css/**/*.{scss, less, sass}',
    	cssurl_end: 'css',
        cssurl_watch: 'css/**/*.{scss, less, sass}',
    	jsurl_start: ['js/**/!(_)*.js', '!js/{node_modules,bower_components}/**/*'],
    	jsurl_end: 'js',
        jsurl_watch: ['js/**/!(_)*.js', '!js/{node_modules,bower_components}/**/*']
    },

    // 补全css3属性前缀插件，浏览器版本设置
    autoprefixer_config = ['> 1%', 'Firefox >= 10', 'ie >= 9', 'iOS >= 4', 'Chrome >= 10'];

gulp.task('html', function() {
    return gulp.src(paths.htmlurl_start)
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(one())
        .pipe(livereload({
            quiet: true
        }))
        .pipe(notify({
            onLast: true,
            message: "browser reload for html"
        }));
});

gulp.task('css', function() {
	return gulp.src(paths.cssurl_start)
		.pipe(plumber({
			errorHandler: handleError
		}))
		.pipe(foreach(function(stream, file) {
			return stream.pipe(path.extname(file.relative) == '.less' ? less() : sass().on('error', sass.logError));
		}))
		.pipe(autoprefixer({
			browsers: autoprefixer_config,
			cascade: false
		}))
		.pipe(csscomb())
		.pipe(minifycss({
			aggressiveMerging: false,
            advanced: false,
            compatibility: 'ie7',
            keepBreaks: true
		}))
		.pipe(cssbeautify({
			autosemicolon: true
		}))
		.pipe(gulp.dest(paths.cssurl_end))
		.pipe(livereload({
			quiet: true
		}))
		.pipe(notify({
			onLast: true,
			message: 'Browser reload for css!'
		}));
});

gulp.task('js', function() {
	return gulp.src(paths.jsurl_start)
	.pipe(plumber({
		errorHandler: handleError
	}))
    .pipe(one())
	// .pipe(concat('core.js'))
    // .pipe(uglify())
	// .pipe(gulp.dest(paths.jsurl_end))
	.pipe(livereload({
		quiet: true
	}))
	.pipe(notify({
		onLast: true,
		message: 'Js concat success!'
	}))
});

gulp.task('watch', function() {
	livereload.listen();
    gulp.watch(paths.htmlurl_watch, ['html']);
	gulp.watch(paths.cssurl_watch, ['css']);
    gulp.watch(paths.jsurl_watch, ['js']);
});

// 默认任务
gulp.task('default', ['watch']);

// 错误处理
function handleError(err) {
    gutil.beep();
    gutil.log(err.toString());
    notify.onError("Error: <%= error.message %>")(err);
    this.emit('end');
}

/*!
 * @desc 合并多个文件流只执行最后一个
 * @author qiqiboy
 */
function one(callback) {
    var last;
    return through.obj(function(file, enc, cb) {
        last = file;
        cb();
    }, function(cb) {
        this.push(last);
        callback && callback();
        cb();
    });
}