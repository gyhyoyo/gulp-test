'use strict';

var gulp = require('gulp');
var color = require('gulp-color');
var rename = require('gulp-rename');

/*----------------sass编译------------------*/
var borwserSync = require('browser-sync').create(),
    reload = borwserSync.reload,
    watch = require('gulp-watch'),
    sass = require('gulp-sass');
var mincss = require('gulp-minify-css');

/*=========borwserSync========*/
gulp.task('puer',function(){
    borwserSync.init({
        server:{
        baseDir:'./dist'
        }
    });
    gulp.watch('lib/templates/*.jade',['jade']);
    gulp.watch('sass/**/*.scss',['sass']);
    gulp.watch('js/libs/*.js',['js']);
    gulp.watch("dist/templates/*.html").on('change',reload); 
});


gulp.task('sass',function(){
    gulp.src(['sass/**/*.scss','sass/*.scss']) //'!b/*.scss'
    .pipe(sass())
    .pipe(rename({suffix: '.min'}))
    .pipe(mincss())
    .pipe(gulp.dest( 'dist/css' ) );
});

gulp.task('watch-sass', function(){
    gulp.watch('sass/**/*.scss',['sass']);
})
/*------------------js合并压缩--------------*/
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
/*----公用的js main.js-----*/
gulp.task('js', function() {
  gulp.src(['js/libs/jquery.js', 'js/libs/jquery.SuperSlide.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});
/*-----首页合并 index.js*/

/*-----详情页合并-detail.js---*/

/*-------------------jade 编译--------------*/
/*需要优化 使用正则排除公用单个模块编译[layout.jade,nav.jade,footer.jade,]*/
var jade = require('gulp-jade');
// var wrap = require('gulp-wrap-amd'); //AMD 规范
gulp.task('jade', function() {
  gulp.src('lib/templates/*.jade')
    .pipe(jade({
      pretty:true     //编译过后不压缩
    }))
    .pipe(gulp.dest('dist/templates'))
});


/**************************************************
*以上完成jade模板自动刷新,sass编译css,js 压缩合并 *
*    运行 gulp puer                               *
***************************************************/

/**************************************************
*以下完成给文件添加MD5,自动压缩图片 
* 增加私有变量前缀
*                                 *
***************************************************/

/**************************************************
*后续 区别生产环境还是开发环境
* 
* es6 编译                                  *
***************************************************/




/*清理dist文件夹*/
/*gulp.task('clean', function () {
    gutil.log(colors.red('开始清空文件'));
    del([
        'dist'
    ])
});*/



// var imagemin = require('imagemin'); 
// var cache = require('gulp-cache');
// var pngquant = require('imagemin-pngquant');
/*图片压缩*/
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

// gulp.task('default', ['watch-jade','js','watch-puer']);


/*待添加到*/
/*buffer = require('vinyl-buffer'),
   autoprefixer = require('gulp-autoprefixer'),//增加私有变量前缀
fileinclude = require('gulp-file-include'),// include 文件用
template = require('gulp-template'),//替换变量以及动态html用
   imagemin = require('gulp-imagemin'),//图片压缩
 
    gulpif  = require('gulp-if'),//if判断，用来区别生产环境还是开发环境的
 
    rev  = require('gulp-rev'),//加MD5后缀
 
    revReplace = require('gulp-rev-replace'),//替换引用的加了md5后缀的文件名，修改过，用来加cdn前缀
 
    addsrc = require('gulp-add-src'),//pipeline中途添加文件夹，这里没有用到
 
    del = require('del'),//也是个删除··· 
 
    vinylPaths = require('vinyl-paths'),//操作pipe中文件路径的，加md5的时候用到了
 
    runSequence = require('run-sequence');//控制task顺序

    http://www.gbtags.com/gb/share/5503.htm*/