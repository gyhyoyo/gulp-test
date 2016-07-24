
cnpm i gulp-concat gulp-uglify  gulp-watch gulp-sass gulp-minify-css gulp-jade gulp-rename gulp-color gulp-browser-sync browser-sync gulp-imagemin gulp-rev gulp-rev-collector gulp-dest-clean gulp-newer gulp-filter gulp-autoprefixer --save-dev
* [实现了自动压缩合并js,css,img打包之前清除之前的缓存。使用jade模板引擎，检测文件变化自动刷新浏览器,添加主流浏览器前缀css3] 
  1. 运行gulp 检测所有文件变化刷新浏览器
  2. 运行gulp revs 打包 生成添加版本号的文件放在dist目录下 [需要完善]


**备注**
* gulp watch 自动编译sass路径./sass/**/*.scss 前面对./去掉可自动监听编译

###jade模板引擎
**includes 目录**
* layout.jade html doctype框架
* head.jade 包括mate属性和link样式链接,ico
* footer.jade footer模块和js脚本链接
**常用**
-> -var 定义变量-for ,在if else里 直接使用。在文本行使用#{}如 #{user.name}
-> -for (var x=0; x<3;x++)
   li item
   each val, index in ['苹果','详情','其他']
       li
           a= index + ':' + val
-> - var curItem = 1
   case curItem
     when 0 : p 我是引导页
     when 1 : p 我是首页
     when 2 : p 我是详情页
     default: 我是默认页
-> 更多>>  自动转换编码
-> console.log 输入  编译为 console.log('输入')
-> 重复的块
    mixin list
      ul
        li foo
        li bar
        li baz

    //- 调用
    +list()
-> 重复的块2
 mixin lia(href, name)
    li
      a(class!=attributes.class, href=href)= name
  +lia('./','首页')(class='current')
  +lia('./other.html','其他')
  +lia('./more.html','更多')


