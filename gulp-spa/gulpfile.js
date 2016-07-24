/**
 * Created by yoyo on 2016/7/24.
 */
var gulp = require('gulp');
    uglify=require('gulp-uglify'),           /*压缩js代码*/
    rev=require('gulp-rev'),                 /*版本号不容易维护 使用hash码避免本地缓存*/
    revReplace=require('gulp-rev-replace'),/*.css?aaa   hash生成后 index.html 链接替换为最新link的地址*/
    useref=require('gulp-useref'),         /*通过设置注释告诉gulp怎么合并 可去npmjs.com看使用*/
    filter=require('gulp-filter'),         /*从水流中筛选xx文件,进行压缩，再restore放回去*/
    csso=require('gulp-csso');             /*压缩css*/
var borwserSync = require('browser-sync').create(),
    reload = borwserSync.reload;
var clean = require('gulp-dest-clean'); //同步清理
var newer = require('gulp-newer');

gulp.task('default',['images','css','js'],function () {
    borwserSync.init({
        notify: false,
        port:9000,
        server:{
            baseDir:'./'
        }
    });
    gulp.watch(['images/**'],['images']).on('change',reload);
    gulp.watch(['css/*.css'],['css']).on('change',reload);
    gulp.watch(['js/*.js'],['js']).on('change',reload);
    gulp.watch("./*.html").on('change',reload);
});
/*---------给文件添加版本号---------*/
gulp.task('revs', function () {
    var jsFilter = filter('**/*.js', {restore:true});
    var cssFilter = filter('**/*.css', {restore:true});
    var indexHtmlFilter = filter(['**/*','!**/index.html'], {restore:true}); //排除index.html
    return gulp.src('./index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});
/*-------css--------*/
 var cssSrc = 'css/*.css';     
 var cssDest = 'dist/css';     
gulp.task('css', function(){
   return  gulp.src(cssSrc)
    .pipe(clean(cssDest, 'extras/**'))
    .pipe(newer(cssDest))
       // .pipe(concat('styles'))
    .pipe(csso())
    .pipe(gulp.dest(cssDest));
});

/*-------js--------*/
 var jsSrc = 'js/*.js';     
 var jsDest = 'dist/js';     
gulp.task('js', function(){
   return  gulp.src(jsSrc)
    .pipe(clean(jsDest, 'extras/**'))
    .pipe(newer(jsDest))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

/*----------------图片压缩-------------------*/

var imagemin = require('gulp-imagemin');

var imgSrc = 'images/**';
var imgDest = 'dist/images';

gulp.task('images', function () {
    // 1. 找到图片
   return  gulp.src(imgSrc)
    // 2. 压缩图片
        .pipe(clean(imgDest, 'extras/**'))
        .pipe(newer(imgDest))
        .pipe(imagemin({
            progressive: true
        }))
        // 3. 另存图片
        .pipe(gulp.dest(imgDest))
});

