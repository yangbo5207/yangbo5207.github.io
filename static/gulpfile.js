'use strict';

var rf = require("fs");
var path = require("path");
var through = require("through2");
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var gutil = require('gulp-util');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var csscomb = require('gulp-csscomb');
var cssbeautify = require('gulp-cssbeautify');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var header = require('gulp-header');
var footer = require('gulp-footer');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var imgcache = require('gulp-imgcache');
var notify = require("gulp-notify");
var foreach = require("gulp-foreach");
var amdOptimize = require('amd-optimize');
var sass = require("gulp-sass");
var hash = require('gulp-hash');
var sort = require('gulp-sort');
var replace = require('gulp-replace');
var rsync = require('gulp-rsync');
var babel = require("gulp-babel");
var cache = require('gulp-cached');

// 图像处理
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var spritesmith = require('gulp.spritesmith');

//错误捕获
var plumber = require('gulp-plumber');

//命令行参数
var argv = require('optimist').argv;

var pkg = require('./package.json');
var cdnHost = pkg.cdn.host;
var cdnPath = '/' + pkg.cdn.path.split('/').filter(function(name) {
    return !!name;
}).join('/') || '/activity-demo';
var cdnUrl = cdnHost + cdnPath;

// 设置相关路径
var paths = {
    html: 'category',
    css: 'css',
    js: 'js',
    img: 'images',
    // build: 'dist',
    configFile: 'config.static.json',
    corejs: 'js/core.js'
};

var oldStaticConfig
try {
    oldStaticConfig = require(paths.configFile) || {};
} catch (e) {
    oldStaticConfig = {};
}

var comment = "/*!\n * " + ['@author: ' + pkg.author].join("\n * ") + "\n */\n\n";
var autoprefixer_config = ['> 1%', 'Firefox >= 10', 'ie >= 9', 'iOS >= 4', 'Chrome >= 10'];
var configjs = paths.js + '/libs/config.js';
var requirejsConfigString = rf.readFileSync(configjs, 'utf-8').replace(/[\t\r\s\n\s]/g, '');
var mathPaths = requirejsConfigString.match(/config=({.+})if\(/);
var requirejsConfig = eval('(' + mathPaths[1].replace(/\/static\//, '') + ')');
var requirejsConfigCorejs = eval('(' + mathPaths[1].replace(/\/static\//, '') + ')');
delete requirejsConfigCorejs.exclude; //core.js压缩去掉exclude参数

//corejs paths
var corejsPaths = [paths.js + '/libs/require.js', configjs, paths.js + '/libs/core.js'];

function handleError(err) {
    gutil.beep();
    gutil.log(err.toString());
    notify.onError("Error: <%= error.message %>")(err);
    this.emit('end');
}

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

gulp.task('css', function() {
    var src = paths.css + '/**/!(_)*.{less,sass,scss}';
    return gulp.src(src)
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(cache('css'))
        .pipe(foreach(function(stream, file) {
            return stream
                .pipe(path.extname(file.relative) == '.less' ? less() : sass().on('error', sass.logError));
        }))
        .pipe(autoprefixer({
            cascade: false,
            browsers: autoprefixer_config
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
        .pipe(gulp.dest(paths.css))
        .pipe(livereload({
            quiet: true
        }))
        .pipe(notify({
            onLast: true,
            message: "browser reload for css"
        }));
});

gulp.task('cssAll', function() {
    var src = paths.css + '/**/!(_)*.{less,sass,scss}';
    return gulp.src(src)
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(foreach(function(stream, file) {
            return stream
                .pipe(path.extname(file.relative) == '.less' ? less() : sass().on('error', sass.logError));
        }))
        .pipe(autoprefixer({
            cascade: false,
            browsers: autoprefixer_config
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
        .pipe(gulp.dest(paths.css))
        .pipe(livereload({
            quiet: true
        }))
        .pipe(notify({
            onLast: true,
            message: "browser reload for css"
        }));
});

gulp.task('buildCss', function() {
    return gulp.src([paths.css + '/**/!(_)*.{less,scss,sass}'])
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(foreach(function(stream, file) {
            return stream
                .pipe(path.extname(file.relative) == '.less' ? less() : sass().on('error', sass.logError));
        }))
        .pipe(autoprefixer({
            cascade: false,
            browsers: autoprefixer_config
        }))
        .pipe(csscomb())
        .pipe(minifycss({
            compatibility: 'ie7',
            keepSpecialComments: 0,
            keepBreaks: false
        }))
        .pipe(header(comment))
        .pipe(gulp.dest(paths.css))
        .pipe(notify({
            onLast: true,
            message: "build css complete!"
        }));
});

gulp.task('js', function() {
    var src = paths.js + '/**/!(*_es6|_*).js';
    return gulp.src([src, '!' + paths.js + '/{libs,node_modules,bower_components}/**/*', '!' + paths.js + '/core.js'])
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(one())
        .pipe(livereload({
            quiet: true
        }))
        .pipe(notify({
            onLast: true,
            message: "browser reload for js"
        }));
});

gulp.task('es6js', function() {
    var src = [paths.js + '/**/*_es6.js'];
    return gulp.src(src)
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(foreach(function(stream, file) {
            return stream.pipe(rename(file.relative.replace(/_es6/gi, '')));
        }))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(paths.js))
        .pipe(notify({
            onLast: true,
            message: "transform es6-js success!"
        }));
});

gulp.task('corejs', function() {
    var name = path.basename(paths.corejs, '.js');

    return gulp.src(corejsPaths)
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(foreach(function(stream, file) {
            if (file.relative != 'require.js' && file.relative != 'config.js') {
                return stream
                    .pipe(amdOptimize(file.relative.replace(/\.js/g, ''), requirejsConfigCorejs))
                    .pipe(concat(file.relative));
            }
            return stream;
        }))
        .pipe(concat(paths.corejs))
        .pipe(footer('\nrequire([\'' + name + '\']);'))
        .pipe(gulp.dest('./'))
        .pipe(livereload({
            quiet: true
        }))
        .pipe(notify({
            onLast: true,
            message: "browser reload for corejs"
        }));
});

gulp.task('buildJs', ['es6js'], function() {
    gulp.src(paths.corejs)
        .pipe(uglify())
        .pipe(header(comment))
        .pipe(gulp.dest(paths.corejs));

    return gulp.src([paths.js + '/**/!(*_es6|_*).js', '!' + paths.js + '/{libs,modules,node_modules,components,bower_components}/**/*', '!' + paths.js + '/core.js'])
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(foreach(function(stream, file) {
            var name = path.basename(file.relative, '.js'),
                amd = ['json2', 'html5shiv'].indexOf(name) < 0;
            return stream
                .pipe(amd ? amdOptimize(file.relative.replace(/\.js$/i, ''), requirejsConfig) : gutil.noop())
                .pipe(concat(file.relative))
                .pipe(amd ? footer('\nrequire([\'' + file.relative.replace(/\.js$/i, '') + '\']);') : gutil.noop())
        }))
        .pipe(uglify())
        .pipe(header(comment))
        .pipe(gulp.dest(paths.js))
        .pipe(notify({
            onLast: true,
            message: "build js complete!"
        }));
});

gulp.task('html', function() {
    return gulp.src([paths.html + '/**/!(_)*.{html,php}', '!build/**/*'])
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

gulp.task('image', function() {
    var src = [paths.img + '/**/!(_)*.{jpg,jpeg,png,gif,svg,webp}', '!' + paths.img + '/sprites/**'];
    return gulp.src(src)
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(one())
        .pipe(livereload({
            quiet: true
        }))
        .pipe(notify({
            onLast: true,
            message: "browser reload for image"
        }));
});

gulp.task('watch', function() { //监听文件改变触发相应任务
    livereload.listen();

    gulp.watch([paths.html + '/**/*.{html,php}'], ['html']);
    gulp.watch([paths.js + '/**/*_es6.js'], ['es6js']);
    gulp.watch([paths.js + '/**/!(*_es6).js', '!' + paths.js + '/core.js'].concat(corejsPaths.map(function(path) {
        return '!' + path;
    })), ['js']);
    gulp.watch(corejsPaths.concat(Object.keys(requirejsConfig.paths).map(function(name) {
        return paths.js + '/' + requirejsConfig.paths[name] + '.js';
    }).concat(paths.js + '/components/common.js')), ['corejs']);
    gulp.watch(paths.img + '/**/*.{jpg,jpeg,png,gif,svg,webp}', ['image']);

    gulp.watch([paths.css + '/**/_*.{less,sass,scss}'], ['cssAll']);
    gulp.watch([paths.css + '/**/!(_)*.{less,sass,scss}'], ['css']).on('change', function(event) {
        if (event.type === 'deleted') { // if a file is deleted, forget about it
            delete cache.caches['css'][event.path];
        }
    });
});

gulp.task('default', ['watch']);
