const add = function (a, b) {
    return a + b;
}

const minus = (a, b) => a - b;

const version = '1.0.0';
/*
aModule 使用exports 或者 module.exports 导出给其他模块的方法
exports 和 moudle.exports的区别：
相同点：
    都可以暴露当前模块的 属性 和 方法 给其他模块使用;
不同点：
    1. exports是module.exports的别名;
    即：默认情况下它们指向的是同一个对象(就是同一块内存地址)
    2. exports和module.exports导出的对象最终以module.exports为准;
    即：当exports和module.exports指向的是不同的对象, 则以module.exports指向的对象为准。

    例如：
    module.exports = {
        'name': '李四',
        'say': function() {
            console.log('hellow 张三');
        }
    }

    exports ={
        'name': '太郎',
        'age': '19'
    }
    当其他模块使用该模块的属性时, 得到的对象是 {'name':'李四', 'say':function(){'hellow 张三}}
*/
exports.add = add;
exports.minus = minus;
exports.version = version;


/*
 module.exports = add 和 module.exports.add = add的区别：
 module.exports.add = add 是将add()作为module.exports的add属性的一个方法;其他界面得到的是一个对象,这个对象包含add()方法.
 module.exports = add 是直接把add()方法赋值给module.exports;其他界面在导入这个模块得到的就是一个add()方法.
*/
// module.exports = add;
// module.exports.add = add;
// module.exports.minus = minus;
// module.exports.version = version;




// module.exports = {
//     'name': '李四',
//     'say': function() {
//         console.log('hellow 张三');
//     }
// }

// exports ={
//     'name': '太郎',
//     'age': '19'
// }