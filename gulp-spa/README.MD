cnpm install gulp-rev gulp-rev-replace gulp-useref gulp-filter gulp-uglify
gulp-csso browser-sync gulp-imagemin gulp-dest-clean gulp-newer --save-dev 

* 实现压缩合并js，css ，IMG，生成dist../资源之前先清空之前的缓存。,给文件添加版本号MD5
* 1.cmd, 运行 sass --watch sass:css 检测sass变化[以后用gulp-sass]
  2. 运行gulp 监视页面变化自动刷新浏览器     [通过 gulp.watch(['css/*.css'],['css']).on('change',reload) 监控文件有变化刷新]   
  3. 页面测试完成运行gulp revs 合并页后面js和css文件并添加MD5 [通过注释合并rev添加版本号]
  4. dist里面为最终打包的文件