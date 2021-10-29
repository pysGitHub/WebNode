`Gulp` 是基于node平台开发的前端构建工具; 
       即：将机械化操作编写成任务,想要执行任务的时候执行一个命令行命令就能制动执行.

`Gulp` 的功能：
       1.项目上线, HTML、CSS、JS文件压缩合并;
       2.语法转换, 如: es6专es5; less转css等;
       3.公共文件抽离;
       4.修改文件，使浏览器自动刷新;
       ...

`Gulp` 的使用:
       1. 下载gulp: npm install gulp;
       2. 在项目的根目录下创建 `gulpfile.js` 文件;
       3. 重构项目的文件夹结构目录,新建src和dist文件夹:
          src文件夹: 存放项目的源码;
          dist文件夹: 存放构建后的文件;
       4. 在`gulpfile.js`文件中编写任务;
       5. 在终端命令行中执行gulp任务.

`Gulp`  中提供的方法:
       gulp.src()    获取任务要处理的文件
       gulp.dest()   输出文件
       gulp.task()   建立gulp任务
       gulp.watch()  监控文件的变化

`Gulp CLI`: 全局安装Gulp CLI 脚手架  `npm install gulp-cli -g`
       使用Gulp CLI 中提供的命令执行Gulp中的任务,
       例如：终端输入: gulp 任务名称