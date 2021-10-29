// 导入http模块
const http = require('http');

// 导入fs文件模块
const fs = require('fs');

// 导入url模块(解析客户端请求的参数)
const url = require('url');


// 创建httpServer
const server = http.createServer();

/*
    监听request请求事件,设置请求处理函数
    request 客户端请求传入的信息;
    response 服务器端发送给客户端的信息;
*/
server.on('request', (request, response) => {
    /*
        浏览器的图片会触发 /favicon.ico 请求
    */
    if (request.url !== '/favicon.ico') {
        // url.parse(url的地址, true代表转为json数据)
        const queryParams = url.parse(request.url, true).query;
        console.log('收到的请求参数为:\n', queryParams);

        if (request.url === '/login') {
            /*
                设置响应头：
                Content-type设置响应数据的内容是什么类型；
                charset 设置字符编码；
            */
            response.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' }); // utf-8 可以不加引号
            /*
                响应的返回数据只能是字符串或者二进制数据
            */
            fs.readFile('./www/html/a.html', (err, data) => {
                if (err) {
                    response.write('404 报错!')
                } else {
                    response.write(data);
                }
                /*
                    设置响应结束(如果不设置,浏览器会一直转圈,等待响应结束)
                    可以直接不写response.write(响应内容),直接将响应内容写在response.end()中
                */
                response.end('响应结束'); // 由于文件的读写是回调函数,所以response.end()不能抽出去写,如果抽出去会报：write after end
            });
        }
        if (request.url !== '/login') {
            response.writeHead(200, { 'Content-type': 'text/plain;charset=utf-8' });
            fs.readFile('./www/data.txt', (err, data) => {
                if (err) {
                    response.write('404 报错!')
                } else {
                    response.write(data);
                }
                response.end();
            });
        }
    }
});

// 绑定端口号,启动服务
/*
    127.0.0.1 就是 locoalhost的ip地址;
    如果端口号为:80, 则可以不用在url中写端口号;
*/
server.listen('4000', () => {
    console.log('服务器正常启动......,请访问127.0.0.1:4000');
});