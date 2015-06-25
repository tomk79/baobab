var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var plumber = require("gulp-plumber");


// src 中の *.scss を処理
gulp.task('.scss', function(){
	gulp.src("src/**/*.scss")
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest("./app"))
	;
});

// src 中の *.js を処理
gulp.task(".js", function() {
	gulp.src(["src/**/*.js"])
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest("./app"))
	;
});

// src 中の *.html を処理
gulp.task(".html", function() {
	gulp.src(["src/**/*.html", "src/**/*.htm"])
		.pipe(plumber())
		.pipe(gulp.dest("./app"))
	;
});

// src 中のすべての拡張子を監視して処理
gulp.task("watch", function() {
	gulp.watch(["src/**/*.scss"],[".scss"]);
	gulp.watch(["src/**/*.js"],[".js"]);
	gulp.watch(["src/**/*.html","src/**/*.htm"],[".html"]);
});

// src 中のすべての拡張子を処理(default)
gulp.task("default", [
	'.html',
	'.scss',
	'.js'
]);
