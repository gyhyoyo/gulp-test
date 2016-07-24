'use strict';

var gulp = require('gulp');
// var color = require('gulp-color');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

gulp.task('watch',['jade','sass','js','images'],function () {
    borwserSync.init({
        notify: false,
        port:9000,
        server:{
            baseDir:['./dist','./dist/templates']
        }
    });
    gulp.watch(['lib/templates/**/*.jade','lib/templates/*.jade'],['jade']);
    gulp.watch(['sass/*.scss','sass/includes/*.scss'],['sass']);
    gulp.watch(['js/*.js','js/libs/*.js'],['js']);
    gulp.watch(['images/*.*','images/**/*.*'],['images']);
    gulp.watch("dist/templates/*.html").on('change',reload);
});

/*----------------sass编译------------------*/
var borwserSync = require('browser-sync').create(),
    reload = borwserSync.reload,
    watch = require('gulp-watch'),
    sass = require('gulp-sass');
var mincss = require('gulp-minify-css');


gulp.task('sass',function(){
  return  gulp.src(['sass/*.scss'])                          //'!b/*.scss'
    .pipe(sass())
    // .pipe(rename({suffix: '.min'}))                          // 给文件名加后缀
    .pipe(mincss({
        keepSpecialComments: '*'                             // 保留所有特殊前缀
    }))  //livereload(server)
      .pipe(gulp.dest('dist/css'))                               // 输出文件本地
});

/*通过回调 先编译完sass再合并css------暂时先找scss中合并*/
// gulp.task('css', ['sass'],function () {
//    gulp.src([
//        './dist/css/basePc.css',
//        './dist/css/index.css'
//    ])
//        .pipe(concat('index.min.css')) //测试用
//        .pipe(gulp.dest('dist/css'))
// });
gulp.task('css', function () {
    return gulp.src(['sass/*.scss'])
        .pipe(sass())
        .pipe(rev())                                             // 文件名加MD5后缀
        .pipe(gulp.dest('dist/css'))                               // 输出文件本地
        .pipe(rev.manifest())                                    // 生成一个rev-manifest.json
        .pipe(gulp.dest( 'revs/css' ) );                       // 将 rev-manifest.json 保存到 rev 目录内
})

/*------------------js合并压缩--------------*/
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

/*----公用的js main.js-----*/
gulp.task('js-plugin', function() {
  gulp.src([
      'js/libs/jquery.js',
      /*轮播图*/
      'js/libs/jquery.SuperSlide.js'
  ])
    .pipe(concat('plugin.js'))
    .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
    // .pipe(browserSync.stream());
});
// /*-----首页合并 index.js*/
// gulp.task('js-index', function () {
//     gulp.src(['js/index.js', 'js/index1.js']) /*首页js*/
//         .pipe(concat('index.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js/'))
// });
// //所有需要用到的js资源
gulp.task('js', ['js-plugin'],function () {
    return gulp.src(['js/*.js','js/**/*.js'])
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('revs/js/'));
});

/*-------------------jade 编译--------------*/
/*需要优化 使用正则排除公用单个模块编译[layout.jade,nav.jade,footer.jade,]*/
var jade = require('gulp-jade');
// var wrap = require('gulp-wrap-amd'); //AMD 规范
gulp.task('jade', function() {
  return gulp.src(['lib/templates/*.jade'])
    .pipe(jade({
      pretty:true     //编译过后不压缩
    }))
      .pipe(gulp.dest('dist/templates'))
});
/*----------------文件添加MD5后缀-------------------*/
var rev = require('gulp-rev');                                            //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');                       //- 路径替换
gulp.task('rev-url', function() {
    gulp.src(['revs/css/*.json','dist/templates/*.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector())                                     //- 执行文件内css名的替换
        .pipe(gulp.dest('dist/templates'))                      //- 替换后的文件输出的目录

});
gulp.task('revs', ['css','rev-url']);
/*----------------图片压缩-------------------*/
var imagemin = require('gulp-imagemin');
gulp.task('images', function () {
    // 1. 找到图片
   return  gulp.src('images/*.*')
    // 2. 压缩图片
        .pipe(imagemin({
            progressive: true
        }))
        // 3. 另存图片
        .pipe(gulp.dest('dist/images'))
});
/*----重新生成最新文件---*/
//可以用gulp-run-sequence插件并行串行执行
var runSequence = require('gulp-run-sequence');
gulp.task('default', function(cb) {
    runSequence('clean', ['jade', 'sass','js', 'images'], 'revs', cb);
});

gulp.task('clean', function () {
   return gulp.src('dist')
        .pipe(clean());
});


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