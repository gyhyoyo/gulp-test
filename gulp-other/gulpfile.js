'use strict';

var gulp = require('gulp');
/*js合并压缩插件*/
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


/*js合并压缩*/
gulp.task('scripts', function() {
  return gulp.src(['./src/js/libs/jquery.js', './src/js/libs/jquery.SuperSlide.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

/*sass编译*/
var borwserSync = require('browser-sync').create(),
    reload = borwserSync.reload,
    watch = require('gulp-watch'),
    sass = require('gulp-sass');
var mincss = require('gulp-minify-css');

/*sass 编译 css合并压缩*/
gulp.task('puer',function(){
    borwserSync.init({
        server:{
        baseDir:'./'
        }
    });
    gulp.watch('./sass/**/*.scss',['sass']);
    gulp.watch("*.html").on('change',reload);
});

gulp.task('sass',function(){
    return gulp.src('./sass/**/*.scss')
    .pipe(sass()).pipe(gulp.dest( './dist/css' ) );
});

/*css合并压缩*/
gulp.task('styles', function(){
	return gulp.src([
		"./src/css/dj_home.css",
		"./src/css/dj_activity.css",
		])
	.pipe(concat('styles.css'))
	.pipe(mincss())
	.pipe(gulp.dest('./dist/css/'))
});

// var imagemin = require('imagemin'); 
// var cache = require('gulp-cache');
// var pngquant = require('imagemin-pngquant');
// /*图片压缩*/
// gulp.task('minImg', function() {
//     return gulp.src('images/*.{png,jpg,gif,ico}')
//         .pipe(cache(imagemin({ //每次只压缩修改的文件
//             optimizationLevel: 3, 
//             progressive: true, 
//             interlaced: true, 
//             use: [pngquant()]    
//         }))) 
//         .pipe(gulp.dest('dist/images'))
// });