'use strict';

var gulp           = require('gulp');
// var color = require('gulp-color');
var rename         = require('gulp-rename');
var borwserSync    = require('browser-sync').create(),
    reload         = borwserSync.reload;
var watch          = require('gulp-watch');
var clean          = require('gulp-dest-clean'); //同步清理
var newer          = require('gulp-newer');

gulp.task('default', ['sass','js-concat','images'], function() {
    borwserSync.init({
        notify: false,
        port:9000,
        server:{
            baseDir:['./']
        }
    });
    gulp.watch(['sass/**'],['sass']);
    gulp.watch(['js/**'],['js-concat']);
    gulp.watch(['images/**'],['images']);
    gulp.watch("./*.html").on('change',reload);
});
/*----------------sass编译------------------*/
var sass     = require('gulp-sass');
var mincss   = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

var cssSrc  = 'css/*.css';     
var cssDest = 'dist/css';   
gulp.task('sass',function(){
  return  gulp.src(['sass/*.scss'])                              //'!b/*.scss'
     .pipe(clean(cssDest, 'extras/**'))
     .pipe(newer(cssDest))
     .pipe(sass({
            outputStyle: 'compressed'
        })).on('error', sass.logError) 
    // .pipe(rename({suffix: '.min'}))                          // 给文件名加后缀
    // .pipe(mincss({
    //     keepSpecialComments: '*'                               // 保留所有特殊前缀
    // }))  //livereload(server)
    .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0','Firefox >= 20','last 2 Explorer versions'],
            cascade: false,                                   //美化属性值
            remove: true                                      //去掉不必要的前缀
        }))                       
    .pipe(gulp.dest(cssDest))                                  // 输出文件本地
    .pipe(borwserSync.stream());
});

/*合并后添加版本号*/
// gulp.task('css', function () {
//     return gulp.src(['sass/*.scss'])
//         .pipe(sass())
//         .pipe(rev())                                             // 文件名加MD5后缀
//         .pipe(gulp.dest('dist/css'))                             // 输出文件本地
//         .pipe(rev.manifest())                                    // 生成一个rev-manifest.json
//         .pipe(gulp.dest( 'revs/css' ) );                         // 将 rev-manifest.json 保存到 rev 目录内
// });

/*------------------js合并压缩--------------*/
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');

/*按顺序压缩 合并 js*/
gulp.task('js-concat', ['js-uglify','js-index','js-detail']);

var jsSrc2 = 'js/**';
var jsDest = 'dist/js';
var jsDestLib = 'dist/js/libs';
/*需要压缩的js*/
gulp.task('js-uglify', function() {
  return gulp.src([
    'js/feedback.js'
    ]) 
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
    // .pipe(borwserSync.stream());
});
/*需要合并的js,不需要合并的走压缩*/
/*index.js*/
gulp.task('js-index',function() {
 return gulp.src([
      'js/libs/jquery.js',
      /*轮播图*/
      'js/libs/jquery.SuperSlide.js',
      'js/index.js'
  ])
    .pipe(concat('index.js'))
    // .pipe(clean(jsDestLib, 'extras/**'))
    // .pipe(newer(jsDestLib))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest))
    // .pipe(borwserSync.stream());
});
/*detail.js*/
gulp.task('js-detail',function() {
 return gulp.src([
      'js/libs/jquery.js',
      'js/roundabout.js',
      /*轮播图*/
      'js/libs/sequencejs.js',
      'js/libs/sequencejs.js',
      'js/libs/sequenceoption.js',
      'js/detail.js'
  ])
    .pipe(concat('detail.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest))
});

/*----------------图片压缩-------------------*/
var imagemin = require('gulp-imagemin');

var imgSrc   = 'images/**';
var imgDest  = 'dist/images';
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
        .pipe(borwserSync.stream());
});



/*----------------文件添加MD5后缀-------------------*/
// var rev = require('gulp-rev');                                             //- 对文件名加MD5后缀
// var revCollector = require('gulp-rev-collector');                         //- 路径替换
// gulp.task('rev-url', function() {
//     gulp.src(['revs/css/*.json','dist/templates/*.html'])                //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
//         .pipe(revCollector())                                           //- 执行文件内css名的替换
//         .pipe(gulp.dest('dist/templates'))                              //- 替换后的文件输出的目录

// });
// gulp.task('revs', ['css','rev-url']);

