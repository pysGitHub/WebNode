// 导入gulp文件
const gulp = require('gulp');

// 导入压缩插件
const htmlmin = require('gulp-htmlmin')
// 导入抽取公共文件插件
const file_include = require('gulp-file-include');
/*
    Gulp 插件的使用：
    1. 抽取公共文件: gulp-file-include
    2. html文件压缩: gulp-htmlmin
    3.压缩css: gulp-csso
    4.JavaScript语法转换: gulp-babel
    5.less语法转化: gulp-less
    6.压缩混淆JavaScript: gulp-uglify
    7.浏览器实时同步: browsersync
    ...
 */


// 使用gulp.task(任务的名称, 任务的回调函数)创建任务
gulp.task('first', async () => {
    console.log('first 任务开始执行');

    /*
        使用gulp.src(文件的路径)获取要处理的文件; 
        pipe()管道, 是一个强制写法,将要处理的代码写在其中;
        使用gulp.dest(文件存入的路径)将当前要处理的文件输出到gulp.dest方法中对应的路径;
        注意： 文件的路径一定要写对
    */
    // ./src/*.html 指的是src下的所有html文件
    await gulp.src('./src/*.html')
        .pipe(gulp.dest('dist/html'));
});


// 抽取公共文件并压缩(终端执行 gulp fileInclude)
gulp.task('fileInclude', async () => {
    await gulp.src('./src/*.html')
        /*
            在scr文件夹下创建一个common文件夹,用来存储公共代码；
                例如：
                1.新建一个head.html把公共的头部抽出来  
                2.在对应的html文件中写入 @@include('head.html对应的路径')     
        */
        .pipe(file_include())
        // 压缩html文件
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
});


// 构建任务(多个任务依次执行)
gulp.task('default', gulp.series('first', 'fileInclude', async () => { }));