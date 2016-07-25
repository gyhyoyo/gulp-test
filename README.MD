
**软件环境**
-> 系统win10
-> git v2.9.0
   node v4.4.6
   npm 2.15.5
   cnpm 4.2.0

  * 安装node[配置用户环境变量 NODE-> D:\nodejs 
                              node_modules->D:\nodejs\node_modules]


**gulp-test [自动化构建项目]**

-> gulp-other [实现了自动文件[js/js/img]  目前实行了压缩合并打包之前清空缓存,sass,jade自动编译,自动添加浏览器前缀。自动监视文件变化刷新浏览器] 此目录作为测试其他新功能临时使用

-> gulp-item [实现了gulp-other里所有功能。里面的每一个item*目录作为新的项目构建。只需根据实际项目资源替换里面的images|js|sass|templates 即可]。
 安装cnpm使用淘宝镜像: npm install cnpm -g --registry=https://registry.npm.taobao.org 
 备注: 运行cnpm i 安装依赖后,执行gulp即可。
  如果有其他依赖问题,删除package.json 文件之前复制devDependencies里需要安装的插件后。然后重新cnpm init,最后把刚才复制的插件包重新粘贴devDependencies里面。
  
* 1.执行gulp完成自动编译 监视文件。 2.后续增加版本号运行gulp revs 生成版本号[js,css,images]

->gulp-webpack 
