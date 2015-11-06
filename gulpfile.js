"use strict";

var gulp = require('gulp');
var debug = require('gulp-debug');
var connect = require('gulp-connect'); // Runs a local web server
var open = require('gulp-open'); // Opens a url in the web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); // Transforms React JSX 
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); // Concatenates files
var lint = require('gulp-eslint'); // Lints the JS, JSX files
var sass = require('gulp-sass'); // Converts sass to css

var config = {
	devBaseUrl: 'http://localhost',
	port: 3000,
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'./src/temp/*.css'
		],
		temp: './src/temp',
		sass: [
			'node_modules/toastr/toastr.scss'
		],
		mainJs: './src/main.js',
		dist: './dist'
	}
};

// Task to start a local development server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		base: config.devBaseUrl,
		port: config.port,
		livereload: true
	});
});

// Task to open the url in the development server
gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
});

gulp.task('sass', function() {
	gulp.src(config.paths.sass)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(config.paths.temp))
});

gulp.task('images', function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload());
})

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'sass', 'css', 'images', 'lint', 'open', 'watch']);